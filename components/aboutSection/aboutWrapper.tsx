import React, { useEffect, useState } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { AboutMarquee } from "./aboutMarquee";
import { links } from "@/data/data";
import TestimonialCard from "./testimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { isDesktop } from "@/lib/utils";

export function AboutWrapper({}) {
  const [text, setText] = useState({
    main: "Your World",
    para: `Building AI-powered worlds for games, films, and immersive digital experiences.`,
  });
  useEffect(() => {
    if (!isDesktop()) {
      setText({
        main: "Recent Work",
        para: `Building high-end websites with agencies and individuals while creating rebuilds in my free time.`,
      });
    }
  }, []);

  return (
    <main className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]  ">
      <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em] ">
        <p
          id="my-text"
          className="text-left leading-[1.3] text-colorSecondaryDark md:w-[100%]"
        >
          {text.para}
        </p>
        <Magentic
          href={links.work}
          scrambleParams={{
            text: "Create your World",
          }}
          onMouseEnter={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#0e0d0c",
                "--colorDark": "#fff",
                "--colorSecondaryDark": "#bfbfbf",
                "--colorSecondaryLight": "#404040",
                "--colorSecondaryHalfLight": "#1a1a1a",
                "--colorSecondaryHalfDark": "#f2f2f2",
                "--colorWhite": "#000",
              });
            }
          }}
          onMouseLeave={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#fff",
                "--colorDark": "#0e0d0c",
                "--colorSecondaryDark": "#404040",
                "--colorSecondaryLight": "#bfbfbf",
                "--colorSecondaryHalfLight": "#f2f2f2",
                "--colorSecondaryHalfDark": "#1a1a1a",
                "--colorWhite": "#fff",
              });
            }
          }}
          className="mask  group h-full items-center justify-center rounded-2xl bg-colorDark p-3 md:relative  md:min-h-full   md:w-[33%] md:rounded-full"
        >
          <p className="shapka !flex text-[0.9em]  text-colorLight md:text-[0.7em]">
            <span className="scrambleText whitespace-nowrap">
              Create your world
            </span>
          </p>

        </Magentic>
      </div>
      {/* <AboutMarquee></AboutMarquee> */}
      <div className="customBorder anime mx-auto my-[1.5em] h-[2px] w-[calc(100%_-_20px)] self-start rounded-full bg-colorSecondaryLight opacity-30 "></div>

      <a
        href={links.work}
        className="anime relative flex h-[260px] w-full items-center justify-center md:h-[380px]"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="anime">
            <h2 className="work_heading mask">{text.main}</h2>
          </div>
          {/* <a href={links.work} className="work__cto anime">
            <div className="left">
              <svg
                width="21"
                height="6"
                viewBox="0 0 21 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 2V4H14.5V6L20.5 3L14.5 0V2H0.5Z"
                  fill="var(--colorLight)"
                />
              </svg>
            </div>
            <div className="center font-bold">
              view all work<span className="yellow__it"> .</span>
            </div>
            <div className="right">
              <svg
                width="21"
                height="6"
                viewBox="0 0 21 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 2V4H14.5V6L20.5 3L14.5 0V2H0.5Z"
                  fill="var(--colorLight)"
                />
              </svg>
            </div>
          </a> */}
        </div>
        <div className="section3__video overflow-hidden rounded-3xl bg-black md:rounded-[3rem]">
          <video
            className=""
            id="video"
            playsInline
            autoPlay
            muted
            loop
            src="/video/transcode.mp4"
          ></video>
        </div>
      </a>
    </main>
  );
}
