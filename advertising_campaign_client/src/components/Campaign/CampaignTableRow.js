import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CampaignTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteCampaign = this.deleteCampaign.bind(this);
        this.state = {delete: false};
    }

    deleteCampaign() {
        const user = JSON.parse(localStorage.getItem("userData"));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.delete('http://localhost/api/campaigns/' + this.props.obj.id, config)
            .then((res) => {
                console.log('Campaign removed deleted!')
                this.setState({ delete: true });
            }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        if (this.state.delete) {
            return <Redirect to="/campaign" push={true} />;
        }
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.date}</td>
                <td>{this.props.obj.daily_budget}</td>
                <td>{this.props.obj.total_budget}</td>
                <td>
                    <Link className="edit-link" to={"/edit-campaign/" + this.props.obj.id}>
                        <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.deleteCampaign} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}