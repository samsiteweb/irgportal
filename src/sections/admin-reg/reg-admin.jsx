import React, { Component } from "react";
import CardContainer from "../../components/card-container/card_container";
import MessageLabel from "../../components/message-label/messagelabel";
import {
  Placeholder,
  Card,
  Grid,
  Input,
  Image,
  Button
} from "semantic-ui-react";

import validatorFunction, {
  validateForm,
  InputToUpperCase
} from "../../lib/validatorLib";
import axios from "axios";
import UrlLib from "../../lib/urlLib";
import AdminForm from "./adminform";
import CompletedMessage from "../../components/completedMessage";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountActions: {
        accountCode: "",
        codeValid: false,
        confirm: false
      },
      buttonActions: {
        resolved: false,
        loadContent: false,
        content: "Verify",
        disabled: false,
        icon: "key",
        color: "teal",
        confirmBtn: true,
        rejectBtn: true
      },
      validators: {
        FirstName: false,
        LastName: false,
        Email: false,
        Contact: false,
        Username: false,
        Password: false,
        ConfirmPassword: false
      },
      message: {
        show: false,
        messageText: "",
        messageColor: ""
      },
      data: false,
      dataToken: false,
      formSubmitted: false,
      formValid: false,
      loadSubmitBtn: false
    };
  }

  handleFormChange = e => {
    const { id, value } = e.target;
    let validators = this.state.validators;
    validatorFunction(id, value, validators, this.state.Password);
    this.setState({ validators, [id]: value }, () => {
      console.log(this.state, "my form state");
    });
  };
  handleSubmit = () => {
    this.setState(() => ({
      ...this.state,
      loadSubmitBtn: true
    }));
    if (validateForm(this.state.validators) === true) {
      const {
        FirstName,
        LastName,
        Email,
        Contact,
        Username,
        Password
      } = this.state;
      const { dataToken } = this.state;
      axios
        .post(
          `${UrlLib}/ContinueRegistration`,
          {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Contact: Contact,
            Username: Username,
            Password: Password
          },
          {
            headers: {
              Authorization: `Bearer ${dataToken.Token}`
            }
          }
        )
        .then(res => {
          console.log(res);
          this.setState(() => ({
            ...this.state,
            buttonActions: {
              ...this.state.buttonActions,
              loadContent: false
            },
            accountActions: {
              ...this.state.accountActions,
              confirm: false
            },
            formSubmitted: true,
            loadSubmitBtn: false
          }));
        })
        .catch(e => {
          this.setState({
            message: {
              show: true,
              color: "orange",
              messageText: e.response
                ? e.response.data.Message
                : "Please check internet connection"
            }
          });
          setTimeout(() => {
            this.setState(prevState => ({
              ...prevState,
              message: {
                show: false
              },
              loadSubmitBtn: false
            }));
          }, 3000);
        });
    } else {
      this.setState({
        message: {
          show: true,
          color: "orange",
          messageText:
            " Your attempt to submit an invalid form failed !!! Please complete the form properly"
        }
      });
      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          message: {
            show: false
          },
          loadSubmitBtn: false
        }));
      }, 3000);
    }
  };
  verifyAccountCode = () => {
    this.setState(() => ({
      ...this.state,
      buttonActions: {
        ...this.state.buttonActions,
        resolved: true,
        loadContent: true
      }
    }));
    axios
      .get(`${UrlLib}/ContinueRegistration`, {
        params: {
          code: this.state.accountActions.accountCode
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState(prev => ({
          data: res.data.Info,
          dataToken: res.data.Token,
          accountActions: {
            ...this.state.accountActions,
            codeValid: true
          },
          buttonActions: {
            ...prev.buttonActions,
            resolved: false,
            disabled: true,
            content: "valid",
            icon: "checkmark",
            color: "green",
            confirmBtn: false,
            rejectBtn: false
          }
        }));
      })
      .catch(err => {
        this.setState(prev => ({
          buttonActions: {
            ...prev.buttonActions,
            resolved: false,
            disableInput: false,
            color: "orange",
            icon: "cancel",
            content: "Try Again"
          },
          message: {
            show: true,
            color: "orange",
            messageText: err.response
              ? err.response.data.Message
              : "Please check internet connection"
          }
        }));
      });
  };
  confirmDetail = () => {
    this.setState(() => ({
      accountActions: {
        ...this.state.accountActions,
        confirm: true
      },
      buttonActions: {
        ...this.state.buttonActions,
        confirmBtn: true
      }
    }));
  };
  handleReject = () => {
    this.setState(() => ({
      accountActions: {
        ...this.state.accountActions,
        confirm: false
      },
      buttonActions: {
        ...this.state.buttonActions,
        // loadContent: false
        confirmBtn: true,
        rejectBtn: true,
        disabled: false,
        content: "Verify",
        icon: "key",
        color: "teal"
      },
      data: false
    }));
  };
  handleChange = e => {
    e.preventDefault();
    InputToUpperCase(e).then(value => {
      this.setState(
        () => ({
          accountActions: {
            ...this.state.accountActions,
            accountCode: value
          }
        }),
        () => {
          console.log(this.state);
        }
      );
    });
  };

  render() {
    const {
      loadSubmitBtn,
      message,
      data,
      formSubmitted,
      accountActions,
      buttonActions
    } = this.state;
    return (
      <CardContainer
        header='Admin Registration'
        description='Note: An admin have the ability to create other admin'
      >
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Input
            action={{
              color: buttonActions.color,
              labelPosition: "right",
              icon: buttonActions.icon,
              content: buttonActions.content,
              onClick: () => this.verifyAccountCode(),
              loading: buttonActions.resolved
            }}
            disabled={buttonActions.disabled}
            onChange={this.handleChange}
            placeholder='Enter Account Code'
            focus={!buttonActions.disabled}
          />
        </div>
        {buttonActions.loadContent ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <Card
              fluid
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                padding: "10px"
              }}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width='4'>
                    {data ? (
                      <Image
                        // floated='left'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                      />
                    ) : (
                      <Placeholder style={{ height: 80, width: 80 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                  </Grid.Column>
                  <Grid.Column width='12'>
                    {data ? (
                      <div>
                        <Card.Header>{data.AccountCode}</Card.Header>
                        <Card.Meta>
                          <span> {data.Email}</span>
                        </Card.Meta>
                      </div>
                    ) : (
                      <Placeholder>
                        <Placeholder.Line length='long' />
                        <Placeholder.Line length='very long' />
                      </Placeholder>
                    )}
                    <div style={{ paddingTop: "2px" }}>
                      <Button
                        content='Confirm'
                        disabled={buttonActions.confirmBtn ? true : false}
                        size='mini'
                        color='teal'
                        onClick={this.confirmDetail}
                      />
                      <Button
                        content='Reject'
                        disabled={buttonActions.rejectBtn ? true : false}
                        size='mini'
                        color='orange'
                        onClick={this.handleReject}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
          </div>
        ) : (
          false
        )}
        {message.show ? (
          <MessageLabel
            color={message.color}
            icon='cancel'
            message={message.messageText}
          />
        ) : null}

        {accountActions.confirm ? (
          <AdminForm
            state={this.state.validators}
            handleChange={this.handleFormChange}
            handleSubmit={this.handleSubmit}
            resolve={loadSubmitBtn}
          />
        ) : (
          false
        )}
        {formSubmitted ? (
          <CompletedMessage
            handlepush={this.handlepush}
            message='completed your registration'
          />
        ) : (
          false
        )}
      </CardContainer>
    );
  }

  handlepush = () => {
    console.log("i just clicked ");
    this.props.history.push("/");
  };
}

export default RegisterAdmin;
