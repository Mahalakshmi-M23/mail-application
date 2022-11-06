import React from 'react';
import { FormGroup, FormControl, FormLabel, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import validate from './validate';
import { addMail } from '../../actions/mail';

const renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className={'errorColor'} >{error}</span>}
        </FormGroup>
    )
}

let Compose = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const { handleSubmit, show, handleClose} = props;

    const sendMail = async (values) => {
        const data = {
            userId: user && user._id || localStorage.getItem('userId'),
            senderId: user && user.email || localStorage.getItem('email'),
            receiverId: values.receiverId,
            subject: values.subject,
            message: values.message,
            status: 'send',
            deleteStatus: false,
            starredStatus: false
        };
        
       dispatch(addMail(data));
       dispatch(reset('Compose'));
       handleClose();
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Compose Mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Field
                    name="receiverId"
                    type='text'
                    component={renderField}
                    placeholder={'abc@email.com'}
                    label={'To'}
                />
                <Field
                    name="subject"
                    type='text'
                    component={renderField}
                    placeholder={'Subject'}
                    label={''}
                />
                <Field
                    name="message"
                    component="textarea"
                    label={"message"}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={handleSubmit(sendMail)}>Send</Button>
                </Modal.Footer>
            </Form>
            </Modal>
            
        </div>
    )
}

Compose = reduxForm({
    form: 'Compose',
    validate,
    // onSubmitSuccess: resetModal
})(Compose);

export default Compose;