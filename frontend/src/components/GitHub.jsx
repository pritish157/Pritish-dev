import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const GITHUB_USER = 'pritish157'

function LanguageBar({ languages }) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  const colors = ['#8B5CF6', '#06B6D4', '#22C55E', '#F59E0B', '#EC4899', '#3B82F6', '#F97316']
  const entries = Object.entries(languages).slice(0, 6)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-2 rounded overflow-hidden gap-px">
        {entries.map(([lang, bytes], i) => (
          <div key={lang} style={{ width: `${(bytes / total) * 100}%`, background: colors[i % colors.length] }}
            title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {entries.map(([lang, bytes], i) => (
          <div key={lang} className="flex items-center gap-1.5 text-xs text-slate-400">
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: colors[i % colors.length] }} />
            {lang}
            <span className="text-text-dim">{((bytes / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RepoCard({ repo }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      className="glass p-4 rounded-2xl block no-underline transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-slate-200 truncate">{repo.name}</h3>
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-yellow-300 shrink-0">★ {repo.stargazers_count}</span>
        )}
      </div>
      {repo.description && (
        <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3">
        {repo.language && <span className="tag tag-purple !text-[10px]">{repo.language}</span>}
        {repo.forks_count > 0 && <span className="text-xs text-text-dim">⑂ {repo.forks_count}</span>}
      </div>
    </motion.a>
  )
}

export default function GitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${GITHUB_USER}`),
          axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`),
        ])
        setProfile(profileRes.data)
        const sorted = reposRes.data.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(sorted.slice(0, 6))

        const langTotals = {}
        await Promise.all(
          sorted.slice(0, 8).map(async repo => {
            try {
              const { data } = await axios.get(repo.languages_url)
              Object.entries(data).forEach(([lang, bytes]) => { langTotals[lang] = (langTotals[lang] || 0) + bytes })
            } catch {}
          })
        )
        setLanguages(langTotals)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass p-8 text-center rounded-3xl text-text-muted">
        <div className="text-3xl mb-2">⚠️</div>
        <p className="text-sm">
          Could not load GitHub data.{' '}
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="text-purple-300">
            Visit profile directly ↗
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Profile stats */}
      {profile && (
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-4 sm:p-6 rounded-3xl">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-6">
            <img src={profile.avatar_url} alt="GitHub avatar" loading="lazy"
              className="w-14 h-14 rounded-full border-2 border-accent-purple/50" />
            <div className="flex-1 min-w-[160px] text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1">
                <h3 className="font-bold text-text-primary text-base">{profile.name || GITHUB_USER}</h3>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-purple-300 no-underline">@{profile.login} ↗</a>
              </div>
              {profile.bio && <p className="text-sm text-text-muted">{profile.bio}</p>}
            </div>
            <div className="flex gap-6">
              {[
                { label: 'Repos', value: profile.public_repos },
                { label: 'Followers', value: profile.followers },
                { label: 'Following', value: profile.following },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="gradient-text text-xl font-black">{s.value}</div>
                  <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {Object.keys(languages).length > 0 && (
            <div className="mt-6 pt-5 border-t border-accent-purple/10">
              <div className="font-mono text-[11px] text-text-muted mb-3">// language_distribution</div>
              <LanguageBar languages={languages} />
            </div>
          )}
        </motion.div>
      )}

      {/* Repos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <motion.div key={repo.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <RepoCard repo={repo} />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          View All Repositories ↗
        </a>
      </div>
    </div>
  )
}
