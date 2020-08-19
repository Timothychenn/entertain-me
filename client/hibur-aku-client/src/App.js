import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

import AddMovie from "./containers/addMovie";
import AddTvSeries from "./containers/addTvSeries";
import Home from "./containers/home";
import Movies from "./containers/movies";
import Tvseries from "./containers/tvseries";
import Favorite from "./containers/favorites";
import DetailMovie from "./containers/detailMovie";
import DetailTvSeries from "./containers/detailTvSeries";
import EditMovie from "./containers/editMovie";
import EditTvSeries from "./containers/editTvSeries";
import Navbar from "./components/navbar";
import Jumbotron from "./components/jumbotron";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar />
          <Jumbotron />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            <Route exact path="/movies/:id">
              <DetailMovie />
            </Route>
            <Route exact path="/movies/:id/edit">
              <EditMovie />
            </Route>
            <Route exact path="/tvseries">
              <Tvseries />
            </Route>
            <Route exact path="/tvseries/:id">
              <DetailTvSeries />
            </Route>
            <Route exact path="/tvseries/:id/edit">
              <EditTvSeries />
            </Route>
            <Route exact path="/addmovie">
              <AddMovie />
            </Route>
            <Route exact path="/addtvseries">
              <AddTvSeries />
            </Route>
            <Route exact path="/favorite">
              <Favorite />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
