import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Home from "./containers/home";
import Issues from "./containers/issues";
import IssueDetails from "./containers/issueDetails";

let App = () => {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <br />
      <br />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/issues/:owner/:repo" component={Issues} />
        <Route
          path="/issue/:owner/:repo/:issueNumber"
          component={IssueDetails}
        />
      </Switch>
      <br />
      <br />
    </BrowserRouter>
  );
};

export default App;
