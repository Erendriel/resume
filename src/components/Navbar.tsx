"use client";
import { useState, useEffect } from "react";

type SectionKeys = "home" | "aboutme" | "resume" | "testimonial" | "contactme";

const Navbar: React.FC<{
  sections: { [key in SectionKeys]: React.RefObject<HTMLDivElement> };
}> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKeys>("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollTo = (id: SectionKeys) => {
    const element = sections[id].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  const handleScroll = () => {
    const sectionKeys = Object.keys(sections) as SectionKeys[];
    let currentSection: SectionKeys = "home";

    for (let section of sectionKeys) {
      const element = sections[section].current;
      if (
        element &&
        element.getBoundingClientRect().top <= window.innerHeight / 2
      ) {
        currentSection = section;
      }
    }
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const sectionNames: { [key in SectionKeys]: string } = {
    home: "Home",
    aboutme: "About Me",
    resume: "Resume",
    testimonial: "Testimonial",
    contactme: "Contact Me",
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="text-2xl font-bold">RESUME</div>
      <div className="hidden md:flex space-x-4">
        {Object.keys(sectionNames).map((section) => (
          <button
            key={section}
            onClick={() => handleScrollTo(section as SectionKeys)}
            className={`focus:outline-none ${
              activeSection === section ? "text-orange-600" : "text-white"
            }`}
          >
            {sectionNames[section as SectionKeys]}
          </button>
        ))}
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none bg-gray-900 p-2 rounded"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gray-900 bg-opacity-95 flex flex-col items-center space-y-4 py-4 z-20">
          {Object.keys(sectionNames).map((section) => (
            <button
              key={section}
              onClick={() => handleScrollTo(section as SectionKeys)}
              className={`focus:outline-none ${
                activeSection === section ? "text-orange-600" : "text-white"
              }`}
            >
              {sectionNames[section as SectionKeys]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
