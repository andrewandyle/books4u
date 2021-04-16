/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loading from "../../features/Loading";

// Images
import Logo from "../../media/logo.png";
import AndrewLe from "./media/andrew_le.jpg";
import SaiKiranMaddela from "./media/sai_kiran_maddela.jpg";
import RahulRamaswamy from "./media/rahul_ramaswamy.jpg";
import ByungikHyun from "./media/byungik_hyun.jpg";
import MariaSierra from "./media/maria_sierra.png";

interface TeamMemberData {
  name: string;
  username: string;
  email: string;
  commits: number;
  issues: number;
}
const teamMembers: TeamMemberData[] = [];

function About() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(teamMembers);
  const [stats, setStats] = useState({ commits: 0, issues: 0 });

  // TODO: Make this a Flask endpoint instead of fetching data here
  useEffect(() => {
    async function getData() {
      setLoading(true);
      let newStats = { ...stats };
      const commits = await fetchCommits();
      newStats = { ...newStats, commits: Object.values(commits).length };
      let newTeamMembers = [
        {
          name: "Andrew Le",
          status: "Phase 1 Leader, Frontend/Backend",
          username: "andrewandyle",
          email: "andrewandyle@gmail.com",
          commits: 0,
          issues: 0,
          unitTests: 20,
          image: AndrewLe,
          bio:
            "Andrew is a senior CS student who enjoys full-stack app development. Enjoys biking, weightlifting, being a foodie, and playing video games.",
        },
        {
          name: "Sai Kiran Maddela",
          status: "Phase 2 Leader, Frontend",
          username: "saikm22000",
          email: "saikiran.m00@gmail.com",
          commits: 0,
          issues: 0,
          unitTests: 17,
          image: SaiKiranMaddela,
          bio:
            "Sai is a third year CS student who is interested in AI/ML concepts, specifically neural networks and NLP. He enjoys playing basketball, biking, and reading.",
        },
        {
          name: "Rahul Ramaswamy",
          status: "Phase 3 Leader, Backend",
          username: "rahulramaswamy",
          email: "rahul.ramaswamy@utexas.edu",
          commits: 0,
          issues: 0,
          unitTests: 16,
          image: RahulRamaswamy,
          bio:
            "Rahul is a junior double majoring in computer science and math. He loves to try new food, travel, play poker, and watch new TV shows/movies.",
        },
        {
          name: "Byungik Hyun",
          status: "Frontend",
          username: "quddlr9015",
          email: "quddlr9015@gmail.com",
          commits: 0,
          issues: 0,
          unitTests: 16,
          image: ByungikHyun,
          bio:
            "Byungik is a senior CS student who likes to watch Premier League soccer games, play League of Legends, and watch old movies.",
        },
        {
          name: "Maria Sierra",
          status: "Frontend",
          username: "mjscs",
          email: "69916283+mjscs@users.noreply.github.com",
          commits: 0,
          issues: 0,
          unitTests: 16,
          image: MariaSierra,
          bio:
            "Maria is a senior CS student who is a fan of hiking, exploring new eateries in Austin, and watching the latest series in the Marvel cinematic universe.",
        },
      ];
      commits.forEach((commit: any) => {
        const correspondingMember = newTeamMembers.find(
          (member) =>
            member.email === commit.author_email ||
            member.username === commit.author_name
        );
        if (correspondingMember) correspondingMember.commits++;
      });
      const issues = await fetchIssues();
      newStats = { ...newStats, issues: Object.values(issues).length };
      issues.forEach((issue: any) => {
        const correspondingMember = newTeamMembers.find(
          (member) => member.username === issue.author.username
        );
        if (correspondingMember) correspondingMember.issues++;
      });
      setStats(newStats);
      setTeamData(newTeamMembers);
      setLoading(false);
    }
    getData();
  }, []);

  async function fetchCommits() {
    return fetch(
      "https://gitlab.com/api/v4/projects/24708015/repository/commits?all=yes&per_page=1000&pages=1000"
    ).then((res) => res.json());
  }

  async function fetchIssues() {
    return fetch(
      "https://gitlab.com/api/v4/projects/24708015/issues?all=yes&per_page=1000&pages=1000"
    ).then((res) => res.json());
  }

  return (
    <div className="container-fluid pt-5 pb-5">
      <div className="container">
        <div className="text-center mb-3">
          <img src={Logo} width={175} alt="Books4U" />
        </div>
        <h1 className="text-center">About Us</h1>
        <hr />
        <p>
          Curious about what else the author of your favorite book has written?
          Found an inspiring quote but don't know where it came from?
        </p>
        <p>
          Books For You (Books4U) is a site that aims to help people explore the
          literary world by browsing and exploring new books and authors. This
          site is aimed towards people who want to learn more about their
          favorite literary works or authors, or for those who simply want to
          get more into reading!
        </p>
        <h1 className="text-center">Team</h1>
        <hr />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="d-flex flex-wrap justify-content-evenly">
              {teamData.map((data) => (
                <TeamMember member={data} key={data.username} />
              ))}
            </div>
          </div>
          <div className="container mb-5">
            <div className="d-flex flex-wrap justify-content-evenly mb-3">
              <h3 className="text-center">Total Commits: {stats.commits} </h3>
              <h3 className="text-center">Total Issues: {stats.issues}</h3>
              <h3 className="text-center">Total Unit Tests: 85</h3>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly">
              <button className="click">
                <a
                  className="a"
                  href="https://gitlab.com/cs373-group14/books4u"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                    alt="GitLab"
                    width={40}
                    style={{ marginRight: 10 }}
                  />
                  GitLab Repo
                </a>
              </button>

              <button className="click">
                <a
                  className="a"
                  href="https://documenter.getpostman.com/view/10839542/Tz5jcyx6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://miro.medium.com/max/512/1*fVBL9mtLJmHIH6YpU7WvHQ.png"
                    alt="Postman"
                    width={40}
                    style={{ marginRight: 10 }}
                  />
                  Postman Documentation
                </a>
              </button>
            </div>
          </div>
        </>
      )}
      <div className="container">
        <h1 className="text-center">Tools</h1>
        <hr />
        <div>
          <img
            src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
            alt="GitLab"
            className="tool-icon"
          />
          <a href="https://about.gitlab.com/" target="_blank" rel="noreferrer">
            GitLab
          </a>
          : DevOps platform used to manage our Git repository, issues, and
          pipelines.
        </div>
        <div>
          <img
            src="https://miro.medium.com/max/512/1*fVBL9mtLJmHIH6YpU7WvHQ.png"
            alt="Postman"
            className="tool-icon"
          />
          <a href="https://www.postman.com/" target="_blank" rel="noreferrer">
            Postman
          </a>
          : API development tool used to document and test our REST API.
        </div>
        <div>
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
            alt="React"
            className="tool-icon"
          />
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            React
          </a>
          : Facebook's JavaScript library, used to build our user interface.
        </div>
        <div>
          <img
            src="https://miro.medium.com/max/320/0*_rAD9NgK7l6KSlNc.png"
            alt="Bootstrap"
            className="tool-icon"
          />
          <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
            Bootstrap
          </a>
          : CSS framework used to style the frontend of our website.
        </div>
        <div>
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/12_Algolia_logo_logos-512.png"
            alt="Algolia"
            className="tool-icon"
          />
          <a href="https://www.algolia.com/" target="_blank" rel="noreferrer">
            Algolia
          </a>
          : Search-as-a-service platform used to search across the entire
          website.
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png"
            alt="AWS"
            className="tool-icon"
          />
          <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
            AWS
          </a>
          : Cloud platform used to host our website and manage storage/databases
          (EC2, Elastic Beanstalk, CloudFront, RDS)
        </div>
        <div>
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png"
            alt="Docker"
            className="tool-icon"
          />
          <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
            Docker
          </a>
          : Platform as a service (PaaS) used to package our toolchain and
          dependencies into containers.
        </div>
        <div>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/namecheap-283654.png"
            alt="Namecheap"
            className="tool-icon"
          />
          <a href="https://www.namecheap.com/" target="_blank" rel="noreferrer">
            Namecheap
          </a>
          : Domain name registrar used to register our website's domain name.
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
            alt="Python"
            className="tool-icon"
          />
          <a
            href="https://flask.palletsprojects.com/en/1.1.x/"
            target="_blank"
            rel="noreferrer"
          >
            Flask
          </a>
          : Python micro web framework used to develop our REST API.
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png"
            alt="PostgreSQL"
            className="tool-icon"
          />
          <a
            href="https://www.postgresql.org/"
            target="_blank"
            rel="noreferrer"
          >
            PostgreSQL
          </a>
          : Object-relational database system used to store our data in the
          backend.
        </div>
        <div>
          <img
            src="https://heliocentrix.co.uk/wp-content/uploads/2020/04/microsoft-teams-logo-png_480-480.png"
            alt="Teams"
            className="tool-icon"
          />
          <a
            href="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Teams
          </a>
          : Our primary method of communication.
        </div>
        <h1 className="text-center">APIs</h1>
        <hr />
        <div>
          <img
            src="https://i.pinimg.com/originals/e2/c4/5d/e2c45dbfac497352070e2adc136d76f4.png"
            alt="Google Books"
            className="tool-icon"
          />
          <a
            href="https://developers.google.com/books"
            target="_blank"
            rel="noreferrer"
          >
            Google Books
          </a>
          : Used to gather over 2,000 books
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Penguin_logo.svg/1200px-Penguin_logo.svg.png"
            alt="Penguin Random House"
            className="tool-icon"
          />
          <a
            href="https://developer.penguinrandomhouse.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            Penguin Random House
          </a>
          : Used to gather over 200 authors
        </div>
        <div>
          <img
            src="https://theysaidso.com/branding/theysaidso.png"
            alt="They Said So"
            className="tool-icon"
          />
          <a
            href="https://theysaidso.com/api/"
            target="_blank"
            rel="noreferrer"
          >
            They Said So
          </a>
          : Used to gather over 200 quotes
        </div>
      </div>
    </div>
  );
}

export default About;
