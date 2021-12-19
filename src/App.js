import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/SingleProject/ProjectWithComments";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import ExploreAll from "./pages/ExploreAll/ExploreAll";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          {isAuthenticated() ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/login">
          {isAuthenticated() ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/profile/:username" component={Profile} />
        <Route path="/projects/:id" component={SingleProject} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <Route path="/explore" component={ExploreAll} />
        <Route exact path="/" component={Feed} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
