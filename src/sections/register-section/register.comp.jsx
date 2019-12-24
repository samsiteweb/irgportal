import React, { Component, createRef } from "react";
import CardContainer from "../../components/card-container/card_container";
import { Form, Button } from "semantic-ui-react";
import Formfield, {
  ActionInput
} from "../../components/input-field/input_field";
import axios from "axios";
import MessageLabel from "../../components/message-label/messagelabel";
import validatorFunction, {
  validateForm,
  InputToUpperCase
} from "../../lib/validatorLib";
const options = [
  { key: "all", text: "Custom Code", value: "custom" },
  { key: "products", text: "Get Code", value: "get" }
];

const url = "https://iregisterkids.com/prod_sup/api/NewRegistration";
class Register extends Component {
  inputRef = createRef();
  constructor(props) {
    super(props);
    this.getAccountCode = this.getAccountCode.bind(this);
    this.customAccountCode = this.customAccountCode.bind(this);
    this.confirmAccountCode = this.confirmAccountCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      verityBtnLoader: false,
      subBtnLoader: false,
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
      msg: {
        show: false,
        msg: ""
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
    validatorFunction(id, value, validators);
    if (id === "Code") {
      InputToUpperCase(e).then(value => {
        this.setState({ validators, [id]: value }, () => {
          console.log(this.state, "this is my state");
        });
      });
    } else {
      this.setState({ validators, [id]: value }, () => {
        console.log(this.state, "this is my state");
      });
    }
    console.log(this.state);
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
    this.setState({
      verityBtnLoader: true
    });
    const id = this.state.result;
    const code = this.state.Code;
    await axios
      .put(`${url}?code=${code}&id=${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          verityBtnLoader: false,
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
        setTimeout(() => {
          this.setState({
            verityBtnLoader: false,
            messageState: (
              <MessageLabel
                pointing='below'
                color='teal'
                icon='mail'
                message='You can customize your account code by choosing Custom Code from the
              dropdown buttton below.'
              />
            )
          });
        }, 3000);
      });
    this.setState({
      actionActive: false
    });
  }
  async customAccountCode() {
    this.setState({
      verityBtnLoader: true
    });
    await axios
      .get(url, {
        params: {
          code: this.state.Code
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          verityBtnLoader: false,
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
        setTimeout(() => {
          this.setState({
            verityBtnLoader: false,
            messageState: (
              <MessageLabel
                pointing='below'
                color='teal'
                icon='mail'
                message='You can customize your account code by choosing Custom Code from the
              dropdown buttton below.'
              />
            )
          });
        }, 3000);
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
        setTimeout(() => {
          this.setState({
            messageState: (
              <MessageLabel
                pointing='below'
                color='teal'
                icon='mail'
                message='You can customize your account code by choosing Custom Code from the
              dropdown buttton below.'
              />
            )
          });
        }, 3000);
      });
  }

  handleSubmit() {
    this.setState({ subBtnLoader: true });

    if (validateForm(this.state.validators) === true && this.state.disableAll) {
      console.log("form is valid");
      axios
        .post(url, {
          AccountCode: this.state.Code,
          Name: this.state.Name,
          Email: this.state.Email,
          Contact: this.state.Contact,
          Address: this.state.Address,
          Country: this.state.Country
        })
        .then(res => {
          console.log(res);
          this.setState({ subBtnLoader: false });
          this.props.history.push("/imgUpload");
        })
        .catch(e => {
          this.setState({
            msg: {
              show: true,
              msg: e.response
                ? e.response.data.Message
                : "Please check your internet connection"
            }
          });
          setTimeout(() => {
            this.setState({
              subBtnLoader: false,
              msg: {
                show: false
              }
            });
          }, 3000);
        });
    } else {
      console.log("submitted failed");
      this.setState({
        msg: {
          show: true,
          msg:
            "Your attempt to submit an invalid form failed !!!. Please check the form for errors or empty fields"
        }
      });
      setTimeout(() => {
        this.setState({
          subBtnLoader: false,
          msg: {
            show: false
          }
        });
      }, 3000);
    }
  }

  render() {
    const { Name, Email, Contact, Address, Country } = this.state.validators;
    const { msg } = this.state;
    return (
      <CardContainer
        header='Registration Form '
        description='Please enter correct details of Organization'
      >
        {msg.show ? (
          <MessageLabel icon='cancel' color='orange' message={msg.msg} />
        ) : null}
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
            type='text'
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
          <div style={{ textAlign: "left" }}></div>
        </Form>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            size='large'
            color='violet'
            onClick={this.handleSubmit}
            content='Submit'
            loading={this.state.subBtnLoader}
          />
        </div>
      </CardContainer>
    );
  }
}

export default Register;
