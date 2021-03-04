import React, { useState, useEffect } from "react";

// const teamMembers = [
//   { name: "Andrew Le" },
//   { name: "Sai Kiran Maddela" },
//   { name: "Rahul Ramaswamy" },
//   { name: "Byungik Hyun" },
//   { name: "Maria Sierra" },
// ];

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const commits = await fetchCommits();
      console.log("commits", commits);
      const issues = await fetchIssues();
      console.log("issues", issues);
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
    </div>
  );
}

export default About;
