import Image from "next/image";
import Link from "next/link";

const AboutMe: React.FC = () => {
  return (
    <section className="text-gray-900 py-20">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-gray-900">Why Choose Me?</p>
        <div className="flex justify-center mt-2">
          <div className="h-1 w-16 bg-orange-600 rounded"></div>
        </div>
      </div>
      <div className="container mx-auto shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-1/2 h-96">
            <Image
              src="/img/graduate.jpg"
              alt="bg"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:w-1/2 ml-8">
            <p className="">
              Full stack web and mobile developer with background knowledge of
              MERN stacks with redux, along with a knack of building
              applications with utmost efficiency. Strong professional with a
              BSC willing to be an asset for an organization.
            </p>
            <h3 className="text-2xl font-bold my-4">
              Here are a Few Highlights:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-4 w-4 top-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Full Stack web and mobile development</span>
              </li>
              <li className="flex items-center">
                <div className="h-4 w-4 top-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Interactive Front End as per the design</span>
              </li>
              <li className="flex items-center">
                <div className="h-4 w-4 top-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>React and React Native</span>
              </li>
              <li className="flex items-center">
                <div className="h-4 w-4 top-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Redux for State Management</span>
              </li>
              <li className="flex items-center">
                <div className="h-4 w-4 top-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Building REST API</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6 justify-center mb-10">
              <Link
                href="#contact"
                className="bg-gray-900 text-white py-2 px-4 rounded-full w-44 text-center"
              >
                Hire Me
              </Link>
              <Link
                href="#resume"
                className="bg-orange-600 text-white py-2 px-4 rounded-full w-44 text-center"
              >
                Get Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
