import React from 'react';
import { Input, Form, FormGroup, Label, Button, FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import '../css/Buy.css';
import Loader from './Loader';
import isValidEmail from '../utils/validateEmail';

export class Buy extends React.Component {
    static displayName = Buy.name;
    state = {
        deviceTypes : [],
        isLoading: false,
        selectedDeviceType: 's', // hardcoded for now..
        emailAddress: '',
        emailErrorMessage: '',
        purchaseHasBeenMade: false
    }

    componentDidMount(){
        this.setState({isLoading: true})
        fetch('DeviceType')
            .then(response => response.json())
            .then(deviceTypes => {
                this.setState({deviceTypes, isLoading: false});
            })
    }

    handleEmailChange = (event) => {
        this.setState({emailAddress: event.target.value})
    }

    handlePurchasing = () => {
        if (!isValidEmail(this.state.emailAddress)){
            this.setState({emailErrorMessage: 'Invalid email format'});
            return;
        }
        else this.setState({emailErrorMessage: ''});

        fetch('purchase',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'emailAddress': this.state.emailAddress,
                'deviceType': this.state.selectedDeviceType
            })
        })
        .then((res) => {
            if (res.status == 200) this.setState({purchaseHasBeenMade: true});
        })
        .catch(error => {
            console.log("Error while purchasing ", error);
        })
    }

    handlePurchaseClosing = () => {
        this.setState({purchaseHasBeenMade: false, emailAddress: ''});
    }

    render() {
        const { deviceTypes, isLoading, selectedDeviceType, emailAddress, 
            emailErrorMessage, purchaseHasBeenMade } = this.state;
        const imagePath = `/images/deviceTypes/${selectedDeviceType}.jpg`

        let content = (
            <>
                <h1 style = {{textAlign: "center", marginBottom : "3rem"}}>Purchase A Device</h1>
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
                        <Input invalid = {emailErrorMessage !== ""} type="text" name="email" id="email" placeholder="Email..." 
                        bsSize="lg" onChange={ (event) => this.handleEmailChange(event) } value={emailAddress} />
                        <FormFeedback>{emailErrorMessage}</FormFeedback>
                    </FormGroup>
                    <Button onClick = {this.handlePurchasing} style={{marginTop: "1.7rem"}} color="primary" block size="lg">Purchase</Button>
                </Form>
            </>
        )

        if (isLoading) content = <Loader/>
        
        let purchaseConfirmation = (
            <Modal isOpen={purchaseHasBeenMade} toggle={this.handlePurchaseClosing}>
            <ModalHeader toggle={this.handlePurchaseClosing}>Purchase Confirmation</ModalHeader>
            <ModalBody>
                Your purchase has been successfully made.
                <br/>
                <br/>
                Please check your email address for an email that explains 
                how your device can be registered.
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handlePurchaseClosing}>Continue</Button>
            </ModalFooter>
          </Modal>
        )

        return (
            <>
                {content}
                {purchaseConfirmation}
            </>
        );
    }
}