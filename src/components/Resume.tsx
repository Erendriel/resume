"use client";

import React, { useState } from "react";
import ResumeHeading from "./ResumeHeading";

const Resume: React.FC = () => {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showText, setShowText] = useState(true);

  const resumeBullets = [
    { label: "Education", icon: "🎓" },
    { label: "Work History", icon: "💼" },
    { label: "Programming Skills", icon: "💻" },
    { label: "Projects", icon: "📈" },
    { label: "Interests", icon: "🎨" },
  ];

  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 85 },
    { skill: "TypeScript", ratingPercentage: 89 },
    { skill: "HTML", ratingPercentage: 80 },
    { skill: "CSS", ratingPercentage: 80 },
    { skill: "Tailwind", ratingPercentage: 75 },
    { skill: "React JS", ratingPercentage: 85 },
    { skill: "React Native", ratingPercentage: 85 },
    { skill: "NextJS", ratingPercentage: 89 },
    { skill: "Git", ratingPercentage: 80 },
  ];

  const projectsDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "A Personal Portfolio website to showcase all my details and projects at one place.",
      subHeading: "Technologies Used: React JS, Bootstrap",
    },
    {
      title: "Mobile E-shop",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "An ecommerce application designed to sell products online with payment system integration.",
      subHeading:
        "Technologies Used: React Native, Mongo DB, Express JS, Node JS, Redux.",
    },
    {
      title: "Ecommerce Website",
      duration: { fromDate: "2020", toDate: "2021" },
      description:
        "Online ecommerce website for showcasing and selling products online with payment system integration, both Paypal and Stripe.",
      subHeading:
        "Technologies Used: Mongo DB, Express JS, React JS, Node JS, Redux, Bootstrap.",
    },
  ];

  const resumeDetails = [
    <div className="flex flex-col justify-around h-full w-full" key="education">
      <ResumeHeading
        heading="Universidad Utel"
        subHeading="BACHELOR COMPUTER SYSTEMS ENGIENEER"
        fromDate="2022"
        toDate="2024"
      />
      <ResumeHeading
        heading="UANL - Facultad de Ciencias Físico Matemáticas"
        subHeading="BACHELOR MULTIMEDIA AND DIGITAL ANIMATION "
        fromDate="2014"
        toDate="2019"
      />
    </div>,

    <div
      className="flex flex-col justify-around h-full w-full"
      key="work-experience"
    >
      <div className="flex flex-col">
        <ResumeHeading
          heading="Arkusnexus"
          subHeading="Senior Frontend developer"
          fromDate="2023"
          toDate="Present"
        />
        <div className="mt-2 text-justify">
          <span className="text-sm">
            Bringing seasoned expertise as a Senior Next.js Developer, I
            specialize in architecting robust web applications. My proficiency
            lies in crating dynamic user interfaces and optimizing performance
            through server-side rendering. In addition to my technical
            contributions, I have actively mentored junior team members,
            fostering their growth in the Next.js ecosystem.
          </span>
        </div>
        <div className="mt-2 text-justify">
          <span className="text-sm">
            - Developed marketing centers for realtors.
          </span>
          <br />
          <span className="text-sm">
            - Integrated the web app with backend services to create a new user
            onboarding application with dynamic form content.
          </span>
          <br />
          <span className="text-sm">
            - Developed UI as per the given designs.
          </span>
          <br />
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <ResumeHeading
          heading="Luxoft"
          subHeading="Senior Mobile developer"
          fromDate="2021"
          toDate="2023"
        />
        <div className="mt-2 text-justify">
          <span className="text-sm">
            My primary expertise lies in React Native app development. I've not
            only contributed significantly to the creation of intuitive and
            high-performing applications, but also taken on the role of
            mentoring and coaching junior team members. In addition, I've
            actively engaged with clients to refine technical solutions, while
            adhering to Agile Scrum methodologies. Rigorous unit testing for API
            reliability has been a cornerstone of my approach, and I've
            maintained version control using GitHub for streamlined
            collaboration.
          </span>
        </div>
        <div className="mt-2 text-justify">
          <span className="text-sm">
            - Developed agronomist mobile application.
          </span>
          <br />
          <span className="text-sm">
            - Integrated the mobile app with backend services to create a new
            user onboarding application with dynamic form content.
          </span>
          <br />
          <span className="text-sm">
            - Developed UI as per the given designs.
          </span>
          <br />
        </div>
      </div>
    </div>,

    <div
      className="flex flex-row items-center justify-between flex-wrap"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="flex flex-col relative w-1/2 mb-4" key={index}>
          <div className="ml-2 absolute left-[-30px] h-4 w-4 top-1.5 rounded-full bg-orange-600"></div>
          <span className="font-bold text-lg text-orange-600">
            {skill.skill}
          </span>
          <div className="relative h-4 w-4/5 bg-orange-600 mt-2">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="h-4 absolute bg-gray-900 transition-all duration-1000"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    <div className="flex flex-col justify-around h-full w-full" key="projects">
      {projectsDetails.map((project, index) => (
        <ResumeHeading
          key={index}
          heading={project.title}
          subHeading={project.subHeading}
          description={project.description}
          fromDate={project.duration.fromDate}
          toDate={project.duration.toDate}
        />
      ))}
    </div>,

    <div className="flex flex-col justify-around h-full w-full" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="Apart from being a tech enthusiast and a code writer, I also love to teach people what I know simply because I believe in sharing."
      />
      <ResumeHeading
        heading="Music"
        description="Listening to soothing music is something I can never compromise with, skimming through Spotify's pop songs charts is at times the best stress reliever that I can get my hands on."
      />
      <ResumeHeading
        heading="Competitive Gaming"
        description="I like to challenge my reflexes a lot while competing in football games, pushing the rank and having interactive gaming sessions excites me the most."
      />
    </div>,
  ];

  const handleCarousal = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedBulletIndex(index);
      setIsTransitioning(false);
      setShowText(true);
    }, 300);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={`flex items-center cursor-pointer bg-gray-900 h-10 my-4 px-2 rounded-full transition-all duration-500 ${
          index === selectedBulletIndex ? "text-white" : ""
        } ${index === selectedBulletIndex && showText ? "w-full" : "w-8"}`}
        key={index}
      >
        <span>{bullet.icon}</span>
        <span
          className={`ml-5 text-sm font-semibold whitespace-nowrap ${
            showText && index === selectedBulletIndex ? "block" : "hidden"
          } md:block`}
        >
          {bullet.label}
        </span>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-fit my-30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="shadow-lg w-full md:w-80">
            <div className="flex items-center w-full relative">
              <div className="w-full md:w-9 h-full bg-gray-900 absolute"></div>
              <div className="md:w-11/12 relative flex md:block overflow-x-auto md:overflow-visible">
                {getBullets()}
              </div>
            </div>
          </div>
          <div className="flex-grow w-11/12 overflow-hidden pl-20 md:pl-20 mt-8 md:mt-0">
            <div
              className={`transition-opacity duration-500 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {resumeDetails[selectedBulletIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
