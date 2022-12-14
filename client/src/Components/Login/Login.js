import React from 'react';
import { Row, Col, FormGroup, FormControl, FormLabel, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';
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

let Login = (props) => {
    const { handleSubmit } = props;

    return (
        <div className={'cont'}>
            <Row >
                <Col >
                    <h1>Login</h1>
                    <hr />
                    <Form onSubmit={handleSubmit(submit)}>
                        <Field
                            name="email"
                            type='email'
                            component={renderField}
                            placeholder={'janedoe@gmail.com'}
                            label={'Email'}
                            className='field'
                        />
                        <Field
                            name="password"
                            type='password'
                            component={renderField}
                            placeholder={'password'}
                            label={'Password'}
                            className='field'
                        />
                        <Button className='loginBtn' type='submit'>Login</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Link to={'/signup'}>Register</Link>
                </Col>
            </Row>

        </div>
    )
}

Login = reduxForm({
    form: 'login',
    validate
})(Login);

export default Login;