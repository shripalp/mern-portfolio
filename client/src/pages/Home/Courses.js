import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  return (
    <div>
      <SectionTitle title="courses" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-10 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {courses[selectedItemIndex].title}
            </h1>
            <p className="text-white">
              Cupidatat ullamco ipsum aliquip officia eu culpa sit nulla irure
              amet adipisicing id eu. Consectetur ea elit qui elit anim aliquip
              est ipsum fugiat eu cupidatat mollit non. Est consequat laborum
              sit fugiat occaecat commodo irure sint proident incididunt
              consequat consequat.
            </p>
          </div>
          <img
            src={courses[selectedItemIndex].image}
            alt="logo"
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
