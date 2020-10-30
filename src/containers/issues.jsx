import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import IssueRow from "../components/IssueRow";

function Issues() {
  let { owner, repo } = useParams();
  let [responseData, setResponseData] = React.useState("");

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.github.com/repos/" + owner + "/" + repo + "/issues",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      params: {
        per_page: 20,
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [owner, repo]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Issues Reported</h2>
      <NavBar owner={owner} repo={repo} />

      {/* <h3>{repoProps.fullName}</h3>
      <h4>{repoProps.stargazers_count} Stars</h4> */}
      {/* <pre>
        <code>{responseData && JSON.stringify(responseData, null, 4)}</code>
      </pre> */}
      {/* <ul> */}
      {responseData &&
        responseData.map((issue, index) => (
          <IssueRow issue={issue} key={index} owner={owner} repo={repo} />
          // <li key={index}>
          //   <Link
          //     to={{
          //       pathname: `/issue/${owner}/${repo}/${issue.number}`,
          //     }}
          //   >
          //     {issue.title}
          //   </Link>
          // </li>
        ))}
      {/* </ul> */}
    </div>
  );
}

export default Issues;
