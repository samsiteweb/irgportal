import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Formfield from "../../components/input-field/input_field";
import CardContainer from "../../components/card-container/card_container";

export const DecisionBtn = ({ firstChoice, secondChoice, size, push }) => {
  return (
    <Button.Group style={{ paddingTop: 20 }} size={size}>
      <Button onClick={() => push("./register")}>{firstChoice}</Button>
      <Button.Or />
      <Button onClick={() => push("updateAccount")}> {secondChoice} </Button>
    </Button.Group>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardContainer
        header='iRegisterKids Portal Login'
        description='Please Enter your Credentials to Login'
      >
        <Form style={{ paddingTop: 20 }}>
          <Formfield
            label='Credentials'
            icon='user'
            iconposition='left'
            placeholder='Please enter credentials'
            type='text'
          />
          <Formfield
            label='Password'
            icon='key'
            iconposition='left'
            placeholder='Enter Password'
            type='text'
          />
        </Form>
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          <Button
            loading={false}
            size='huge'
            fluid
            color='violet'
            content='Login'
          />

          <DecisionBtn
            firstChoice='Create Account'
            secondChoice='Update Account'
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
    );
  }
}

export default Login;
