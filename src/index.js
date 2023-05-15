import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import useAuth from "auth/useAuth";
// import Index from "views/Index.js";

export const AuthContext = createContext({})

function App() {
  const [token, setToken] = useAuth();
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={Admin} />
          <Redirect from="*" to="/admin" />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
