import { useRef, useEffect, useState, FormEvent } from "react";
import "./App.scss";
import Typed from "typed.js";
import { JsonView, allExpanded } from "react-json-view-lite";
import VanillaTilt from "vanilla-tilt";
import "react-json-view-lite/dist/index.css";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  LiaAwardSolid,
  LiaEye,
  LiaArrowCircleRightSolid,
  LiaEnvelope,
  LiaEllipsisVSolid,
} from "react-icons/lia";
import { PiSkipForward } from "react-icons/pi";

import Logo from "../public/img/logo.svg";
import HomeYip from "../public/img/home_yip.png";
import refJson from "./assets/ref.json";
import projectJson from "../public/json/project.json";

import Banner from "../src/Banner.tsx";

interface ProjectsData {
  date: string;
  title: string;
  awards?: {
    title: string;
    link?: string;
  };
  detail: string;
  badge: string[];
  img?: string;
  themeColor?: string;
  link?: string;
}

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

function Tilt(props: { [x: string]: any; options: any }) {
  const { options, ...rest } = props;
  const tilt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tilt.current && !isMobile()) {
      VanillaTilt.init(tilt.current, options);
    }
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function App() {
  const [headerClass, setHeaderClass] = useState("");
  const [headerMenuClass, setHeaderMenuClass] = useState(false);
  const [homeClass, setHomeClass] = useState("");
  const [loadingClass, setLoadingClass] = useState("");
  const el = useRef(null);

  const [projects, setProjects] = useState<ProjectsData[]>([]);

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hello!<br>^300 \n I'm...^1000"],
      typeSpeed: 200,
      backSpeed: 0,
      fadeOut: true,
      onComplete: () => {
        window.scrollTo(0, 0);
        setLoadingClass("loading-hide");
        setHomeClass("active");
      },
    });

    setProjects(projectJson);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setHeaderClass("active");
      } else {
        setHeaderClass("");
      }
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("access_key", "a473b89c-d0ad-4933-a727-e629a6c6d609");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setAlertError(false);
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 5000);
    } else {
      setAlertSuccess(false);
      setAlertError(true);
      setTimeout(() => {
        setAlertError(false);
      }, 5000);
    }
  };

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto">
          <div className="header-wrapper">
            <a
              onClick={() => {
                setHeaderMenuClass(false);
                scrollToElement("home");
              }}
              className="header-logo"
            >
              <img src={Logo} alt="My SVG" />
            </a>
            <div className="header-menu">
              <a
                onClick={() => {
                  setHeaderMenuClass(!headerMenuClass);
                }}
                className="menu-btn"
              >
                <LiaEllipsisVSolid />
              </a>
              <div className={`menu-list ${headerMenuClass ? "active" : ""}`}>
                <a
                  onClick={() => {
                    setHeaderMenuClass(false);
                    scrollToElement("about");
                  }}
                  className="menu-list-item"
                >
                  About
                </a>
                <a
                  onClick={() => {
                    setHeaderMenuClass(false);
                    scrollToElement("timeline");
                  }}
                  className="menu-list-item"
                >
                  Project
                </a>
                <a
                  onClick={() => {
                    setHeaderMenuClass(false);
                    scrollToElement("contact");
                  }}
                  className="menu-list-item"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section id="home" className={`home ${homeClass}`}>
        <div className="home-first sticky top-0">&gt; Felix</div>
        <div className="home-last">
          <img src={HomeYip} alt="" />
        </div>
      </section>
      <Banner id="about" title="About me"></Banner>
      <section className="about-dev">
        <div className="dev-title">
          <h2>front-end</h2>
          <hr />
          <p>
            I am a Front-End Developer. <br />I build Responsive Website and GUI
            application.
          </p>
        </div>
        <div className="dev-detail">
          <div className="json-wrapper">
            <div className="wrapper-icon"></div>
            <JsonView
              data={refJson}
              shouldExpandNode={allExpanded}
              clickToExpandNode={false}
            />
          </div>
        </div>
      </section>
      <section className="about-ui">
        <div className="ui-title">
          <h2>UI / UX</h2>
          <hr />
          <p>
            I am a UI/UX Developer. <br />I design and develop user interfaces
            and experiences that are both visually appealing and user-friendly
            for websites and applications.
          </p>
        </div>
        <div className="ui-detail">
          <div className="detail-wrapper">
            <div className="front side">
              <div className="detail-content">UI</div>
            </div>
            <div className="back side">
              <div className="detail-content">UX</div>
            </div>
          </div>
        </div>
      </section>

      <Banner id="timeline" title="Project"></Banner>
      <section className="timeline">
        <div className="timeline-bg">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>

        <div className="timeline-main">
          <VerticalTimeline lineColor="#8cc63f">
            {[...projects]
              .slice()
              .reverse()
              .map((item) => (
                <VerticalTimelineElement
                  className={item.img ? "theme1" : "theme2"}
                  contentStyle={{
                    backgroundColor: item.themeColor,
                    boxShadow: `0 0px 8px ${item.themeColor}`,
                  }}
                  contentArrowStyle={{
                    borderRight: `7px solid ${item.themeColor}`,
                  }}
                  iconStyle={{
                    background: item.themeColor,
                    color: "#fff",
                  }}
                  icon={""}
                  date={item.date}
                >
                  <div className="vertical-timeline-element-inner">
                    {item.img ? (
                      <img src={`/img/project/${item.img}`} alt="" />
                    ) : (
                      ""
                    )}

                    <div className="vertical-timeline-element-content-wrapper">
                      <h3 style={{ color: item.themeColor }}>{item.title}</h3>
                      <hr style={{ borderTopColor: item.themeColor }} />
                      {item.awards ? (
                        <>
                          <div className="vertical-timeline-element-awards">
                            <div className="awards-icon">
                              <LiaAwardSolid />
                            </div>
                            <div className="award-title">
                              {item.awards.title}
                              {item.awards.link ? (
                                <>
                                  <br />
                                  <a
                                    className="btn btn-xs float-end mt-2"
                                    href={item.awards.link}
                                    target="_blank"
                                  >
                                    <LiaEye /> View award
                                  </a>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <p>{item.detail}</p>
                      <div className="vertical-timeline-element-badge">
                        {item.badge.map((badge) => (
                          <span
                            style={{ backgroundColor: item.themeColor }}
                            className="badge"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        className="vertical-timeline-element-link"
                      >
                        Know more <LiaArrowCircleRightSolid />
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
        </div>
      </section>
      <Banner id="contact" title="Contact"></Banner>
      <section className="contact">
        <div className="contact-form">
          <div className="form-wrapper">
            <div className="wrapper-item">
              <h2>Contact</h2>
              <hr />
              <p>
                Get in touch with me. <br />I look forward to hearing from you!
              </p>
            </div>
            <div className="wrapper-item">
              <form className="w-full max-w-xs" onSubmit={onSubmit}>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  name="message"
                  placeholder="Message"
                  required
                ></textarea>
                <button className="btn" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="contact-card">
          <Tilt
            className="card-main"
            options={{
              scale: 1.1,
              speed: 1000,
              max: 40,
            }}
          >
            <div className="card-img">
              <div className="img-bg"></div>
            </div>
            <div className="card-avatar">
              <div className="avatar-bg"></div>
            </div>
            <div className="card-avatar-shadow"></div>
            <div className="card-name">Felix Yip</div>
            <div className="card-name-title">Front-End Developer</div>
            <div className="card-mail">
              <a href="mailto:tkyip3@gmail.com" className="mail-btn">
                <LiaEnvelope /> Contact me
              </a>
            </div>
          </Tilt>
        </div>
      </section>
      <div className="toast toast-end">
        <div className={`alert alert-success ${alertSuccess ? "" : "hide"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your form has been successfully sent.</span>
        </div>
        <div className={`alert alert-error ${alertError ? "" : "hide"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Apologies, try again.</span>
        </div>
      </div>
      <div className={`loading-wrap ${loadingClass} hidden`}>
        <div className="loading-text">
          <span ref={el}></span>
        </div>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            setLoadingClass("loading-hide");
            setHomeClass("active");
          }}
          className="loading-btn"
        >
          <PiSkipForward /> Skip
        </button>
      </div>
    </>
  );
}

export default App;
