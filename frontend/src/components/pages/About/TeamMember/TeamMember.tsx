import React from "react";

function TeamMember({ member }: any) {
  return (
    <div className="card" style={{ maxWidth: 232 }}>
      <div className="card-img-top card-body" style={{ maxHeight: 232 }}>
        <img
          width={200}
          src={
            member.image ||
            "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
          }
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
        <hr />
        {member.bio}
      </div>
    </div>
  );
}

export default TeamMember;
