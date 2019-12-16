import React, { Component, createRef } from "react";
import CardContainer from "../../components/card-container/card_container";

import { Form, Button, Icon } from "semantic-ui-react";
import Formfield, {
  ActionInput
} from "../../components/input-field/input_field";
import axios from "axios";
import MessageLabel from "../../components/message-label/messagelabel";
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const options = [
  { key: "all", text: "Custom Code", value: "custom" },
  { key: "products", text: "Get Code", value: "get" }
];

const url = "https://iregisterkids.com/prod_sup/api/NewRegistration";
class Register extends Component {
  inputRef = createRef();
  constructor() {
    super();
    this.getAccountCode = this.getAccountCode.bind(this);
    this.customAccountCode = this.customAccountCode.bind(this);
    this.confirmAccountCode = this.confirmAccountCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      actionActive: false,
      disableAll: false,
      disableBox: false,
      action: this.getAccountCode,
      actionText: "Generate",
      result: "",
      validators: {
        Name: false,
        Email: false,
        Contact: false,
        Address: false,
        Country: false
      },
      formvalid: "",
      messageState: (
        <MessageLabel
          pointing='below'
          color='teal'
          icon='mail'
          message='You can customize your account code by choosing Custom Code from the
        dropdown buttton below.'
        />
      )
    };
  }

  handleChange = e => {
    const { id, value } = e.target;

    let validators = this.state.validators;
    switch (id) {
      case "Name":
        validators.Name =
          value.length < 5
            ? {
                content:
                  "Organization name cannot be less than 5 characters long !",
                pointing: "below"
              }
            : null;
        break;
      case "Email":
        validators.Email = validEmailRegex.test(value)
          ? null
          : {
              content: "Email is not valid",
              pointing: "below"
            };
        break;
      case "Contact":
        validators.Contact =
          value.length < 7
            ? {
                content: "Organization contact cannot be less than 7 digits !",
                pointing: "below"
              }
            : null;
        break;
      case "Address":
        validators.Address =
          value.length < 10
            ? {
                content: "Address must not be less than 10 characters long !",
                pointing: "below"
              }
            : null;
        break;
      case "Country":
        validators.Country =
          value.length < 2
            ? {
                content: "Country of Origin cannot be empty !",
                pointing: "below"
              }
            : null;
        break;
      case "Code":
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(start, end);
        break;

      default:
        break;
    }
    this.setState({ validators, [id]: value }, () => {
      console.log(this.state, "this is my state");
    });
  };

  handleSelect = e => {
    if (e.target.textContent === "Get Code") {
      this.setState({
        action: this.getAccountCode,
        actionText: "Generate",
        disableBox: false
      });
    } else if (e.target.textContent === "Custom Code") {
      this.setState({
        action: this.customAccountCode,
        actionText: "Verify",
        disableBox: true
      });
    }
    console.log(this.state);
  };
  async confirmAccountCode() {
    const id = this.state.result;
    const code = this.state.Code;
    await axios
      .put(`${url}?code=${code}&id=${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          actionActive: true,
          disableBox: false,
          disableAll: true,
          messageState: (
            <MessageLabel
              color='green'
              icon='mail'
              message={`Thank you very much the code is valid. Please keep this code SECURELY`}
            />
          )
        });
      })
      .catch(e => {
        this.setState({
          actionActive: true,
          messageState: (
            <MessageLabel
              pointing='below'
              color='green'
              icon='mail'
              message={
                e.response
                  ? `${e.response.data.Message}`
                  : "Please check your internet connection"
              }
            />
          )
        });
      });
    this.setState({
      actionActive: false
    });
  }
  async customAccountCode() {
    await axios
      .get(url, {
        params: {
          code: this.state.Code
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          disableBox: false,
          disableAll: true,
          messageState: (
            <MessageLabel
              color='green'
              icon='mail'
              message={`Account Code is Available. Please keep this code SECURELY for further use `}
            />
          )
        });
      })
      .catch(e => {
        this.setState({
          messageState: (
            <MessageLabel
              pointing='below'
              color='red'
              icon='mail'
              message={
                e.response
                  ? `${e.response.data.Message}`
                  : "Please check your internet connection"
              }
            />
          )
        });
      });
  }

  async getAccountCode() {
    this.setState({
      actionActive: true,
      messageState: (
        <MessageLabel
          pointing='below'
          color='olive'
          icon='mail'
          message='Please Wait for account code'
        />
      )
    });
    await axios
      .get(url, {
        params: {
          email: this.state.Email,
          sms: this.state.Contact,
          expires: "2"
        }
      })
      .then(response => {
        console.log(response.data.Result);
        this.setState({
          actionActive: !this.state.actionActive,
          messageState: (
            <MessageLabel
              pointing='below'
              color='green'
              icon='mail'
              message={`Please check ${this.state.Email} for your account code. Please insert the code in the box below`}
            />
          ),
          result: response.data.Result,
          action: this.confirmAccountCode,
          actionText: "Confirm Code",
          disableBox: true
        });
        this.inputRef.current.focus();
      })
      .catch(e => {
        this.setState({
          actionActive: !this.state.actionActive,
          messageState: (
            <MessageLabel
              pointing='below'
              color='red'
              icon='mail'
              message={
                e.response
                  ? `${e.response.data.Message}`
                  : "Please check your internet connection"
              }
            />
          )
        });
      });
  }

  validateForm = validators => {
    let valid = true;

    Object.values(validators).forEach(validator => {
      validator === null ? (valid = true) : (valid = false);
    });
    return valid;
  };
  handleSubmit() {
    if (this.validateForm(this.state.validators) && this.state.disableAll) {
      console.log("form is valid"); // await axios
      //   .post(url, {
      //     AccountCode: this.state.Code,
      //     Name: this.state.Name,
      //     Email: this.state.Email,
      //     Contact: this.state.Contact,
      //     Address: this.state.Address,
      //     Country: this.state.Country
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(e => console.log(e));
    } else {
      console.log("invalid form submitted");
    }
  }
  render() {
    const { Name, Email, Contact, Address, Country } = this.state.validators;
    return (
      <div>
        <CardContainer
          header='Registration Form '
          description='Please enter correct details of Organization'
        >
          <Form style={{ paddingTop: 20 }}>
            <Formfield
              id={"Name"}
              label='Name'
              icon='users'
              iconposition='left'
              placeholder='organization Name'
              type='text'
              getChange={this.handleChange}
              error={Name}
            />
            <Formfield
              id='Email'
              label='Email'
              icon='at'
              iconposition='left'
              placeholder='Organization Email'
              type='email'
              getChange={this.handleChange}
              error={Email}
            />
            <Formfield
              id='Contact'
              label='Contact'
              icon='phone'
              iconposition='left'
              placeholder='Organization Mobile Contact'
              type='number'
              getChange={this.handleChange}
              error={Contact}
            />
            <Formfield
              id='Address'
              label='Address'
              icon='map signs'
              iconposition='left'
              placeholder='Organisations address'
              type='text'
              getChange={this.handleChange}
              error={Address}
            />
            <Formfield
              id='Country'
              label='Country'
              icon='map'
              iconposition='left'
              placeholder='Organisation country of residence'
              type='email'
              getChange={this.handleChange}
              error={Country}
            />

            {this.state.messageState}

            <ActionInput
              options={options}
              defaultValue='get'
              color='violet'
              state={this.state.actionActive}
              placeholder='xxxx'
              disabled={this.state.disableBox}
              getChange={this.handleChange}
              getSelect={this.handleSelect}
              action={this.state.action}
              textContent={this.state.actionText}
              ref={this.inputRef}
              disableAll={this.state.disableAll}
            />
            <div style={{ textAlign: "left" }}>
              <Icon name='image outline' size='massive' color='grey' />
              <Button size='mini' content='Upload Logo' />
            </div>
          </Form>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              size='large'
              color='violet'
              onClick={this.handleSubmit}
              content='Submit'
            />
          </div>
        </CardContainer>
      </div>
    );
  }
}

export default Register;
