import PageLayout from '../components/PageLayout'
import SkillsExperience from '../components/SkillsExperience'
import Seo from '../components/seo/Seo'

export default function SkillsScreen() {
  return (
    <>
      <Seo pageKey="skills" />
      <PageLayout
        eyebrow="Skills + experience"
        title="Stack fit, engineering strengths, and current growth areas in one place."
        description="This page keeps the signal compact by combining practical stack depth, product engineering strengths, and current focus areas instead of scattering them across multiple sections."
      >
        <SkillsExperience />
      </PageLayout>
    </>
  )
}
