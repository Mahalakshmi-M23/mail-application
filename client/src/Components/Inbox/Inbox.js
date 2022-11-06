import React, { useEffect, useState } from 'react';
import {  Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getAllMails, getMail, addMail, updateMail, deleteMail
} from '../../actions/mail';
import { getUserData, userLogout } from '../../actions/user';
import './Inbox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft, faStarOfDavid} from "@fortawesome/free-solid-svg-icons";

let Inbox = (props) => {
    const dispatch = useDispatch();
    const { history } = props;
    const mailId = props.match.params;
    console.log(mailId);
    useEffect(() => {
        dispatch(getUserData(history));
        dispatch(getMail(history, mailId.id));
    }, []);
    
    let mail = useSelector(state => state.mail.mailList.data);
    console.log(mail);
    
    
    // userId = localStorage.getItem('userId');
    // userEmail = localStorage.getItem('email');

    
    return (
        <div>
            <Container>
                <div>
                    <Row className='row-pos'>
                        <div>
                            <Col xs={1} sm={1} md={1} lg={0}>
                                <Link to='/getMails' className='link-clr'>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                </Link>
                            </Col>
                            <Col>
                                { mail && mail.subject }
                            </Col>
                        </div>
                    </Row>
                    <Row className='row-pos'>
                        <div>
                            <Col>
                                { mail && mail.senderId}
                            </Col>
                        </div>
                    </Row>
                    <Row className='row-pos'>
                        <div>
                            <Col>
                                { mail && mail.message}
                            </Col>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    )

}


export default Inbox;