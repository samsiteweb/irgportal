import React from "react";
import "./App.css";
import Login from "./sections/login-section/login-section.component";
import Register from "./sections/register-section/register.comp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountUpdate from "./sections/update-account/accupdate";
import ForgotPassword from "./sections/forgot-password/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import RegisterAdmin from "./sections/admin-reg/reg-admin";
import ImageUploadInput from "./components/imageUpload/imageupload.comp";
import Iportal from "./sections/portalsection/portalpage/portal";

function App() {
  return (
    <div className='flex-container'>
      <div className='flex-sub'>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/updateAccount' component={AccountUpdate} />
            <Route path='/forgotPass' component={ForgotPassword} />
            <Route path='/passReset' component={ResetPassword} />
            <Route path='/adminReg' component={RegisterAdmin} />
            <Route path='/imgUpload' component={ImageUploadInput} />
            <Route path='/portal' component={Iportal} />
          </Switch>
        </Router>
      </div>
      <div className='flex-footer'></div>
    </div>
  );
}

export default App;
