import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Pages/Nav";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Measurments from "../Pages/Measurments";
import MeasurmentEdit from "../Pages/MeasurmentEdit";
import Show from "../Pages/Show";
import AddRecord from "../Pages/AddRecord";
import Footer from "../Pages/Footer";

const Routes = ({ user, setUser }) => {
  return (
    <div>
      <Router>
        <Nav setUser={setUser} />
        <div className="container">
          <Switch>
            <Route
              path="/signup"
              render={(props) => (
                <Signup {...props} user={user} setUser={setUser} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login {...props} user={user} setUser={setUser} />
              )}
            />
            <Route
              path="/addrecord"
              render={(props) => <AddRecord {...props} />}
            />
            <Route
              path="/:name/edit/:id"
              render={(props) => <MeasurmentEdit {...props} />}
            />
            <Route
              path="/:name/show/:id"
              render={(props) => <Show {...props} />}
            />
            <Route
              path="/:name/:id"
              render={(props) => <Measurments {...props} />}
            />
            <Route path="/" render={(props) => <Home {...props} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default Routes;
