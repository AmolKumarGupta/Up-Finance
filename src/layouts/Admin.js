import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import { AuthContext } from "index";
import Profile from "views/admin/Profile";
import Tester from "views/admin/Tester";

export default function Admin() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!auth.token) {
      history.push('/auth')
    }
  }, [history, auth.token])

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/test" exact component={Tester} />
            <Redirect from="/admin" to="/admin/dashboard" />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
