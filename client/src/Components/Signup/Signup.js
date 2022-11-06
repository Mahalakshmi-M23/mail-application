import React from 'react';
import { Row, Col, FormGroup, FormControl, FormLabel, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className={'errorColor'} >{error}</span>}
        </FormGroup>
    )
}

let Signup = (props) => {
    const { handleSubmit } = props;

    return (
        <div>
               <Row>
                    <Col>
                        <h1>Signup</h1>
                        <hr />
                        <Form onSubmit={handleSubmit(submit)}>
                            <Field
                                name="firstName"
                                type='text'
                                component={renderField}
                                placeholder={'Jane'}
                                label={'First Name'}
                            />
                            <Field
                                name="lastName"
                                type='text'
                                component={renderField}
                                placeholder={'Doe'}
                                label={'Last Name'}
                            />
                            <Field
                                name="email"
                                type='email'
                                component={renderField}
                                placeholder={'johndoe@email.com'}
                                label={'User Name or email'}
                            />
                            <Field
                                name="mobileNumber"
                                type='text'
                                component={renderField}
                                placeholder={'+91'}
                                label={'Mobile Number'}
                            />
                            <Field
                                name="password"
                                type='password'
                                component={renderField}
                                placeholder={'password'}
                                label={'Password'}
                            />
                            <Field
                                name="confirmPassword"
                                type='password'
                                component={renderField}
                                placeholder={'password'}
                                label={'Confirm Password'}
                            />

                            <Button type='submit'>Signup</Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to={'/'}>Login</Link>
                    </Col>
                </Row>
            
        </div>
    )
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default Signup;