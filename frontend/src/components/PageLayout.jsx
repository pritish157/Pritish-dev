import SectionHeading from './ui/SectionHeading'

export default function PageLayout({
  eyebrow,
  title,
  description,
  actions,
  children,
  headingAlign = 'left',
}) {
  return (
    <div className="page-shell">
      <div className="section-shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          align={headingAlign}
        />
        {children}
      </div>
    </div>
  )
}
