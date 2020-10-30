import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function NavBar(prop) {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState("");

  const getRepoDetails = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.github.com/repos/" + prop.owner + "/" + prop.repo,
      headers: {
        Accept: "application/vnd.github.v3+json",
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
    getRepoDetails();
  }, [getRepoDetails]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>{responseData.full_name}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <StarIcon />
            {responseData.stargazers_count}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
