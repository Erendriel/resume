import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white text-center pt-20">
      <div className="container mx-auto mb-10">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">
            Hello, I'm
            <br />
            <span className=" text-orange-600"> Edgar Pérez-Figueroa</span>
          </h1>
          <h2 className="text-3xl font-semibold mb-2">carrousel</h2>
          <p className="text-xl mb-4">
            Knack of building applications with front and back end operations.
          </p>
          <div className="flex space-x-4">
            <button className="bg-transparent border-2 border-white py-2 px-4 w-44 text-center rounded-full">
              Hire Me
            </button>
            <button className="bg-orange-600 py-2 px-4 w-44 text-center rounded-full">
              Get Resume
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/img/shape-bg.png"
        alt="bg"
        layout="responsive"
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default HeroSection;
