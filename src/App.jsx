import React, { useEffect, useRef, useState } from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getPrimaryEmail(email) {
  return (email || "").split("|")[0].trim();
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function LinkBtn({ href, children, variant = "primary" }) {
  const cls = variant === "primary" ? "btn btnPrimary" : "btn btnGhost";
  const isExternal = href?.startsWith("http");
  return (
    <a
      className={cls}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="sectionHeader">
        {subtitle && <div className="sectionKicker">{subtitle}</div>}
        <h2 className="sectionTitle">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Card({ className, children }) {
  return <div className={cx("card", className)}>{children}</div>;
}

function FlipProfile({ frontSrc, backSrc, alt = "Profile photo" }) {
  return (
    <div className="flipWrap" aria-label="Profile photo">
      <div className="flipInner">
        <div className="flipFace flipFront">
          <img className="flipImg" src={frontSrc} alt={alt} />
        </div>
        <div className="flipFace flipBack">
          <img className="flipImg" src={backSrc} alt={alt} />
        </div>
      </div>
    </div>
  );
}

function ExperienceCards({ experience }) {
  return (
    <div className="altTimeline">
      {experience.map((item, idx) => (
        <div key={idx} className={cx("altTimelineItem", idx % 2 === 0 ? "altLeft" : "altRight")}>
          <div className="altTimelineMarker" aria-hidden="true" />
          <Card>
            <div className="altTimelineDate pill">{item.dates}</div>
            <div className="altTimelineRole">{item.role}</div>
            <div className="altTimelineCompany">{item.company}</div>
            {item.techStack?.length ? (
              <div className="altTimelineTags">
                {item.techStack.map((tech, index) => (
                  <Pill key={index}>{tech}</Pill>
                ))}
              </div>
            ) : null}
            <p className="altTimelineDesc">{item.bullets.join(" ")}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}

function TimelineList({ items, type }) {
  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <div className="timelineSection">
      <div className="timelineList">
        <div className="timelineLine" aria-hidden="true" />
        {items.map((item) => (
          <div key={item.id} className="timelineItem">
            <div className="timelineMarker" aria-hidden="true" />
            <div className="timelineContent">
              <div className="timelineHeader">
                <div className="timelineTitle">{item.title}</div>
                <div className="timelineDates">
                  <span className="timelineDateIcon">📅</span>
                  {item.dates}
                </div>
              </div>
              <div className="timelineSubtitle">{item.subtitle}</div>
              {item.summary ? <div className="timelineSummary">{item.summary}</div> : null}
              <button className="btn btnSmall" type="button" onClick={() => setSelectedEntry(item)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEntry ? (
        <div className="timelineModalOverlay" onClick={() => setSelectedEntry(null)}>
          <div className="timelineModal" onClick={(event) => event.stopPropagation()}>
            <div className="timelineModalHeader">
              <div>
                <div className="timelineModalTitle">{selectedEntry.title}</div>
                <div className="timelineModalSubtitle">{selectedEntry.subtitle}</div>
              </div>
              <button className="timelineModalClose" type="button" onClick={() => setSelectedEntry(null)}>
                ×
              </button>
            </div>
            <div className="timelineModalBody">
              <div className="timelineModalDates">
                <span className="timelineDateIcon">📅</span> {selectedEntry.dates}
              </div>
              {type === "Academic" ? (
                <div className="timelineModalCourses">
                  {selectedEntry.details.map((course, index) => (
                    <span key={index} className="courseTag">
                      {course}
                    </span>
                  ))}
                </div>
              ) : (
                <ul className="timelineModalBullets">
                  {selectedEntry.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function EducationCards({ education }) {
  return (
    <div className="educationGrid">
      {education.map((item, idx) => (
        <Card key={idx} className="educationCard">
          <div className="educationDegree">{item.degree}</div>
          <div className="educationSchool">
            {item.school}
            {item.location ? ` · ${item.location}` : ""}
          </div>
          <div className="educationDates">
            <span className="timelineDateIcon">📅</span>
            {item.dates}
          </div>
          {item.courses?.length ? (
            <div className="educationCourses">
              {item.courses.map((course, index) => (
                <Pill key={index}>{course}</Pill>
              ))}
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}

function ExperienceTimeline({ experience }) {
  const professionalEntries = experience.map((item, index) => ({
    id: `professional-${index}`,
    type: "Professional",
    title: item.role,
    subtitle: `${item.company}`,
    summary: item.bullets?.[0] || "Professional responsibility details available on request.",
    dates: item.dates,
    details: item.bullets || ["Detailed responsibilities available on request."],
  }));

  return <TimelineList items={professionalEntries} type="Professional" />;
}

function MoreAboutMe({ items }) {
  return (
    <Card>
      <ul className="moreAboutList">
        {items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.title}:</strong> {item.description}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SkillGroup({ title, items }) {
  return (
    <div className="skillGroup">
      <div className="skillGroupTitle">{title}</div>
      <div className="skillPills">
        {items.map((item, index) => (
          <span key={index} className="skillBadge">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="blockCard">
      <div className="blockCardHeader" aria-hidden="true">
        {project.icon || "💡"}
      </div>
      <div className="blockCardBody">
        <div className="blockCardTitle">{project.title}</div>
        {project.techStack?.length ? (
          <div className="blockCardTags">
            {project.techStack.map((tech, index) => (
              <Pill key={index}>{tech}</Pill>
            ))}
          </div>
        ) : null}
        <p className="blockCardDesc">{project.bullets?.join(" ")}</p>
        {project.links?.length ? (
          <a className="blockCardLink" href={project.links[0].url} target="_blank" rel="noreferrer">
            {project.links[0].label} →
          </a>
        ) : null}
      </div>
    </div>
  );
}

function CertificationList({ certifications }) {
  return (
    <div className="certificationGrid">
      {certifications.map((cert, idx) => (
        <Card key={idx} className="certificationCard">
          <div className="projectTop">
            <div>
              <a className="projectTitle certificationLink" href={cert.url} target="_blank" rel="noreferrer">
                {cert.name}
              </a>
              <div className="projectTagline">{cert.issuer}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ProjectCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const projectCount = projects.length;

  const normalizeIndex = (index) => (index + projectCount) % projectCount;
  const goToIndex = (index) => setCurrentIndex(normalizeIndex(index));
  const nextSlide = () => setCurrentIndex((value) => normalizeIndex(value + 1));
  const prevSlide = () => setCurrentIndex((value) => normalizeIndex(value - 1));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      }
      if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projectCount]);

  const getTagline = (project) => {
    const phrase = project.bullets?.[0] || project.links?.[0]?.label || project.title;
    return phrase.length > 100 ? `${phrase.slice(0, 97)}...` : phrase;
  };

  const getHighlights = (project) => {
    return (project.bullets || [])
      .slice(0, 3)
      .map((bullet, index) => {
        const label = bullet
          .replace(/[\.\,]$/g, "")
          .split(" ")
          .slice(0, 6)
          .join(" ");
        return { label, key: `highlight-${index}` };
      });
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;
    const delta = touchStartX.current - event.changedTouches[0]?.clientX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div className="projectCarousel">
      <div className="carouselWrapper">
        <button className="carouselNav carouselPrev" aria-label="Previous project" onClick={prevSlide}>
          ‹
        </button>
        <div className="carouselViewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="carouselTrack" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {projects.map((project, idx) => (
              <article className="carouselSlide" key={idx}>
                <div className="carouselSlideInner">
                  <div className="carouselSingle card">
                    <div className="carouselSingleInner">
                      <div className="carouselTitleColumn">
                        <h3 className="carouselDetailsTitle">{project.title}</h3>
                      </div>
                      <div className="carouselContent">
                        <p className="carouselDetailsText">{project.bullets?.join(" ")}</p>
                        {project.links?.length ? (
                          <div className="carouselSummaryLinks">
                            {project.links.map((link, idx) => (
                              <a key={idx} className="projectLink" href={link.url} target="_blank" rel="noreferrer">
                                {link.label} →
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <button className="carouselNav carouselNext" aria-label="Next project" onClick={nextSlide}>
          ›
        </button>
      </div>
      <div className="carouselDots" role="tablist">
        {projects.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={cx("carouselDot", currentIndex === idx && "active")}
            onClick={() => goToIndex(idx)}
            aria-label={`View project ${idx + 1}`}
            aria-current={currentIndex === idx ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}

function PublicationsList({ publications }) {
  return (
    <div className="projectGrid">
      {publications.map((item, idx) => (
        <div key={idx} className="blockCard">
          <div className="blockCardHeader" aria-hidden="true">📄</div>
          <div className="blockCardBody">
            <div className="blockCardTitle">{item.title}</div>
            <Pill>{item.publisher}</Pill>
            <p className="blockCardDesc">{item.description}</p>
            {item.url ? (
              <a className="blockCardLink" href={item.url} target="_blank" rel="noreferrer">
                Read publication →
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

const CONTENT = {
  name: "Rajanee Shenkar",
  titleLine: "MS Data Science & Engineering at Stevens Institute of Technology",
  intro:
    "Data science and engineering focused on AI/ML systems, data pipelines, and analytics. I build production-ready solutions that combine strong technical foundations, modern ML workflows, and clear communication for stakeholders.",
  location: "New York City, NY",
  email: "shenkarrajanee@gmail.com | rshenkar@stevens.edu",
  linkedin: "https://www.linkedin.com/in/rajanee-shenkar-a1862626b/",
  github: "https://github.com/rajniiii",
  resumeUrl: "https://drive.google.com/file/d/1b6NvyXdw-Bn2tt6wqXdvZe-lFVWkw1ZC/view?usp=drive_link",
  profileImages: {
    front: "/assets/profile/profile-winter.jpg",
    back: "/assets/profile/profile-classroom.jpg",
  },
  technicalSkills: [
    {
      title: "Analytics & Visualization",
      items: ["Tableau", "Power BI", "Excel (Advanced)", "Matplotlib", "Google Analytics"],
    },
    {
      title: "Programming & Data",
      items: ["Python", "SQL", "R", "C++", "Java"],
    },
    {
      title: "AI & Automation",
      items: ["LLM", "RAG", "Prompt Engineering", "NLP", "TensorFlow", "PyTorch"],
    },
    {
      title: "Cloud & Engineering",
      items: ["AWS", "Azure", "Snowflake", "Databricks", "Git", "Apache Kafka"],
    },
  ],
  education: [
    {
      school: "Stevens Institute of Technology",
      location: "Hoboken, NJ",
      degree: "M.S. in Data Science",
      dates: "2024 - 2026",
      logo: "/assets/logos/universities/stevens.png",
      courses: [
        "MS Data Science Foundational",
        "Mathematics for Data Science",
        "Intro to Probability Theory",
        "Applied Machine Learning",
        "Numerical Linear Algebra for Big Data",
        "Statistical Methods",
        "Marketing Analytics",
        "Time Series Analysis I",
        "Financial Lab: Practical Aspects of Database Design",
        "Data Visualization Application",
        "Deep Learning",
        "Prompt Engineering for Business Applications",
      ],
    },
    {
      school: "MIT-WPU",
      location: "Pune, India",
      degree: "B.Tech, Computer Science and Technology",
      dates: "2019 - 2023",
      logo: "/assets/logos/universities/mitwpu.png",
      courses: [
        "Engineering Graphics",
        "Applied Mechanics",
        "Discrete Structures",
        "Microprocessor and Interfacing Techniques",
        "Data and Mobile Communication",
        "Microprocessor and Microcontroller",
        "Software Engineering and Project Management",
        "Operating Systems",
        "Database Management System",
        "Software Modeling and Design",
        "Theory of Computation",
        "Embedded and IoT Lab",
        "Design and Analysis of Algorithms",
        "Data Warehousing and Data Mining",
        "Information Security",
        "System Software and Compilers",
        "Artificial Intelligence",
        "Big Data Analytics",
        "Distributed Computing",
        "User Interface and User Experience Design",
        "Augmented Reality and Virtual Reality",
      ],
    },
  ],
  certifications: [
    {
      name: "Microsoft Azure AI Essentials Professional",
      issuer: "Microsoft & LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/36182de093ee6d7dad88ec1c8bfbd2db5f8e913d837b2c73486b09d661e54f74",
    },
    {
      name: "Forward Deployed Engineering in the Age of AI",
      issuer: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/certificates/5486f76a627b45e0cc45e72457fcdc70f6fad7eb2976e2ca853b43f428b03e52",
    },
    {
      name: "Foundations: Data, Data, Everywhere",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/N4E7LQNPUYYJ",
    },
  ],
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Easley-Dunn Productions",
      dates: "Jun 2026 – Present",
      bullets: [
        "Developing a node-based game balance simulation tool in Unity (GraphView API) enabling designers to model and test game mechanics.",
        "Shipping analysis features including automated graph validation, batch config comparison, and CSV/JSON export for external tooling.",
      ],
      techStack: ["Unity", "GraphView API", "React", "Python"],
    },
    {
      role: "Graduate Assistant – Office of the Provost",
      company: "Stevens Institute of Technology",
      dates: "Oct 2024 – May 2026",
      bullets: [
        "Updated inventory systems and structured datasets with consistent validation and version control.",
        "Managed scheduling, reporting, and stakeholder communication for administrative operations.",
        "Created polished Excel dashboards and slide decks to improve reporting clarity.",
      ],
      techStack: ["Excel", "PowerPoint", "Data Management"],
    },
    {
      role: "Data-Focused Backend Developer",
      company: "DigitalDose",
      dates: "Aug 2023 – Jul 2024",
      bullets: [
        "Built scalable REST APIs with Node.js and MongoDB for CRM and school management systems.",
        "Implemented JWT authentication and role-based access across app workflows.",
        "Integrated NLP-based support tools and TensorFlow Lite for inference-driven experiences.",
      ],
      techStack: ["Node.js", "Express", "MongoDB", "TensorFlow Lite"],
    },
    {
      role: "Data Engineer",
      company: "Yibe",
      dates: "Jul 2022 – Dec 2022",
      bullets: [
        "Delivered microservices for authentication and payment flows using Node.js.",
        "Integrated Firebase Authentication and Firestore to manage secure user data.",
        "Automated Python testing and ETL scripts to improve reliability.",
      ],
      techStack: ["Firebase", "Firestore", "Python", "REST APIs"],
    },
    {
      role: "Application Support Analyst",
      company: "Iraje Software",
      dates: "Dec 2021 – Mar 2022",
      bullets: [
        "Supported implementation and ongoing maintenance of a Privileged Access Management (PAM) system to ensure secure access controls.",
        "Developed optimized SQL queries for efficient data retrieval and management.",
        "Assisted in debugging and troubleshooting application issues, improving system reliability for end users.",
        "Collaborated with cross-functional teams to document support workflows and escalation procedures.",
      ],
      techStack: ["SQL", "PAM", "Debugging", "Application Support", "Data Management"],
    },
  ],
  projects: [
    {
      title: "Playbook Forge",
      icon: "🛠️",
      techStack: ["Docker Compose", "MySQL", "ChromaDB", "Ollama", "FastAPI", "MCP Server"],
      bullets: [
        "Built an agentic data migration playbook that moves unstructured data from ChromaDB into a structured PostgreSQL schema, orchestrating the pipeline through discrete Authenticate, Navigate, Clean, Transform, Review, and Load stages.",
        "Runs a local LLM via Ollama alongside a FastAPI app and MCP server, with MySQL and ChromaDB for storage, all orchestrated end-to-end with Docker Compose.",
      ],
      links: [
        {
          label: "Demo",
          url: "https://drive.google.com/file/d/1y8jkgVUZGoZsYM5bD_96Ahf2A4wUiXFL/view?usp=drive_link",
        },
      ],
    },
    {
      title: "GTM-Copilot",
      icon: "📧",
      techStack: ["n8n", "FastAPI", "Gemini API", "Tavily", "Google Sheets", "Slack"],
      bullets: [
        "Architected a GTM automation stack using n8n Cloud, FastAPI, and the Gemini API integrated with Tavily for research, Google Sheets for lead storage, and Slack for notifications.",
        "Built a full cold-email workflow with a responsive web UI (HTML/CSS/JS) handling the research-to-outreach pipeline end-to-end.",
      ],
      links: [
        {
          label: "Demo",
          url: "https://drive.google.com/file/d/1qhq_z38YFGPuTfnl5gvcLQbaVQ6zeBCn/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "RAG-Probe",
      icon: "📄",
      techStack: ["Python", "PyMuPDF", "OpenAI Embeddings", "Chroma"],
      bullets: [
        "Built an adversarial evaluation framework for RAG pipelines using SEC 10-K filings as the document corpus.",
        "Used PyMuPDF for document parsing, OpenAI embeddings for vectorization, and Chroma for vector storage and retrieval.",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rajniiii/RAG-Probe",
        },
      ],
    },
    {
      title: "SowZone: Code for Climate 2026",
      icon: "🌱",
      techStack: ["React", "FastAPI", "Leaflet.js", "Base44", "NYC Open Data"],
      bullets: [
        "Urban agriculture platform for NYC residents that discovers idle city land and accelerates community planting.",
        "Performs real soil analysis by integrating ISRIC and USGS APIs to assess soil properties and contamination risk.",
        "Generates AI-driven crop restoration guides using local climate and soil data, with planting calendars and maintenance plans.",
        "Automates NYC GreenThumb permit prefill and submission to streamline community garden setup.",
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://sow-zone-grow.base44.app",
        },
      ],
    },
    {
      title: "Kaiko MCP Agent",
      icon: "📈",
      techStack: ["FastMCP", "Kaiko API", "OpenAI API", "Async", "GitHub Actions"],
      bullets: [
        "Built a production-style MCP server using FastMCP exposing Kaiko financial market and reference data endpoints as callable tools, with an async agent client routing queries through OpenAI function calling.",
        "Extended to download OHLCV and raw trade data with paginated fetching, CSV export, and a multi-turn agent loop.",
        "Set up a GitHub Actions CI/CD pipeline for automated testing and deployment.",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rajniiii/kaiko-mcp-agent",
        },
      ],
    },
    {
      title: "Customer Retention and CLV Modeling – Allianz Insurance",
      icon: "📊",
      techStack: ["Python", "Churn Analysis", "CLV Forecasting", "Segmentation"],
      bullets: [
        "Performed churn analysis on insurance policy data using time-based cutoff logic, identifying a 4.04% churn rate.",
        "Built customer retention models aligned with industry best practices, including CLV forecasting and customer segmentation.",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rajniiii/Data_Analysis_AllianzInsurance/blob/main/Data_drivenAnalysis_AllianzInsuranceipynb.ipynb",
        },
      ],
    },
    {
      title: "Decentralised Crowdfunding Platform",
      icon: "🪙",
      techStack: ["React", "Firebase", "Solidity", "Web3.js", "MetaMask"],
      bullets: [
        "Engineered a decentralised crowdfunding platform using React hooks, Context API, Firebase Authentication, Firestore sync, and Cloud Functions.",
        "Developed and deployed Ethereum smart contracts in Solidity with reusable libraries and inheritance for modular blockchain logic.",
        "Integrated Web3.js for secure transactions, MetaMask wallet support, and authenticated crowdfunding flows.",
      ],
      links: [
        {
          label: "View paper",
          url: "https://www.eurchembull.com/archives/volume-12/special%20issue-10/14115",
        },
      ],
    },
    {
      title: "World Real Estate Price Prediction - Analysis using ML",
      icon: "🏠",
      techStack: ["Random Forest", "Neural Networks", "Stacking", "Feature Engineering"],
      bullets: [
        "Led end-to-end development of ML models achieving 99.7% accuracy in predicting global property prices.",
        "Implemented ensemble methods (Random Forest, Neural Networks, Stacking) with advanced feature engineering on 147K properties dataset.",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rajniiii/worldrealestateprediction",
        },
      ],
    },
    {
      title: "Real-Time Sign Language Recognition",
      icon: "🤟",
      techStack: ["MediaPipe", "Bidirectional LSTM", "Computer Vision"],
      bullets: [
        "Built a live sign language recognition system using MediaPipe Holistic to extract 258-D pose and hand keypoints.",
        "Classified dynamic gesture sequences with a Bidirectional LSTM trained on a custom video dataset, achieving 85.57% test accuracy at 20-30 FPS.",
        "Added smoothing and confidence-thresholding for stable live predictions and designed the system for future sentence-level recognition and smart glasses deployment.",
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rajniiii/sign_language",
        },
      ],
    },
  ],
  publications: [
    {
      title: "Advanced Generation of Private and Community Crowdfunding Platform for Investors",
      publisher: "European Chemical Bulletin",
      url: "https://www.eurchembull.com/archives/volume-12/special%20issue-10/14115",
      description:
        "Published research on a blockchain-based crowdfunding platform leveraging Ethereum, Solidity, Smart Contracts, and Web3.js to ensure decentralization, transparency, and reduced dependency on intermediaries.",
    },
  ],
  moreAboutMe: [
    {
      title: "Sketching & Painting",
      description: "Draw and paint occasionally. I enjoy sketching competitions as a creative outlet outside of work.",
    },
    {
      title: "Yoga",
      description: "Practice yoga to stay balanced and focused.",
    },
    {
      title: "Cycling",
      description: "Enjoy cycling as a way to stay active and explore.",
    },
    {
      title: "Hiking",
      description: "Love getting outdoors and hiking trails.",
    },
    {
      title: "Learning French",
      description: "Currently learning French on Duolingo.",
    },
  ],
};

export default function App() {
  const c = CONTENT;
  const primaryEmail = getPrimaryEmail(c.email);

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandName">{c.name}</div>
            </div>
          </div>

          <nav className="nav">
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#publications">Publications</a>
            <a href="#about-more">More About Me</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="topbarCtas">
            <LinkBtn href={c.resumeUrl} variant="ghost">
              Resume
            </LinkBtn>
            <LinkBtn href="#contact">Contact</LinkBtn>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <span className="kicker">Data Science · AI · ML Engineering</span>
              <h1 className="heroTitle">Hey, I’m Rajanee.</h1>
              <p className="heroLead">{c.intro}</p>
              <div className="heroCtas">
                <LinkBtn href={c.linkedin}>LinkedIn</LinkBtn>
                <LinkBtn href={c.github}>GitHub</LinkBtn>
                <LinkBtn href={c.resumeUrl}>Download CV</LinkBtn>
              </div>
            </div>

            <div className="heroPanel">
              <div className="heroImageWrapper">
                <FlipProfile frontSrc={c.profileImages.front} backSrc={c.profileImages.back} alt="Profile" />
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <Section id="education" subtitle="Academic" title="Educational Journey">
            <EducationCards education={c.education} />
          </Section>

          <Section id="experience" subtitle="Work" title="Professional Experience">
            <ExperienceCards experience={c.experience} />
          </Section>

          <Section id="projects" subtitle="" title="Projects">
            <div className="projectGrid">
              {c.projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </Section>

          <Section id="certifications" subtitle="" title="Certifications">
            <CertificationList certifications={c.certifications} />
          </Section>

          <Section id="publications" subtitle="Research" title="Publications">
            <PublicationsList publications={c.publications} />
          </Section>

          <Section id="about-more" subtitle="Beyond work" title="More About Me">
            <MoreAboutMe items={c.moreAboutMe} />
          </Section>

          <Section id="contact" subtitle="Reach out" title="Contact">
            <div className="contactGrid">
              <Card className="contactCard">
                <div className="contactItem">
                  <span className="contactIcon">✉️</span>
                  <div>
                    <div className="contactLabel">Email</div>
                    <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
                  </div>
                </div>
                <div className="contactItem">
                  <span className="contactIcon">📍</span>
                  <div>
                    <div className="contactLabel">Location</div>
                    <div>{c.location}</div>
                  </div>
                </div>
                <div className="contactActions">
                  <LinkBtn href={`mailto:${primaryEmail}`}>Email me</LinkBtn>
                  <LinkBtn href={c.linkedin} variant="ghost">
                    LinkedIn
                  </LinkBtn>
                  <LinkBtn href={c.github} variant="ghost">
                    GitHub
                  </LinkBtn>
                </div>
              </Card>
              <Card className="bioCard">
                <div className="cardTitle">Let's collaborate</div>
                <p className="muted">
                  I am actively seeking opportunities in data science, ML engineering, and AI research.
                  If you have a role or project that needs thoughtful analytics and dependable engineering, let’s talk.
                </p>
              </Card>
            </div>
          </Section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div>
            <div className="footerName">{c.name}</div>
            <div className="footerRole">AI & Data Science</div>
          </div>
          <div className="footerLinks">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
