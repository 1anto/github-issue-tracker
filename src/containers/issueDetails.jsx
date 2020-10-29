import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Issue(props) {
  let { owner, repo, issueNumber } = useParams();
  let [responseData, setResponseData] = React.useState("");
  let [repoProps, setRepoProps] = React.useState("");

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url:
        "https://api.github.com/repos/" +
        owner +
        "/" +
        repo +
        "/issues/" +
        issueNumber,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => {
        setResponseData(response.data);
        setRepoProps(props.location.repoProps && props.location.repoProps);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [owner, repo, issueNumber, props]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>{repoProps.fullName}</h2>
      <h4>{repoProps.stargazers_count} Stars</h4>
      <h3>{responseData.title}</h3>
      <h3>#{responseData.id}</h3>
      <p>
        Opened {responseData.created_at} by{" "}
        {responseData.user && responseData.user.login}
      </p>
      <h3>{responseData.title}</h3>
      <h3>{responseData.title}</h3>
      <pre>
        <code>{responseData && JSON.stringify(responseData, null, 4)}</code>
      </pre>
    </div>
  );
}

export default Issue;
