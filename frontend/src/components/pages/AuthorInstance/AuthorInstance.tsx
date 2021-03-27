import React from "react";
import useAxios from "axios-hooks";
import Loading from "../../Loading";

function AuthorInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data, loading }] = useAxios(`/api/author/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="container d-flex flex-column align-items-center">
      <img className="p-2" src={data.author.image} alt="Author" />
      <h2 className="p-2">
        {data.author.first_name} {data.author.last_name}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: data.author.spotlight }}></div>
      <ul className="list-group">
        <li className="list-group-item">
          On Tour: {data.author.on_tour ? "True" : "False"}
        </li>
      </ul>
      <br></br>
    </div>
  );
}

export default AuthorInstance;
