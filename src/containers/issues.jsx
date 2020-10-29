import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Issues(props) {
  let { owner, repo } = useParams();
  let [responseData, setResponseData] = React.useState("");
  let [repoProps, setRepoProps] = React.useState("");

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
    setRepoProps(props.location.repoProps && props.location.repoProps);
  }, [fetchData, props]);

  return (
    <div>
      <h2>Issues</h2>

      <h3>{repoProps.fullName}</h3>
      <h4>{repoProps.stargazers_count} Stars</h4>
      {/* <pre>
        <code>{responseData && JSON.stringify(responseData, null, 4)}</code>
      </pre> */}
      <ul>
        {responseData &&
          responseData.map((issue, index) => (
            <li key={index}>
              <Link
                to={{
                  pathname: `/issue/${owner}/${repo}/${issue.number}`,
                  repoProps: repoProps,
                }}
              >
                {issue.title}
              </Link>
            </li>
          ))}
        {/*           
        <li>
          <Link to={`/issue/${owner}/${repo}/iss1`}>Issue 1</Link>
        </li>
        <li>
          <Link to={`/issue/${owner}/${repo}/iss2`}>Issue 2</Link>
        </li>
        <li>
          <Link to={`/issue/${owner}/${repo}/iss3`}>Issue 3</Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Issues;
