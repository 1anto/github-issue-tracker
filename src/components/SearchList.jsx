import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

export default function SearchList(prop) {
  let [responseData, setResponseData] = React.useState("");
  const classes = useStyles();

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.github.com/search/repositories",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      params: {
        q: prop.searchKey,
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [prop]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.root}>
      <ul>
        {responseData &&
          responseData.items.map((item, index) => (
            <li key={index}>
              <Link
                to={{
                  pathname: `/issues/${item.full_name}`,
                }}
              >
                {item.full_name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
