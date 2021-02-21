import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import Modal from './Modal.js';
import Table from "react-bootstrap/Table";

export default class CampaignCreate extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state = {
            campaignData: {
                name: "",
                date: "",
                daily_budget: "",
                total_budget: "",
                isLoading: "",
                isCreated: "",
                errMsgName: "",
                errMsgDate: "",
                errMsgDailyBudget: "",
                errMsgTotalBudget: "",
                modalShow: false
            },
            msg: "",
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    onChangehandler = (e, key) => {
        const { campaignData } = this.state;
        campaignData[e.target.name] = e.target.value;
        this.setState({ campaignData });
    };
    onSubmitHandler = (e) => {
        this.hideModal();
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios
            .post("http://localhost/api/campaigns", this.state.campaignData, config)
            .then((response) => {
                console.clear(response);
                this.setState({ isLoading: false, isCreated: false });
                if (response.data.success === true) {
                    this.setState({
                        msg: response.data.message,
                        campaignData: {
                            name: "",
                            date: "",
                            daily_budget: "",
                            total_budget: ""
                        },
                    });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 2000);

                    this.setState({ isCreated: true });
                }

                if (response.data.status==422 && response.data.success === false) {

                    this.setState({
                        errMsgName: response.data.data.name,
                        errMsgDate: response.data.data.date,
                        errMsgDailyBudget: response.data.data.daily_budget,
                        errMsgTotalBudget: response.data.data.total_budget,
                    });

                    setTimeout(() => {
                        this.setState({ errMsgName:"", errMsgDate: "", errMsgDailyBudget: "", errMsgTotalBudget: "" });
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

    showModal = () => {
        this.setState({ modalShow: true });
    };

    hideModal = () => {
        this.setState({ modalShow: false });
    };

    render() {
        const isCreated = this.state.isCreated;
        if (isCreated) {
            return <Redirect to="/campaign" />;
        }
        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form className="containers shadow">
                    <Modal show={this.state.modalShow} handleClose={this.hideModal} submit={this.onSubmitHandler}>
                        <div className="container  border">
                            <h3> Campaign Preview</h3>
                            <div className="row">
                                <div className="col-xl-12 col-sm-12 col-md-12 text-dark">
                                    <div className="table-wrapper">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{this.state.campaignData.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>{this.state.campaignData.date}</td>
                                                </tr>
                                                <tr>
                                                    <th>Daily Budget</th>
                                                    <td>{this.state.campaignData.daily_budget}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Budget</th>
                                                    <td>{this.state.campaignData.total_budget}</td>
                                                </tr>
                                            </thead>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="name"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.campaignData.name}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgName}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            placeholder="Enter date"
                            value={this.state.campaignData.date}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgDate}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="daily_budget">Daily Budget</Label>
                        <Input
                            type="number"
                            name="daily_budget"
                            placeholder="Enter daily budget"
                            value={this.state.campaignData.daily_budget}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgDailyBudget}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="total_budget">Total Budget</Label>
                        <Input
                            type="number"
                            name="total_budget"
                            placeholder="Enter total budget"
                            value={this.state.campaignData.total_budget}
                            onChange={this.onChangehandler}
                        />
                        <span className="text-danger">{this.state.errMsgTotalBudget}</span>
                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.showModal}
                        // onClick={this.onSubmitHandler}
                    >
                        Create
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
                    <Link className="add-link" to={"/campaign/"}>
                        <Button className="text-center mb-4" color="info" variant="info">Back</Button>
                    </Link>
                </Form>
            </div>
        );
    }
}