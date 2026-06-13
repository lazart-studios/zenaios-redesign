import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ThreeDomains } from "@/components/sections/ThreeDomains";
import { Audiences } from "@/components/sections/Audiences";
import { Flagship } from "@/components/sections/Flagship";
import { Capabilities } from "@/components/sections/Capabilities";
import { Outcomes } from "@/components/sections/Outcomes";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ThreeDomains />
      <Audiences />
      <Flagship />
      <Capabilities />
      <Outcomes />
      <Team />
      <CTASection />
    </>
  );
}
