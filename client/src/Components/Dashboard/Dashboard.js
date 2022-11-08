import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getAllMails, updateMail, deleteMail
} from '../../actions/mail';
import './Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faStarOfDavid, faInbox, faPaperPlane, faUser, faUserAlt, faUserAltSlash, faUserCheck, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Compose from '../Compose/Compose';
import { getUserData, userLogout } from '../../actions/user';

let Dashboard = (props) => {
    const dispatch = useDispatch();

    const { history } = props;
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('Inbox');
    console.log(show);

    useEffect(() => {
        // console.log('inside effect')
        dispatch(getUserData(history))
        dispatch(getAllMails(history))
    }, [show]);

    let mailList = useSelector(state => state.mail.mailList);


    const user = useSelector(state => state.user.user);

    let userId;

    if (user) {
        localStorage.setItem('userId', user._id);
        localStorage.setItem('email', user.email);
        userId = localStorage.getItem('userId');
        // userEmail = localStorage.getItem('email');
    }


    const handleStatusChange = (mailId, starredStatus, deleteStatus) => {
        const data = {
            mailId,
            starredStatus,
            deleteStatus
        };
        dispatch(updateMail(data, history));
        dispatch(getUserData(history))
        dispatch(getAllMails(history));
    }


    const handleClose = () => {
        setShow(false);
    };


    const handleModal = () => setShow(true);

    const handleDelete = () => {
        const data = {
            isDelete: true,
            userId
        }

        dispatch(deleteMail(data, history))
        dispatch(getAllMails(history));
        setStatus('Inbox');
    }

    const handleMenuStatus = (status) => {
        if (status === 'Trash') {
            dispatch(getAllMails(history));
        }
        setStatus(status)
    };

    const handleLogout = () => {
        dispatch(userLogout(history))
        history.push('/')
    }
    if (status === 'Inbox' && mailList && mailList.length > 0) {
        mailList = mailList.filter((mail) => mail.status === 'recieve' && mail.deleteStatus === false && mail.userId === userId);
    }

    if (status === 'Starred Mails' && mailList && mailList.length > 0) {
        mailList = mailList.filter(mail => mail.starredStatus === true && mail.deleteStatus === false && mail.userId === userId);

    }

    if (status === 'Sent' && mailList && mailList.length > 0) {
        mailList = mailList.filter(mail => mail.status == "send" && mail.deleteStatus == false && mail.userId === userId && mail.sendStatus == "true")
    }


    if (status === 'Trash' && mailList && mailList.length > 0) {
        mailList = mailList.filter(mail => mail.deleteStatus === true && mail.userId === userId);
    }

    console.log(mailList);
    console.log(show);
    return (
        <div>

            {show && <div>
                <Compose show={show} handleClose={handleClose} history={history} />
            </div>}
            <div className='compLogCont'>
                <div className='compose'>
                    <Button type="submit" onClick={handleModal}>Compose</Button>
                </div>
                <div className='logout'>
                    <Link to={'#'} className='link-clr' onClick={() => handleLogout()} >
                        <Button>
                            <div className='logoutSplit'>
                                <div>
                                    <FontAwesomeIcon icon={faUserCircle} size="2xl" />
                                </div>
                                <div>
                                    <h5>Logout</h5>
                                </div>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className='titleCont'>
                <h3>{status}</h3>
                {
                    mailList && mailList.length !== 0 && status === 'Trash' &&
                    <div>
                        <Button type='submit' onClick={handleDelete}>Delete All</Button>
                    </div>
                }
            </div>

            <div className='mailsCont'>
                <div className='mailsLeft'>
                    <div>
                        <Link to='#' onClick={() => handleMenuStatus('Inbox')}><FontAwesomeIcon icon={faInbox} />Inbox</Link>
                    </div>
                    <div>
                        <Link to='#' onClick={() => handleMenuStatus('Starred Mails')}><FontAwesomeIcon icon={faStar} />Starred</Link>
                    </div>
                    <div>
                        <Link to='#' onClick={() => handleMenuStatus('Sent')}><FontAwesomeIcon icon={faPaperPlane} />Sent</Link>
                    </div>
                    <div>
                        <Link to='#' onClick={() => handleMenuStatus('Trash')}><FontAwesomeIcon icon={faTrash} />Trash</Link>
                    </div>
                </div>

                <div className='mailCont'>
                    {
                        mailList && mailList.length > 0 && mailList.map((mail) => {

                            return (
                                mail.userId === userId &&
                                <div className='singleMailCont' key={mail && mail._id}>
                                    <div>
                                        <Link to={'/mail/' + mail._id} className='link-clr' >
                                            <p>{mail.subject}</p>
                                        </Link>
                                        <p className='max-lines'>{mail.message}</p>
                                    </div>

                                    <div className='mailBtn'>
                                        <Link to={'#'} className='link-clr'>
                                            {
                                                mail && mail._id && mail.starredStatus === true ?
                                                    <FontAwesomeIcon icon={faStar} size="sm" onClick={() => handleStatusChange(mail._id, false, mail.deleteStatus)} /> :
                                                    <FontAwesomeIcon icon={faStarOfDavid} size="sm" onClick={() => handleStatusChange(mail._id, true, mail.deleteStatus)} />
                                            }
                                        </Link>

                                        {
                                            status !== 'Trash' &&
                                            <Link to={'#'} className='link-clr'>
                                                {
                                                    mail && mail._id && mail.deleteStatus === false &&
                                                    <FontAwesomeIcon icon={faTrash} size="sm" onClick={() => handleStatusChange(mail._id, mail.starredStatus, true)} />
                                                }
                                            </Link>
                                        }
                                    </div>
                                </div>

                            )
                        })
                    }

                    {
                        mailList && mailList.length === 0 &&

                        <div className='noMail'>
                            <h3>No Mails Here...</h3>
                        </div>
                    }
                </div>


            </div>

        </div>
    )

}


export default Dashboard;