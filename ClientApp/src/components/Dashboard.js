import React from 'react';
import Device from './Device.js';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        }

        this.load = this.load.bind(this);

        //this.load();
    }

    load() {
        fetch('devices/getMine')
            .then((devices) => {
                this.setState({ devices });
            });
    }

    render() {
        var listItems;
        if (this.state.devices.length == 0) {
            listItems = 0;
        } else {
            listItems = this.state.devices.map((device) =>
                <li><Device id={device.id} tankLevel={device.tankLevel}
                    moistureLevel={device.moistureLevel} plant={device.plant} /></li>
            );
        }

        return (
            <div>
                <ul>{listItems}</ul>
            </div>
        );
    }
}