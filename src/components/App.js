import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Users from "./Users";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/users" component={Users} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;