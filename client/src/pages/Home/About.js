import React from "react";
import SectionTitle from "../../components/SectionTitle";

function About() {
  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full items-center">
        <div className="h-[70vh] w-1/2">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_obidsi0t.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2">
          <p className="text-white">hello</p>
          <p className="text-white">my name is shripal</p>
        </div>
      </div>
    </div>
  );
}

export default About;
