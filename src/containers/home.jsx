import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  let [responseData, setResponseData] = React.useState("");

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.github.com/search/repositories",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      params: {
        q: "react",
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Home</h2>
      {/* <pre>
        <code>{responseData && JSON.stringify(responseData, null, 4)}</code>
      </pre> */}
      <ul>
        {responseData &&
          responseData.items.map((item, index) => (
            <li key={index}>
              <Link
                to={{
                  pathname: `/issues/${item.full_name}`,
                  repoProps: {
                    fullName: item.full_name,
                    stargazers_count: item.stargazers_count,
                    stargazers_url: item.stargazers_url,
                  },
                }}
              >
                {item.full_name}
              </Link>
            </li>
          ))}
        {/* <li>
          <Link to={`/issues/own2/rep2`}>Repo 2</Link>
        </li>
        <li>
          <Link to={`/issues/own3/rep3`}>Repo 3</Link>
        </li>
        <li>
          <Link to={`/issues/own4/rep4`}>Repo 4</Link>
        </li>
        <li>
          <Link to={`/issues/own5/rep5`}>Repo 5</Link>
        </li> */}
      </ul>
    </div>
  );
}
export default Home;
