import React, { Component } from "react";
import "./App.css";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Campaign from "./components/Campaign/Campaign";
import {BrowserRouter as Router, Route, NavLink, Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import CampaignCreate from "./components/Campaign/CampaignCreate";
import CampaignEdit from "./components/Campaign/CampaignEdit";

export default class App extends Component {
    state = {
        navigate: false,
    };

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
        window.location.replace("/");
    };

    render() {

        let navLink = (
            <div className="Tab">
                <NavLink to="/sign-up" activeClassName="activeLink" className="signUp">
                    Sign Up
                </NavLink>
                <NavLink exact to="/" activeClassName="activeLink" className="signIn">
                    Sign In
                </NavLink>
            </div>
        );

        const user = JSON.parse(localStorage.getItem("userData"));
        let header = (
            <div className="container  border">
                <div className="row">
                    <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
                        <h5> Welcome, {user!=null?user.name:""} </h5>
                    </div>
                    <div className="col-xl-3 col-sm-12 col-md-3">
                        <Button
                            className="btn btn-danger text-right"
                            onClick={this.onLogoutHandler}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );

        const login = localStorage.getItem("isLoggedIn");
        console.log(login);

        return (
            <div className="App">
                {login ? (
                    <Router>
                        {header}
                        <Route exact path="/" component={Campaign}></Route>
                        <Route path="/campaign" component={Campaign}></Route>
                        <Route path="/add-campaign" component={CampaignCreate}></Route>
                        <Route path="/edit-campaign/:id" component={CampaignEdit}></Route>
                    </Router>
                ) : (
                    <Router>
                        {navLink}
                        <Route exact path="/" component={Signin}></Route>
                        <Route path="/sign-up" component={Signup}></Route>
                    </Router>
                )}
            </div>
        );
    }
}