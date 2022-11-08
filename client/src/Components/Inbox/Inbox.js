import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getMail
} from '../../actions/mail';
import { getUserData, userLogout } from '../../actions/user';
import './Inbox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

let Inbox = (props) => {
    const dispatch = useDispatch();
    const { history } = props;
    const mailId = props.match.params;
    // console.log(mailId);
    useEffect(() => {
        dispatch(getUserData(history));
        dispatch(getMail(history, mailId.id));
    }, []);

    let mail = useSelector(state => state.mail.mailList.data);

    return (
        <div className='mainCont'>
            <div>
                <Card border='primary' style={{ width: '80%' }}>
                    <Card.Header>
                        <div className='arrow'>
                            <Link to='/getMails' className='link-clr'>
                                <FontAwesomeIcon icon={faArrowLeft} size='xl' />
                            </Link>
                        </div>
                        <Card.Title as='h2'>{mail && mail.subject}</Card.Title>
                    </Card.Header>
                    <div className='mailCon'>
                        <Card.Body>
                            <div className='toSplit'>
                                <Card.Subtitle as='h4'>
                                    To: {mail && mail.senderId}
                                </Card.Subtitle>

                            </div>
                            <Card.Text as='h5'>
                                {mail && mail.message}
                            </Card.Text>
                        </Card.Body>
                    </div>
                </Card>

            </div>
        </div>
    )

}


export default Inbox;