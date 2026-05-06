import { useDeferredValue, useMemo, useState, useTransition } from 'react'
import axios from 'axios'
import { Bot, BriefcaseBusiness, Sparkles } from 'lucide-react'
import { projects, recruiterCopilotOptions, siteConfig } from '../content/siteContent'
import SpotlightPanel from './ui/SpotlightPanel'

function buildLocalReadout({ role, stage, priority, notes }) {
  const matchedProjects = projects.filter((project) => priority.projectIds.includes(project.id))
  const interviewAngles = matchedProjects
    .flatMap((project) => project.highlights.slice(0, 1).map((highlight) => `${project.name}: ${highlight}`))
    .slice(0, 3)

  const reasons = [
    role.summary,
    stage.summary,
    `Strongest proof around ${priority.strengths.join(', ')}.`,
    notes ? `Team context considered: ${notes.trim()}.` : 'No extra team context provided, so the match is based on the portfolio proof set.',
  ]

  return {
    headline: `${siteConfig.firstName} looks strongest for ${role.label.toLowerCase()} work on ${stage.label.toLowerCase()} teams that care about ${priority.label.toLowerCase()}.`,
    matchedProjects,
    reasons,
    interviewAngles,
    nextStep: `Start with ${matchedProjects[0]?.name ?? 'the flagship project'} and use the engineering details to validate architecture fit quickly.`,
  }
}

export default function RecruiterCopilot() {
  const [selectedRoleId, setSelectedRoleId] = useState(recruiterCopilotOptions.roles[0].id)
  const [selectedStageId, setSelectedStageId] = useState(recruiterCopilotOptions.stages[0].id)
  const [selectedPriorityId, setSelectedPriorityId] = useState(recruiterCopilotOptions.priorities[0].id)
  const [teamContext, setTeamContext] = useState('')
  const [aiReply, setAiReply] = useState('')
  const [source, setSource] = useState('local')
  const [errorState, setErrorState] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [, startTransition] = useTransition()

  const deferredTeamContext = useDeferredValue(teamContext)
  const role = recruiterCopilotOptions.roles.find((item) => item.id === selectedRoleId) ?? recruiterCopilotOptions.roles[0]
  const stage = recruiterCopilotOptions.stages.find((item) => item.id === selectedStageId) ?? recruiterCopilotOptions.stages[0]
  const priority =
    recruiterCopilotOptions.priorities.find((item) => item.id === selectedPriorityId) ?? recruiterCopilotOptions.priorities[0]

  const localReadout = useMemo(
    () => buildLocalReadout({ role, stage, priority, notes: deferredTeamContext }),
    [deferredTeamContext, priority, role, stage],
  )

  const generateReadout = async () => {
    setIsGenerating(true)
    setErrorState('')

    const prompt = `Recruiter copilot request for Pritish Kumar Panda. Role target: ${role.label}. Team stage: ${stage.label}. Priority: ${priority.label}. Team context: ${teamContext.trim() || 'none provided'}. In under 140 words, explain why he fits, which projects to review first, and 3 engineering strengths. Use short headings and concise bullets.`

    try {
      const { data } = await axios.post('/api/ai/chat', { message: prompt })

      startTransition(() => {
        setAiReply(data?.data?.reply || data?.reply || 'No AI response returned.')
        setSource(data?.data?.source || data?.source || 'portfolio-ai')
      })
    } catch {
      startTransition(() => {
        setAiReply('')
        setSource('local')
        setErrorState('Live AI is unavailable right now, so the copilot is using the local portfolio match engine.')
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="copilot-grid">
      <SpotlightPanel className="surface-tile">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">AI recruiter copilot</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
              Fit readout in one click.
            </h3>
          </div>
          <span className="status-chip">
            <Bot size={14} />
            Match engine
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          <div>
            <p className="copilot-label">Role fit</p>
            <div className="copilot-choice-row">
              {recruiterCopilotOptions.roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedRoleId(item.id)}
                  className={`choice-chip${selectedRoleId === item.id ? ' choice-chip--active' : ''}`}
                >
                  <BriefcaseBusiness size={14} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="copilot-label">Team stage</p>
            <div className="copilot-choice-row">
              {recruiterCopilotOptions.stages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedStageId(item.id)}
                  className={`choice-chip${selectedStageId === item.id ? ' choice-chip--active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="copilot-label">Hiring priority</p>
            <div className="copilot-choice-row">
              {recruiterCopilotOptions.priorities.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPriorityId(item.id)}
                  className={`choice-chip${selectedPriorityId === item.id ? ' choice-chip--active' : ''}`}
                >
                  <Sparkles size={14} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="copilot-context" className="copilot-label">
              Team context
            </label>
            <textarea
              id="copilot-context"
              rows={4}
              value={teamContext}
              onChange={(event) => setTeamContext(event.target.value.slice(0, 240))}
              className="form-field"
              placeholder="Example: Series A SaaS, small engineering team, need secure workflows and cleaner dashboard UX."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={generateReadout} className="primary-button" disabled={isGenerating}>
              <Bot size={16} />
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </SpotlightPanel>

      <div className="surface-tile copilot-report">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Instant match summary</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">Why this fit works</h3>
          </div>
          <span className="status-chip">{source === 'local' ? 'Local engine' : source}</span>
        </div>

        {errorState ? <p className="mt-4 text-sm text-[var(--color-accent-warm)]">{errorState}</p> : null}

        <div className="mt-5 space-y-5">
          <section className="rounded-[20px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.02)] p-4">
            <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{localReadout.headline}</p>
          </section>

          <section>
            <p className="copilot-label">Matched projects</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {localReadout.matchedProjects.map((project) => (
                <article key={project.id} className="surface-tile">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{project.name}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{project.heroTag}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="copilot-label">Why it fits</p>
            <ul className="mt-3 space-y-3">
              {localReadout.reasons.slice(0, 3).map((reason) => (
                <li key={reason} className="feature-row">
                  <span className="feature-dot" aria-hidden="true" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="copilot-ai-response">
            <p className="copilot-label">AI note</p>
            <div className="mt-3 rounded-[20px] border border-[rgba(98,224,193,0.12)] bg-[rgba(98,224,193,0.05)] p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--color-text-secondary)]">
                {aiReply ||
                  localReadout.nextStep}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
