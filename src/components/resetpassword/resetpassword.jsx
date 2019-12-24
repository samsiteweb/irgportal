import React, { Component } from "react";
import CardContainer from "../card-container/card_container";
import Formfield from "../input-field/input_field";
import { Form, Button } from "semantic-ui-react";
import validatorFunction, {
  InputToUpperCase,
  validateForm
} from "../../lib/validatorLib";
import axios from "axios";
import UrlLib from "../../lib/urlLib";
import MessageLabel from "../message-label/messagelabel";
import CompletedMessage from "../completedMessage";
// import "./resetpassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      email: "",
      Code: false,
      Password: false,
      ConfirmPassword: false,
      validators: {
        Password: false,
        ConfirmPassword: false,
        Code: false
      },
      showMessage: false,
      message: false,
      loading: false,
      submitted: false
    };
  }
  componentDidMount() {
    console.log(this.props.location.state);
    const { id, email } = this.props.location.state;
    this.setState({ id: id, email: email });
  }

  handleChange = e => {
    let { id, value } = e.target;
    let validators = this.state.validators;
    validatorFunction(id, value, validators, this.state.Password);
    if (id === "Code") {
      InputToUpperCase(e).then(e => {
        this.setState({ validators, [id]: e }, () => console.log(this.state));
      });
    } else
      this.setState({ validators, [id]: value }, () => console.log(this.state));
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    if (validateForm(this.state.validators) === true) {
      console.log("true");
      axios
        .get(`${UrlLib}/ForgotPassword/UpdateCredential`, {
          params: {
            id: this.state.id,
            cred: this.state.Password,
            code: this.state.Code
          }
        })
        .then(res => {
          console.log(res);
          this.setState({ submitted: true });
        })
        .catch(e => {
          console.log(e.response.data.Message);
          e.response
            ? this.setState({
                loading: false,
                showMessage: true,
                message: e.response.data.Message
              })
            : this.setState({
                loading: false,
                showMessage: true,
                message: "Please check your internet connection"
              });
        });
    } else {
      this.setState({
        loadding: false,
        showMessage: true,
        message:
          "Your attempt to submit an invalid form failed. Please check the form."
      });
    }
    setTimeout(() => {
      this.setState({
        loading: false,
        showMessage: false
      });
    }, 3000);
  };
  render() {
    const { validators, email, loading, showMessage, submitted } = this.state;
    return (
      <div className='resetPassPage'>
        <CardContainer
          header=' Reset Password'
          description={`We have sent you a reset password code to ${email}. \n Kindly enter the code into the field below to set your new password`}
        >
          {showMessage ? (
            <MessageLabel
              color='orange'
              icon='cancel'
              message={this.state.message}
            />
          ) : null}
          {submitted ? null : (
            <Form>
              <Formfield
                id='Code'
                label='Reset Code'
                placeholder='Enter reset code'
                icon='barcode'
                iconposition='left'
                getChange={this.handleChange}
                error={validators.Code}
              />
              <Formfield
                id='Password'
                label='New password'
                placeholder='Enter new password'
                icon='low vision'
                iconposition='left'
                type='password'
                getChange={this.handleChange}
                error={validators.Password}
              />
              <Formfield
                id='ConfirmPassword'
                placeholder='Confirm Password'
                icon='low vision'
                iconposition='left'
                type='password'
                getChange={this.handleChange}
                error={validators.ConfirmPassword}
              />
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                  content='Submit'
                  color='violet'
                  onClick={this.handleSubmit}
                  loading={loading}
                />
              </div>
            </Form>
          )}
          {submitted ? (
            <CompletedMessage
              handlepush={this.handlepush}
              message='changed your password'
            />
          ) : (
            false
          )}
        </CardContainer>
      </div>
    );
  }
  handlepush = () => {
    console.log("i just clicked ");
    this.props.history.push("/");
  };
}

export default ResetPassword;
