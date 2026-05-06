export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  actions = null,
  level = 1,
  headingId,
}) {
  const centered = align === 'center'
  const HeadingTag = `h${level}`

  return (
    <header className={`section-heading ${centered ? 'section-heading--center' : ''} ${className}`.trim()}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <HeadingTag className="section-title" id={headingId}>
        {title}
      </HeadingTag>
      {description ? <p className="section-description">{description}</p> : null}
      {actions ? <div className={`section-actions ${centered ? 'justify-center' : ''}`}>{actions}</div> : null}
    </header>
  )
}
