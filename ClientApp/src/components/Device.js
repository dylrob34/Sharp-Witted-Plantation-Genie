import React from 'react';
import { Container, Row, Col } from "reactstrap";
import "../css/Device.css";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tankLevel: "",
            moistureLevel: "",
        }

        
    }

    componentDidMount() {
        this.setState({
            tankLevel: this.props.tankLevel,
            moistureLevel: this.props.moistureLevel
        });
    }


    render() {
        return (
            <li className='device' onClick = { () => this.props.editDevice(this.props.id, 'edit')}>
                <div className='device-button-group'>
                    <FontAwesomeIcon className='text-primary device-button' icon={faPencilAlt}/>
                </div>
                <div className='device-highlights'>
                    <img className='device-image' src={`/images/plants/${this.props.plant}.jpg`}></img>
                    <div className='device-details'>
                        <p> <b> Device Name: </b> Default Name... </p>
                        <p> <b> Plant: </b> {this.props.plant} </p>
                        <p> <b> Tank Level: </b> {this.props.tankLevel} / 10 oz </p>
                        <p> <b> Moisture Level </b> {this.props.moistureLevel} </p>
                    </div>
                </div>
            </li>
        );
    }
}