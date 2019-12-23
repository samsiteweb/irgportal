import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Formfield from "../../components/input-field/input_field";
import CardContainer from "../../components/card-container/card_container";
import validatorFunction from "../../lib/validatorLib";
import axios from "axios";
import UrlLib from "../../lib/urlLib";
import "./login-section.component.css";
import MessageLabel from "../../components/message-label/messagelabel";

export const DecisionBtn = ({ firstChoice, secondChoice, size, push }) => {
  return (
    <Button.Group style={{ paddingTop: 20 }} size={size}>
      <Button onClick={() => push("/register")}>{firstChoice}</Button>
      <Button.Or />
      <Button onClick={() => push("/adminReg")}> {secondChoice} </Button>
    </Button.Group>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Credentials: "",
      Password: "",
      validators: {
        Credentials: false,
        Password: false
      },
      message: {
        show: false,
        message: ""
      }
    };
  }

  handleChange = e => {
    const { id, value } = e.target;
    // let validators = this.state.validators;
    // validatorFunction(id, value, validators);

    this.setState({ [id]: value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = () => {
    this.setState({
      loading: true
    });
    const { Credentials, Password } = this.state;
    axios
      .post(`${UrlLib}/Authenticate`, {
        Credentials: Credentials,
        Password: Password
      })
      .then(res => {
        console.log(res);
        this.setState({
          loading: false
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
          message: {
            show: true,
            message: e.response
              ? e.response.data.Message
              : "Please Check your Internet Connection"
          }
        });
        setTimeout(() => {
          this.setState({
            message: {
              show: false
            }
          });
        }, 3000);
      });
  };

  render() {
    const { validators, loading, message } = this.state;
    return (
      <div className='loginPage'>
        <CardContainer
          header='iRegisterKids Portal Login'
          description='Please Enter your Credentials to Login'
        >
          {message.show ? (
            <MessageLabel
              icon='cancel'
              color='orange'
              message={message.message}
            />
          ) : null}
          <Form style={{ paddingTop: 20 }}>
            <Formfield
              id='Credentials'
              label='Credentials'
              icon='user'
              iconposition='left'
              placeholder='Please enter credentials'
              type='text'
              getChange={this.handleChange}
              error={validators.Credentials}
            />
            <Formfield
              id='Password'
              label='Password'
              icon='key'
              iconposition='left'
              placeholder='Please enter Password'
              type='text'
              getChange={this.handleChange}
              error={validators.Password}
            />
          </Form>

          <div style={{ paddingTop: 20, textAlign: "center" }}>
            <Button
              size='huge'
              fluid
              color='violet'
              content='Login'
              onClick={this.handleSubmit}
              loading={loading}
            />

            <DecisionBtn
              firstChoice='Create Account'
              secondChoice='Create Admin'
              size='small'
              push={this.props.history.push}
            />

            <div style={{ paddingTop: 10 }}>
              <Button
                size='mini'
                content='Forgot password?'
                onClick={() => this.props.history.push("/forgotPass")}
              />
            </div>
          </div>
        </CardContainer>
      </div>
    );
  }
}

export default Login;
