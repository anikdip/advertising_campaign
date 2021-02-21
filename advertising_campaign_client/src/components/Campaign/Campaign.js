import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CampaignTableRow from "./CampaignTableRow";
import Button from 'react-bootstrap/Button';

export default class Campaign extends Component {

    constructor(props) {
        super(props)
        this.state = {
            campaigns: []
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get('http://localhost/api/campaigns/', config)
            .then(res => {
                this.setState({
                    campaigns: res.data.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.campaigns.map((res, i) => {
            return <CampaignTableRow obj={res} key={i} />;
        });
    }

    render() {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user=="") {
            return <Redirect to="/" push={true} />;
        }
        return (
            <div className="container  border">
                <h3> Campaign List</h3>
                <div className="row">
                    <div className="col-xl-12 col-sm-12 col-md-12 text-dark">
                        <Link className="add-link" to={"/add-campaign/"}>
                            <Button size="sm" variant="info">Add Campaign</Button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-sm-12 col-md-12 text-dark">
                        <div className="table-wrapper">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Daily Budget</th>
                                    <th>Total Budget</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.DataTable()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}