import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Device from './Device.js';
import { getToken } from '../GlobalStates.js';
import "../css/Dashboard.css";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        }

        this.load = this.load.bind(this);

        this.load();
    }

    load() {
        const token = getToken();
        const btoken = "Bearer " + token;
        if (token !== "") {

            fetch('devices',
                {
                    headers: {
                        Authorization: btoken,
                    },
                })
                .then((response) => response.json())
                .then((devices) => {
                    this.setState({ devices });
                });
        }
    }

    render() {
        var listItems;
        if (this.state.devices.length === 0) {
            listItems = <h1>you do not have any devices registered yet...</h1>;
        } else {
            listItems = this.state.devices.map((device) =>
                <Col className="dashboard-item"><Device key={device.id} id={device.id} tankLevel={device.waterLevel}
                    moistureLevel={device.moistureLevel} plant={device.plantMonitoring} /></Col>
            );
        }

        return (
            <div>
                <Container>
                    <Row>
                        {listItems}
                    </Row>
                </Container>
            </div>
        );
    }
}