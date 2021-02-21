import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

export default class CampaignEdit extends Component {
    userData;
    constructor(props) {
        console.log(props);
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
                errMsgTotalBudget: ""
            },
            msg: "",
            unauthorised: false
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get('http://localhost/api/campaigns/' + this.props.match.params.id, config)
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    this.setState({
                        campaignData: {
                            name: res.data.data.name,
                            date: res.data.data.date,
                            daily_budget: res.data.data.daily_budget,
                            total_budget: res.data.data.total_budget
                        }
                    });
                }
                else {
                    this.setState({msg: res.data.message, unauthorised: true});
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangehandler = (e, key) => {
        const { campaignData } = this.state;
        campaignData[e.target.name] = e.target.value;
        this.setState({ campaignData });
    };
    onSubmitHandler = (e) => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios
            .put("http://localhost/api/campaigns/" + this.props.match.params.id, this.state.campaignData, config)
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
    render() {
        const isCreated = this.state.isCreated;
        if (isCreated) {
            return <Redirect to="/campaign" />;
        }
        const isLoading = this.state.isLoading;

        const unauthorised = this.state.unauthorised;
        console.log(unauthorised);
        return (
            <div>
                {unauthorised===false ?(
                <Form className="containers shadow">
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
                        onClick={this.onSubmitHandler}
                    >
                        Edit
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
                ) : (
                    <Form>
                        <span className="text-danger">{this.state.msg}</span><br/><br/>
                        <Link className="add-link" to={"/campaign/"}>
                            <Button className="text-center mb-4" color="info" variant="info">Back</Button>
                        </Link>
                    </Form>
                )}
            </div>
        );
    }
}