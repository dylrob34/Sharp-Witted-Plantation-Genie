import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class EditOrRegisterDeviceModal extends Component{

    constructor(props){
        super(props);
        if (props.mode.toLowerCase().includes("edit")){
            this.state = {...this.props.deviceToEdit, deviceName: 'Default name...'}
        }
        else{
            this.state = {
                id: '',
                deviceName: '',
                plantMonitoring: this.props.plantNames[0]
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value});
    }

    render(){
        
        const { props } = this;
        const { plantMonitoring, deviceName } = this.state

        var deviceIdFormGroup = null;
        if (props.mode.toLowerCase().includes("register")) deviceIdFormGroup = ( // only render id form group if the user is registering a device
            <FormGroup>
                <Label for="id">Device Id</Label>
                <Input type="number" name="id" id="id" placeholder="Device Id..." onChange={this.handleInputChange} />
                <FormText color="muted">
                    This is located on the top of the device
                </FormText>
            </FormGroup>
        )

        return (  
            <Modal isOpen={true} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>{props.mode}</ModalHeader>
                <ModalBody>
                    <Form>
                        {deviceIdFormGroup}
                        <FormGroup>
                            <Label for="deviceName">Device Name</Label>
                            <Input type="text" name="deviceName" id="deviceName" placeholder="Device name..." value={deviceName} onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="plantMonitoring">Plant</Label>
                            <Input type="select" name="plantMonitoring" id="plantMonitoring" value={plantMonitoring} onChange={this.handleInputChange}>
                                {props.plantNames.map(plantName => <option key = {plantName}> {plantName} </option>)}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={ () => props.handleEditOrRegisterDevice({...this.state})}>Submit</Button>
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default EditOrRegisterDeviceModal;