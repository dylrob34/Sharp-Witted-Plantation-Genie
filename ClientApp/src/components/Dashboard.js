﻿import React from 'react';
import Device from './Device.js';
import { getToken } from '../GlobalStates.js';
import "../css/Dashboard.css";
import Loader from './Loader.js';
import EditOrRegisterDeviceModal from './EditOrRegisterDeviceModal';
import { Button } from 'reactstrap';



export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            plantNames: [],
            isLoading: false,
            registerDeviceMode: false,
            editDeviceMode: false,
            deviceToEdit: null
        }
        this.token = getToken();
        this.load = this.load.bind(this);
        this.handleEditOrRegisterMode = this.handleEditOrRegisterMode.bind(this);
        this.closeEditOrRegisterModal = this.closeEditOrRegisterModal.bind(this);
        this.handleEditOrRegisterDevice = this.handleEditOrRegisterDevice.bind(this);
    }

    async componentDidMount(){
        this.load();
        const plantNames = await this.getAllPlantNames();
        this.setState({plantNames});
    }

    load() {
        this.setState({isLoading : true})
        fetch('devices',
            {
                headers: {
                    Authorization: `${this.token}`
                },
            })
            .then((response) => response.json())
            .then((devices) => {
                this.setState({ devices, isLoading: false });
        });
    }

    getAllPlantNames(){
        return fetch('plants')
            .then(response => response.json())
            .then(plantNames => plantNames);
    }

    handleEditOrRegisterMode(deviceIdToEdit, mode){
        if (mode === 'create'){
            this.setState({'registerDeviceMode': true, 'editDeviceMode': false, 'deviceIdToEdit': null})
        }
        else{
            const deviceToEdit = this.state.devices.find(device => device.id === deviceIdToEdit);
            this.setState({'registerDeviceMode': false, 'editDeviceMode': true, 'deviceToEdit': deviceToEdit})
        }
    }

    closeEditOrRegisterModal(){
        this.setState({'registerDeviceMode': false, 'editDeviceMode': false, 'deviceIdToEdit': null})
    }

    handleEditOrRegisterDevice(device){
        console.log(device);
        
        if (this.state.registerDeviceMode){
            this.setState(prevState => ({
                devices: [...prevState.devices, device] // add device to end of array. Todo: Persist this in the database
            }))
            fetch('devices/registerDevice', {
                method: "POST",
                headers: {
                    Authorization: `${this.token}`,
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        "ID": parseInt(device.id),
                        "deviceName": device.deviceName,
                        "plantName": device.plantMonitoring
                    })
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log("error message: " + res.ErrorMessage);
                })
        }
        else {
            // TODO: persist this in the database
            let updatedDevices = this.state.devices.map(d => d.id === device.id ? {...device} : d);
            this.setState({devices: updatedDevices});   
            fetch('devices/editDevice',
                {
                method: "POST",
                headers: {
                    Authorization: `${this.token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        "ID": device.id,
                        "deviceName": device.deviceName,
                        "plantName": device.plantMonitoring
                    })
            })
        }
        this.closeEditOrRegisterModal();
    }

    render() {
        const { devices, isLoading, editDeviceMode, registerDeviceMode, deviceToEdit, plantNames } = this.state;

        var editOrCreateModal = null;
        var deviceItems;
        var deviceRegistrationMessage;
        var registerDeviceButton = isLoading ? null : (
            <div className='register-device-button-wrapper'>
                <Button color = 'primary' onClick = {() => this.handleEditOrRegisterMode(null, 'create')}> Register Device </Button>
            </div>
        )

        if (isLoading) deviceItems = <Loader/>
        else if (devices.length === 0) {
            deviceRegistrationMessage = <h1>you do not have any devices registered yet...</h1>
        }
        else{
            deviceItems = (
                <ul className='devices'>
                    {transformDevices(this.state.devices, this.handleEditOrRegisterMode)}
                </ul>
            )
        }

        if (editDeviceMode) editOrCreateModal = (
            <EditOrRegisterDeviceModal toggle={this.closeEditOrRegisterModal} mode='Edit Device' 
            deviceToEdit={deviceToEdit} plantNames = {plantNames} handleEditOrRegisterDevice = {this.handleEditOrRegisterDevice}/>
        );
        else if (registerDeviceMode) editOrCreateModal = (
            <EditOrRegisterDeviceModal toggle={this.closeEditOrRegisterModal} mode='Register Device' 
            plantNames = {plantNames} handleEditOrRegisterDevice = {this.handleEditOrRegisterDevice}/>
        );

        return (
            <div>
                {deviceRegistrationMessage}
                {registerDeviceButton}
                {deviceItems}
                {editOrCreateModal}
            </div>
        );
    }
}

function transformDevices(devices, editDevice){
    return devices.map((device) => (
        <Device key = {device.id} id={device.id} tankLevel={device.waterLevel}
        moistureLevel={device.moistureLevel} plant={device.plantMonitoring} 
        editDevice = {editDevice} deviceName = {device.deviceName}/>
    ));
}