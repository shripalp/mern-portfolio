import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  return (
    <div>
      <SectionTitle title="Hello" />
      <div className="flex items-center sm:flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-tertiary text-md">{"{"}</p>
          {Object.keys(contact).map((key) => (
            <p className="ml-5 text-md">
              <span className="text-tertiary text-md">{key} : </span>
              <span className="text-tertiary text-md">{contact[key]}</span>
            </p>
          ))}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
