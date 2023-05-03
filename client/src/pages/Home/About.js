import React from "react";
import SectionTitle from "../../components/SectionTitle";

function About() {
  const skills = [
    "javascript",
    "python",
    "mongoDB",
    "REACT",
    "express",
    "nodeJS",
    "Django",
  ];

  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_obidsi0t.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">hello</p>
          <p className="text-white">my name is shripal</p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are few technologies I am working with
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-10">
              <h1 className="text-tertiary" key={index}>
                {skill}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
