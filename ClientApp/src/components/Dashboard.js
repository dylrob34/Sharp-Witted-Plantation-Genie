import React from 'react';
import Device from './Device.js';
import { getToken } from '../GlobalStates.js';
import "../css/Dashboard.css";
import Loader from './Loader.js';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            isLoading: true
        }

        this.load = this.load.bind(this);

        this.load();
    }

    load() {
        const token = getToken();
        const btoken = "Bearer " + token;
        if (token !== "") {
            this.setState({isLoading : true})
            fetch('devices',
                {
                    headers: {
                        Authorization: btoken,
                    },
                })
                .then((response) => response.json())
                .then((devices) => {
                    this.setState({ devices, isLoading: false });
                });
        }
    }

    render() {
        var contentToRender;
        if (this.state.isLoading) contentToRender = <Loader/>
        else if (this.state.devices.length === 0) {
            contentToRender = <h1>you do not have any devices registered yet...</h1>
        }
        else{
            contentToRender = (
                <ul className='devices'>
                    {transformDevices(this.state.devices)}
                </ul>
            )
        }

        return (
            <div>
                {contentToRender}
            </div>
        );
    }
}

function transformDevices(devices){
    return devices.map((device) => (
        <Device key = {device.id} id={device.id} tankLevel={device.waterLevel}
        moistureLevel={device.moistureLevel} plant={device.plantMonitoring}/>
    ));
}