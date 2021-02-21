import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
        };
    }
    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = () => {
        this.setState({ isLoading: true });
        axios
            .post("http://localhost/api/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.data.success === true) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userData", JSON.stringify(response.data.data));
                    this.setState({
                        msg: response.data.message,
                        redirect: true,
                    });
                    window.location.replace("/campaign");
                }
                if (response.data.status==422 && response.data.success === false) {

                    this.setState({
                        errMsgEmail: response.data.data.email,
                        errMsgPwd: response.data.data.password,
                    });

                    setTimeout(() => {
                        this.setState({ errMsgEmail: "", errMsgPwd: "" });
                    }, 2000);
                } else if (response.data.success === false && response.data.data.error == "Unauthorised"
                ) {
                    this.setState({
                        errMsg: "Invalid Username Password",
                    });
                    setTimeout(() => {
                        this.setState({ errMsg: "" });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/campaign" />;
        }
        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form className="containers">
                    <FormGroup>
                        <Label for="email">Email id</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.msg}</span>
                        <span className="text-danger">{this.state.errMsgEmail}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgPwd}</span>
                    </FormGroup>
                    <p className="text-danger">{this.state.errMsg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.onSignInHandler}
                    >
                        Sign In
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <span></span>
                        )}
                    </Button>
                </Form>
            </div>
        );
    }
}