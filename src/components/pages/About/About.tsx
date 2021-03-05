/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";

const teamMembers = [
  { name: "Andrew Le", username: "andrewandyle", commits: 0, issues: 0 },
  { name: "Sai Kiran Maddela", username: "saikm22000", commits: 0, issues: 0 },
  {
    name: "Rahul Ramaswamy",
    username: "rahulramaswamy",
    commits: 0,
    issues: 0,
  },
  { name: "Byungik Hyun", username: "quddlr9015", commits: 0, issues: 0 },
  { name: "Maria Sierra", username: "mjscs", commits: 0, issues: 0 },
];

function About() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(teamMembers);
  const [stats, setStats] = useState({ commits: 0, issues: 0 });

  useEffect(() => {
    async function getData() {
      let newStats = { ...stats };
      const commits = await fetchCommits();
      newStats = { ...newStats, commits: Object.values(commits).length };
      let newTeamMembers = [...teamMembers];
      commits.forEach((commit: any) => {
        (
          newTeamMembers.find(
            (member) =>
              member.name === commit.author_name ||
              member.username === commit.author_name
          ) || newTeamMembers[4]
        ).commits++;
      });
      const issues = await fetchIssues();
      newStats = { ...newStats, issues: Object.values(issues).length };
      issues.forEach((issue: any) => {
        (
          newTeamMembers.find(
            (member) => member.username === issue.author.username
          ) || newTeamMembers[4]
        ).issues++;
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
            <TeamMember member={data} />
          ))}
        </div>
      </div>
      <div className="container">
        <h3 className="text-center">Total Commits: {stats.commits} </h3>
        <h3 className="text-center">Total Issues: {stats.issues}</h3>
        <h4 className="text-center">
        <a href="https://documenter.getpostman.com/view/10839542/Tz5jcyx6">Postman Documentation</a>
        </h4>
      </div>
    </div>
    
  );
}

export default About;
