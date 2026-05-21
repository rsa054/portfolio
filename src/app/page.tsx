import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExpertiseSection } from "@/components/sections/expertise";
import { CommunitySection } from "@/components/sections/community";
import { ContactSection } from "@/components/sections/contact";
import { ScrollProgress } from "@/components/effects/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ExpertiseSection />
      <CommunitySection />
      <ContactSection />
    </>
  );
}
