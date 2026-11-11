import Hero from "../components/Hero/Hero";
import Divider from "../components/Divider/Divider";
import Proof from "../components/Proof/Proof";
import Process from "../components/Process/Process";
import Contact from "../components/Contact/Contact";
import Projects from "../components/Projects/Projects";
import Platforms from "../components/Platforms/Platforms";
import Experience from "../components/Experience/Experience";
import { personSchema, websiteSchema } from "../data/schema";
import SearchSimulator from "../components/SearchSimulator/SearchSimulator";
import StructuredData from "../components/StructuredData/StructuredData";
import ReportTranslator from "../components/ReportTranslator/ReportTranslator";

// The home page uses the default title and description from layout.jsx
export default function Home() {
  return (
    <>
      {/* The Proof section prints this same Person object */}
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />
      <main>
        <Hero />
        <Process />
        <Divider variant={1} />
        <Platforms />
        <Divider variant={2} />
        <SearchSimulator />
        <Divider variant={3} />
        <ReportTranslator />
        <Divider variant={4} />
        <Experience />
        <Divider variant={5} />
        <Projects />
        <Divider variant={6} />
        <Proof />
        <Divider variant={7} />
        <Contact />
      </main>
    </>
  );
}
