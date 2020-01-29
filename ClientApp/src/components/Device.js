import React from 'react';

export default class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tankLevel: "",
            moistureLevel: "",
        }

        this.setState({
            tankLevel: this.props.tankLevel,
            moistureLevel: this.props.moistureLevel
        })
    }


    render() {
        return (
            <div>
                Each Device
            </div>
        );
    }
}