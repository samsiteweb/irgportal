import React, { Component } from "react";
import CardContainer from "../../components/card-container/card_container";
import Formfield from "../../components/input-field/input_field";
import { Form, Button } from "semantic-ui-react";
import MessageLabel from "../../components/message-label/messagelabel";
import axios from "axios";
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: "",
      showMessage: false,
      emailValid: false,
      loading: false,
      errors: {}
    };
    this.retrivePassword = this.retrivePassword.bind(this);
  }

  async retrivePassword() {
    const url = "https://iregisterkids.com/prod_sup/api/ForgotPassword";
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    await axios
      .get(url, {
        params: {
          cred: this.state.email
        }
      })
      .then(res => {
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          showMessage: true,
          message: res.data.Message
        }));
        setTimeout(() => {
          this.setState(prevState => ({
            ...prevState,
            showMessage: false
          }));
        }, 3000);
      })
      .catch(e => {
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          showMessage: true,
          message: e.response
            ? e.response.data.Message
            : "Please Check your internet connection"
        }));
        setTimeout(() => {
          this.setState(prevState => ({
            ...prevState,
            showMessage: false
          }));
        }, 3000);
      });
  }
  handleSend = () => {
    if (this.state.emailValid) {
      this.retrivePassword();
    } else {
      this.handleBlurChange();
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value }, () => {
      console.log(this.state);
    });
    if (id === "email") {
      this.setState({ emailValid: validEmailRegex.test(value) });
    }
  };

  handleBlurChange = () => {
    let errors = this.state.errors;
    if (this.state.emailValid) {
      errors.email = false;
    } else {
      errors.email = {
        content: " Invalid email, Please check your input",
        pointing: "below"
      };
    }
    this.setState(prevState => ({
      ...prevState,
      errors
    }));
  };

  render() {
    const { email } = this.state.errors;
    return (
      <CardContainer
        header='Retrieve Password'
        description={`Don't worry. Resetting your password is easy, just tell us the email address or mobile contact you registered with iRegisterkids.`}
      >
        {this.state.showMessage ? (
          <MessageLabel
            icon='cancel'
            color='teal'
            message={`${this.state.message}`}
          />
        ) : null}

        <Form style={{ marginTop: "10px" }}>
          <Formfield
            label='Registered Email Address'
            icon='at'
            iconposition='left'
            getChange={this.handleChange}
            getBlurChange={this.handleBlurChange}
            id={"email"}
            error={email}
          />
        </Form>
        <div style={{ marginTop: "10px" }}>
          <Button
            size='large'
            color='violet'
            content='Send'
            onClick={this.handleSend}
            loading={this.state.loading}
          />
        </div>
      </CardContainer>
    );
  }
}

export default ForgotPassword;
