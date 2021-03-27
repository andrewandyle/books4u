import React from "react";
import useAxios from "axios-hooks";
import Loading from "../../Loading";

function AuthorInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data: author, loading }] = useAxios(`/api/author/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="container d-flex flex-column align-items-center">
      <img className="p-2" src={author.image} alt="Author" />
      <h2 className="p-2">
        {author.first_name} {author.last_name}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: author.spotlight }}></div>
      <ul className="list-group">
        <li className="list-group-item">
          On Tour: {author.on_tour ? "True" : "False"}
        </li>
      </ul>
      <br></br>
    </div>
  );
}

export default AuthorInstance;
