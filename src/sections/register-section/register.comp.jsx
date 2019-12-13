import React, { Component } from "react";
import CardContainer from "../../components/card-container/card_container";

import { Form, Button, Icon, Label } from "semantic-ui-react";
import Formfield, {
  ActionInput
} from "../../components/input-field/input_field";
import axios from "axios";
import MessageLabel from "../../components/message-label/messagelabel";

const options = [
  { key: "all", text: "Custom Code", value: "custom" },
  { key: "products", text: "Get Code", value: "get" }
];
const formField = [
  {
    id: "name",
    label: "Name",
    icon: "users",
    iconposition: "left",
    placeholder: "organization Name",
    type: "text"
  },
  {
    id: "Email",
    label: "Email",
    icon: "at",
    iconposition: "left",
    placeholder: "Organization Email ",
    type: "email"
  },
  {
    id: "Contact",
    label: "Contact",
    icon: "phone",
    iconposition: "left",
    placeholder: "Organization Mobile Contact",
    type: "email"
  },
  {
    id: "Address",
    label: "Address",
    icon: "map marker alternate",
    iconposition: "left",
    placeholder: "Organisations address",
    type: "email"
  },
  {
    id: "Country",
    label: "Country",
    icon: "map marker alternate",
    iconposition: "left",
    placeholder: "Organisation country of residence",
    type: "email"
  }
];

const url = "https://iregisterkids.com/prod_sup/api/NewRegistration";
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getAccountCode = this.getAccountCode.bind(this);
    this.customAccountCode = this.customAccountCode.bind(this);
    this.confirmAccountCode = this.confirmAccountCode.bind(this);
    console.log(props);

    this.state = {
      actionActive: false,
      action: this.getAccountCode,
      actionText: "Generate",
      result: "",
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
  handleChange(e) {
    console.log(e.target.id);
    let name = e.target.id;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  }
  handleSelect = e => {
    console.log(e.target.textContent);
    if (e.target.textContent === "Get Code") {
      this.setState({
        action: this.getAccountCode,
        actionText: "Generate"
      });
    } else if (e.target.textContent === "Custom Code") {
      this.setState({
        action: this.customAccountCode,
        actionText: "Verify"
      });
    }
  };
  // async customAccountCode() {
  //   this.setState({
  //     actionActive: true,
  //     messageState: (
  //       <MessageLabel
  //         pointing='below'
  //         color='olive'
  //         icon='mail'
  //         message='Checking Your Account Code'
  //       />
  //     )
  //   });

  //   await axios
  //     .get(url, {
  //       params: {
  //         code: this.state.customCode
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => console.log(error));
  // }

  async confirmAccountCode() {
    await axios
      .get(url, {
        params: {
          code: this.state.Code,
          id: this.state.result
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          messageState: (
            <MessageLabel
              pointing='below'
              color='green'
              icon='mail'
              message={`Thank you very much the code is valid. Please keep this code SECURELY`}
            />
          )
        });
      })
      .catch(e => {
        this.setState({
          messageState: (
            <MessageLabel
              pointing='below'
              color='green'
              icon='mail'
              message={`Wrong Code was passed. Please check your email for the right code`}
            />
          )
        });
      });
  }
  async customAccountCode() {
    await axios
      .get(url, {
        params: {
          code: this.state.Code
        }
      })
      .then(response => console.log(response.data));
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
          actionText: "Confirm Code"
        });
      })
      .catch(error => {
        this.setState({
          actionActive: !this.state.actionActive,
          messageState: (
            <MessageLabel
              pointing='below'
              color='red'
              icon='mail'
              message={`${error}`}
            />
          )
        });
      });
  }

  render() {
    return (
      <div>
        <CardContainer
          header='Registration Form '
          description='Please enter correct details of Organization'
        >
          <Form style={{ paddingTop: 20 }}>
            {formField.map(
              ({ id, label, icon, iconposition, placeholder, type, key }) => {
                return (
                  <Formfield
                    key={id}
                    id={id}
                    label={label}
                    icon={icon}
                    iconposition={iconposition}
                    placeholder={placeholder}
                    type={type}
                    getChange={this.handleChange}
                  />
                );
              }
            )}
            {this.state.messageState}

            <ActionInput
              options={options}
              defaultValue='get'
              color='violet'
              state={this.state.actionActive}
              placeholder='xxxx'
              getChange={this.handleChange}
              getSelect={this.handleSelect}
              action={this.state.action}
              textContent={this.state.actionText}
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
              onClick={this.confirmAccountCode}
              content='submit'
            />
          </div>
        </CardContainer>
      </div>
    );
  }
}

export default Register;
