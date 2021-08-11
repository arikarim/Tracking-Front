import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Nav from '../Pages/Navv';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Measurments from '../Pages/Measurments';
import MeasurmentEdit from '../Pages/MeasurmentEdit';
import Show from '../Pages/Showw';
import Record from '../Pages/Record';
import Footer from '../Pages/Footerr';
import Profile from '../Pages/Profile';
import EditProfile from '../Pages/EditProfile';

const Routes = ({ user, setUser }) => (
  <>
    <Router>
      <Nav setUser={setUser} />
      <div className="container cont">
        <Switch>
          <Route
            path="/signup"
            render={(props) => (
              // eslint-disable-next-line
              <Signup {...props} user={user} setUser={setUser} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              // eslint-disable-next-line
              <Login {...props} user={user} setUser={setUser} />
            )}
          />
          <Route
            path="/addrecord"
            component={Record}
          />
          <Route
            path="/:name/edit/:id"
            component={MeasurmentEdit}
          />
          <Route
            path="/:name/show/:id"
            component={Show}
          />
          <Route
            path="/:name/:id"
            component={Measurments}
          />
          <Route path="/editprofile" component={EditProfile} />
          <Route
            path="/profile"
          // eslint-disable-next-line
           render={(props) => <Profile {...props} />} />
          <Route
            path="/"
            // eslint-disable-next-line
            render={(props) => <Home {...props} />}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  </>
);

Routes.defaultProps = {
  user: null,
};

Routes.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func.isRequired,
};

export default Routes;
