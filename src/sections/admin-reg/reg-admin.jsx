import React, { Component, Fragment } from "react";
import CardContainer from "../../components/card-container/card_container";
import {
  Placeholder,
  Card,
  Item,
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

class RegisterAdmin extends Component {
  constructor() {
    super();

    this.state = {
      accountActions: {
        accountCode: "",
        codeValid: false
      },
      buttonActions: {
        resolved: false,
        content: "Enter",
        disabled: false,
        icon: "key",
        color: "teal"
      },
      validators: {
        FirstName: false,
        LastName: false,
        Email: false,
        Contact: false,
        Username: false,
        Password: false
      },
      formValid: ""
    };
  }

  handleFormChange = e => {
    const { id, value } = e.target;
    let validators = this.state.validators;
    validatorFunction(id, value, validators);
    this.setState({ validators, [id]: value }, () => {
      console.log(this.state, "my form state");
    });
  };
  handleSubmit = () => {
    if (validateForm(this.state.validators)) console.log("form is valid");
    else console.log("form is invalid");
  };
  verifyAccountCode = () => {
    this.setState(() => ({
      ...this.state,
      buttonActions: {
        ...this.state.buttonActions,
        resolved: true
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
            color: "green"
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
          }
        }));
        console.log(err.response.data.Message);
      });
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
    const { accountActions, buttonActions } = this.state;
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
          />
        </div>
        {buttonActions.resolved ? (
          <Card>
            <Card.Content>
              {buttonActions.resolved ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <Image
                  floated='right'
                  size='mini'
                  src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
              )}
              {buttonActions.resolved ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='medium' />
                  </Placeholder.Header>
                </Placeholder>
              ) : accountActions.codeValid ? (
                <Fragment>
                  <Card.Header>Steve Sanders</Card.Header>
                  <Card.Meta>Friends of Elliot</Card.Meta>
                </Fragment>
              ) : null}
              {buttonActions.resolved ? (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='long' />
                    <Placeholder.Line length='long' />
                    <Placeholder.Line length='long' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : accountActions.codeValid ? (
                <Fragment>
                  <Card.Description>
                    Steve wants to add you to the group{" "}
                    <strong>best friends</strong>
                  </Card.Description>
                </Fragment>
              ) : null}
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Approve
                </Button>
                <Button basic color='red'>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
        ) : null}
        {/* {accountActions.codeValid ? (
          <Item.Group>
            <Item>
              <Item.Image
                size='small'
                src='https://react.semantic-ui.com/images/wireframe/image.png'
              />

              <Item.Content>
                <Item.Header as='a'>Header</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                  <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        ) : null} */}
        {/* {accountActions.codeValid ? (
          <AdminForm
            state={this.state.validators}
            handleChange={this.handleFormChange}
          />
        ) : null} */}
      </CardContainer>
    );
  }
}

export default RegisterAdmin;
