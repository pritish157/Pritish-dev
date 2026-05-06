import { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowUpRight, Code2, Star } from 'lucide-react'
import Reveal from './ui/Reveal'

const GITHUB_USER = 'pritish157'

function RepoCard({ repo, index }) {
  return (
    <Reveal className="surface-card h-full" delay={index * 0.04}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">{repo.name}</h3>
          {repo.description ? (
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{repo.description}</p>
          ) : null}
        </div>
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="icon-button shrink-0" aria-label={`Open ${repo.name} on GitHub`}>
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {repo.language ? <span className="soft-chip">{repo.language}</span> : null}
        <span className="soft-chip">
          <Star size={14} />
          {repo.stargazers_count}
        </span>
        <span className="soft-chip">Forks {repo.forks_count}</span>
      </div>
    </Reveal>
  )
}

export default function GitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGitHubData() {
      try {
        const [profileResponse, repoResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal }),
          axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`, {
            signal: controller.signal,
          }),
        ])

        setProfile(profileResponse.data)
        setRepos(repoResponse.data.filter((repo) => !repo.fork))
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError(true)
        }
      } finally {
        setLoading(false)
      }
    }

    loadGitHubData()

    return () => controller.abort()
  }, [])

  if (loading) {
    return (
      <div className="surface-card">
        <div className="loading-state">
          <span className="loading-state__spinner" aria-hidden="true" />
          <span>Loading GitHub signal...</span>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="surface-card">
        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
          GitHub data could not be loaded right now. You can still review the profile directly at{' '}
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" className="text-button">
            github.com/{GITHUB_USER}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Reveal className="surface-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url}
              alt={`${profile.login} GitHub avatar`}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 rounded-full border border-[rgba(140,200,255,0.18)]"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {profile.name || profile.login}
                </h3>
                <span className="soft-chip">
                  <Code2 size={14} />
                  @{profile.login}
                </span>
              </div>
              {profile.bio ? <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{profile.bio}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-[22rem]">
            {[
              { label: 'Repos', value: profile.public_repos },
              { label: 'Followers', value: profile.followers },
              { label: 'Following', value: profile.following },
            ].map((metric) => (
              <div key={metric.label} className="surface-tile text-center">
                <p className="text-xl font-semibold text-[var(--color-text-primary)]">{metric.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="project-grid">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </div>
  )
}
