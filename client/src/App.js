import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Inbox from './Components/Inbox/Inbox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './App.css';

const App = () => {
  return (

    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path='/getMails' component={Dashboard} exact />
        <Route path='/mail/:id' component={Inbox} exact />
      </Switch>
    </BrowserRouter>
  )
}



export default App;