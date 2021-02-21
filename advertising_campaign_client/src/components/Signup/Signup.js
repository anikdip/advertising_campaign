import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./Signup.css";
import {Link, Redirect} from "react-router-dom";

export default class Signup extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: "",
                email: "",
                password: "",
                c_password: "",
                isLoading: "",
                errMsgName: "",
                errMsgEmail: "",
                errMsgPwd: "",
                errMsgCPwd: "",
            },
            msg: "",
        };
    }

    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData });
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
            .post("http://localhost/api/register", this.state.signupData)
            .then((response) => {
                console.clear(response);
                this.setState({ isLoading: false });
                if (response.data.success === true) {
                    this.setState({
                        msg: response.data.message,
                        signupData: {
                            name: "",
                            email: "",
                            password: "",
                            c_password: ""
                        },
                    });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 2000);
                }

                if (response.data.status==422 && response.data.success === false) {

                    this.setState({
                        errMsgName: response.data.data.name,
                        errMsgEmail: response.data.data.email,
                        errMsgPwd: response.data.data.password,
                        errMsgCPwd: response.data.data.c_password,
                    });

                    setTimeout(() => {
                        this.setState({ errMsgName:"", errMsgEmail: "", errMsgPwd: "", errMsgCPwd: "" });
                    }, 2000);
                }

                if (response.data.status === "failed") {
                    this.setState({ msg: response.data.message });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 2000);
                }
            });
    };
    render() {

        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/campaign" />;
        }

        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form className="containers shadow">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="name"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.signupData.name}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgName}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.signupData.email}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgEmail}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.signupData.password}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgPwd}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="c_password">Confirm Password</Label>
                        <Input
                            type="password"
                            name="c_password"
                            placeholder="Enter confirm password"
                            value={this.state.signupData.c_password}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgCPwd}</span>
                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.onSubmitHandler}
                    >
                        Sign Up
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
                    <Link to="/" className="text-white ml-5">I'm already member</Link>
                </Form>
            </div>
        );
    }
}