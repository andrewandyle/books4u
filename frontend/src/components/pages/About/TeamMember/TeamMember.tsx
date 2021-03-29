import React from "react";

function TeamMember({ member }: any) {
  return (
    <div className="card mb-3" style={{ borderRadius: 10, maxWidth: 450 }}>
      <div className="d-flex flex-row p-2 border-bottom member-info">
        <img className="profile-pic" src={member.image} alt="Person" />
        <div className="p-2">
          <h3>{member.name}</h3>
          {member.status}
          <br />
          <b>GitLab ID:</b> {member.username}
          <br />
          <div className="row">
            <div className="col">
              <h1 className="value">{member.commits}</h1>Commits
            </div>
            <div className="col">
              <h1 className="value">{member.issues}</h1>Issues
            </div>
            <div className="col">
              <h1 className="value">{member.unitTests}</h1>Tests
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">{member.bio}</div>
    </div>
  );
}

export default TeamMember;
