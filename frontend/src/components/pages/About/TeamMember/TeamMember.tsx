import React from "react";

function TeamMember({ member }: any) {
  return (
    <div className="card">
      <div className="card-img-top">
        <img
          width={200}
          src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
          alt="Person"
        />
      </div>
      <div className="card-body">
        Name: {member.name}
        <br />
        GitLab ID: {member.username}
        <br />
        Commits: {member.commits}
        <br />
        Issues: {member.issues}
      </div>
    </div>
  );
}

export default TeamMember;
