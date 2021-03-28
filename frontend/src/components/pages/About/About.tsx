/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import Loading from "../../features/Loading";

// Images
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

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let newStats = { ...stats };
      const commits = await fetchCommits();
      newStats = { ...newStats, commits: Object.values(commits).length };
      let newTeamMembers = [
        {
          name: "Andrew Le",
          username: "andrewandyle",
          email: "andrewandyle@gmail.com",
          commits: 0,
          issues: 0,
          image: AndrewLe,
          bio:
            "Andrew is a senior CS student who enjoys full-stack app development. Enjoys biking, weightlifting, being a foodie, and playing video games.",
        },
        {
          name: "Sai Kiran Maddela",
          username: "saikm22000",
          email: "saikiran.m00@gmail.com",
          commits: 0,
          issues: 0,
          image: SaiKiranMaddela,
          bio:
            "Sai is a third year CS student who is interested in AI/ML concepts, specifically neural networks and NLP. He enjoys playing basketball, biking, and reading.",
        },
        {
          name: "Rahul Ramaswamy",
          username: "rahulramaswamy",
          email: "rahul.ramaswamy@utexas.edu",
          commits: 0,
          issues: 0,
          image: RahulRamaswamy,
          bio:
            "Rahul is a junior double majoring in computer science and math. He loves to try new food, travel, play poker, and watch new TV shows/movies.",
        },
        {
          name: "Byungik Hyun",
          username: "quddlr9015",
          email: "quddlr9015@gmail.com",
          commits: 0,
          issues: 0,
          image: ByungikHyun,
          bio:
            "Byungik is a senior CS student who likes to watch Premier League soccer games, play League of Legends, and watch old movies.",
        },
        {
          name: "Maria Sierra",
          username: "mjscs",
          email: "69916283+mjscs@users.noreply.github.com",
          commits: 0,
          issues: 0,
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
    <div className="container-fluid pt-4 pb-4">
      <div className="container">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p>
          Curious about what else the author of your favorite book has written?
          Found an inspiring quote but don't know where it came from?
        </p>
        <p>
          Books4U is a site that aims to help people explore the literary world
          by browsing and exploring new books and authors. This site is aimed
          towards people who want to learn more about their favorite literary
          works or authors, or for those who simply want to get more into
          reading!
        </p>
        <h1 className="text-center">Team</h1>
        <hr />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="d-flex">
              {teamData.map((data) => (
                <TeamMember member={data} key={data.username} />
              ))}
            </div>
          </div>
          <div className="container">
            <h3 className="text-center">Total Commits: {stats.commits} </h3>
            <h3 className="text-center">Total Issues: {stats.issues}</h3>
          </div>
        </>
      )}
      <div>
      <h1 className="text-center">Tools</h1>
        <div className="row py 2 align-center">
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="Postman"
                  src="https://cdn.auth0.com/blog/build-a-secure-express-api-using-postman-and-auth0/postman-logo.png"
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://documenter.getpostman.com/view/10839542/Tz5jcyx6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>Postman Documentation Link</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="GitLab"
                  src="https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-stacked-rgb.png"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://gitlab.com/cs373-group14/books4u"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>GitLab Repo Link</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="React Bootstrap"
                  src="https://jquery-plugins.net/image/plugin/bootstrap-4-the-most-popular-html-css-and-js-library.jpg"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://getbootstrap.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>React BootStrap</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="AWS Elastic Beanstalk"
                  src="https://incarnated.net/wp-content/uploads/2018/03/elastic_beanstalk.png"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://aws.amazon.com/elasticbeanstalk/?nc1=h_ls"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>AWS Elastic Beanstalk</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="NameCheap"
                  src="https://www.forbes.com/coupons/vfiles/31137/merchant_image-merchant_open_graph.png/"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://www.namecheap.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>NameCheap</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="Microsoft Teams"
                  src="https://www.marshall.edu/it/files/microsoft-team-2019.png"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://www.microsoft.com/en-us/microsoft-teams/teams-for-work?=&ef_id=CjwKCAjwr_uCBhAFEiwAX8YJgY8yke0RO6nmkP-ZuoJL0RwU2RGqrOhatMtDjfoiorO0bMHTO8CXMxoCKhUQAvD_BwE:G:s&OCID=AID2100233_SEM_CjwKCAjwr_uCBhAFEiwAX8YJgY8yke0RO6nmkP-ZuoJL0RwU2RGqrOhatMtDjfoiorO0bMHTO8CXMxoCKhUQAvD_BwE:G:s&gclid=CjwKCAjwr_uCBhAFEiwAX8YJgY8yke0RO6nmkP-ZuoJL0RwU2RGqrOhatMtDjfoiorO0bMHTO8CXMxoCKhUQAvD_BwE&rtc=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>Microsoft Teams</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="React"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQe3DFXTvg9YbRAxRClU6IuWD5-VmhryDSDMFhxs1Q4zsXB5t7p-yP8-ZHlxbFKrcyDU&usqp=CAU"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>React</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="Zoom"
                  src="https://i.pcmag.com/imagery/reviews/05fRE6utWAtXmByTrwqgdcU-9.1569481702.fit_lim.size_1200x630.jpg"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://zoom.us/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>Zoom</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="AWS EC2"
                  src="https://miro.medium.com/max/750/1*q6F0j8HFHd8jeYXyQBqrCQ.jpeg"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>AWS EC2</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="AWS Cloudfront"
                  src="https://cdn2.iconfinder.com/data/icons/amazon-aws-stencils/100/Storage__Content_Delivery_Amazon_CloudFront-512.png"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://aws.amazon.com/cloudfront/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>AWS Cloudfront</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <h1 className="text-center">APIs</h1>
        <div className="row py 2 align-center">
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="Google Books APIs"
                  src="https://9to5google.com/wp-content/uploads/sites/4/2015/10/google-books.png"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://developers.google.com/books"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>Google Books API</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="Penguin Random House"
                  src="https://cdn2.mhpbooks.com/2016/10/Penguin-Random-House-UK-logo.jpg"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://developer.penguinrandomhouse.com/docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>Penguin Random House API</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="p-2 col-lg-4 col-md-2">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  alt="They said so"
                  src="data:image/jpeg;base64,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"
                  style={{ height: "278px", width: "300px" }}
                />
                <br></br>
                <a
                  className="card-title"
                  href="https://theysaidso.com/api/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>They Said So API</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
