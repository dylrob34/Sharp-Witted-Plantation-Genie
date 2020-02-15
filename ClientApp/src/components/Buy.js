import React from 'react';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import '../css/Buy.css';
import Loader from './Loader';

export class Buy extends React.Component {
    static displayName = Buy.name;
    state = {
        deviceTypes : [],
        isLoading: false
    }

    componentDidMount(){
        this.setState({isLoading: true})
        fetch('DeviceType')
            .then(response => response.json())
            .then(deviceTypes => {
                this.setState({deviceTypes, isLoading: false});
            })
    }

    render() {
        const { deviceTypes, isLoading } = this.state;
        let selectedDeviceType = "s"; // hard-coded for now
        const imagePath = `/images/deviceTypes/${selectedDeviceType}.jpg`

        let content = (
            <>
                <h1 style = {{textAlign: "center", marginBottom : "3rem"}}>Purchase A Deivce</h1>
                <div className="purchase-content">
                    <div className="purchase-image-wrapper">
                        <img className = "purchase-image" src={imagePath}/>
                    </div>
                    <div className="purchase-information">
                        <h3 style={{marginBottom: "1rem"}}> Sharp Witted Plantation Genie </h3>
                        <p> Price: $132.43</p>
                        <Input style = {{marginBottom: "1rem"}} type="select" name="deviceSize" id="deviceSize">
                                {deviceTypes.map(deviceType => (
                                    <option key = {deviceType.size} disabled={!deviceType.isInStock}> {deviceType.size} </option>
                                ))}
                        </Input>
                        <ul className="purchase-information-device-features">
                            <li>Device feature 1</li>
                            <li>Device feature 2</li>
                            <li>Device feature 3</li>
                            <li>This device is awesome</li>
                            <li>Device feature 5</li>
                            <li>You should really purchase our device. You won't regret it at all.</li>
                        </ul>
                    </div>
                </div>
                <Form style={{marginTop: "2rem"}}>
                    <FormGroup>
                        <Label for="email" size="lg">Email Address</Label>
                        <Input type="text" name="email" id="email" placeholder="Email..." size="lg" />
                    </FormGroup>
                    <Button style={{marginTop: "1.7rem"}} color="primary" block size="lg">Purchase</Button>
                </Form>
            </>
        )

        if (isLoading) content = <Loader/>

        return (
            content
        );
    }
}