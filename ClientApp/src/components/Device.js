import React from 'react';
import { Container, Row, Col } from "reactstrap";
import "../css/Device.css";

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
            <Container>
                <Row>
                    <Col><p>Tank Level</p></Col>
                    <Col></Col>
                    <Col><h3>{this.state.tankLevel}</h3></Col>
                </Row>
                <Row>
                    <Col><p>Moisture Level</p></Col>
                    <Col></Col>
                    <Col><h3>{this.state.moistureLevel}</h3></Col>
                </Row>
                <Row>
                    <Col><p>{this.props.plant}</p></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}