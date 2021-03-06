/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";

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
            "Sai is a senior CS student who is interested in AI/ML concepts, specifically neural networks and NLP. He enjoys playing basketball, biking, and reading.",
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

  return loading ? (
    <div className="text-center">Loading...</div>
  ) : (
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
      </div>
      <div className="container">
        <h1 className="text-center">Team</h1>
        <hr />
        <div className="d-flex">
          {teamData.map((data) => (
            <TeamMember member={data} key={data.username} />
          ))}
        </div>
      </div>
      <div className="container">
        <h3 className="text-center">Total Commits: {stats.commits} </h3>
        <h3 className="text-center">Total Issues: {stats.issues}</h3>
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
                  href="https://documenter.getpostman.com/view/10839542/Tz5jcyx6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>GitLab Repo Link</h4>
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
