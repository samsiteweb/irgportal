import React, { Component } from "react";
import CardContainer from "../../components/card-container/card_container";
import Formfield from "../../components/input-field/input_field";
import { Form, Button, Icon } from "semantic-ui-react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    console.log(props);

    this.state = {
      AccountCode: "",
      Name: "",
      Email: "",
      Contact: "",
      Address: "",
      Country: ""
    };
  }
  handleChange(e) {
    console.log(e.target.id);
    // this.setState({
    //   AccountCode: e.target.value
    // });
    // console.log(this.state.AccountCode);
  }
  render() {
    return (
      <div>
        <CardContainer
          header='Registration Form '
          description='Please enter correct details of Organization'
        >
          <Form style={{ paddingTop: 20 }}>
            <Formfield
              id='name'
              label='Name'
              icon='users'
              iconposition='left'
              placeholder='organization Name'
              type='text'
              getChange={this.handleChange}
            />
            <Formfield
              label='Email'
              icon='at'
              iconposition='left'
              placeholder='Organization Email '
              type='email'
              getChange={this.handleChange}
            />
            <Formfield
              label='Contact'
              icon='phone'
              iconposition='left'
              placeholder='Organization Mobile Contact'
              type='email'
            />
            <Formfield
              label='Address'
              icon='map marker alternate'
              iconposition='left'
              placeholder='Organisations address'
              type='email'
            />
            <Formfield
              label='Country'
              icon='map marker alternate'
              iconposition='left'
              placeholder='Organisation country of residence'
              type='email'
            />
            <div style={{ textAlign: "left" }}>
              <Icon name='image outline' size='massive' color='grey' />
              <Button size='mini' content='Upload Logo' />
            </div>
          </Form>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button size='large' color='violet' content='submit' />
          </div>
        </CardContainer>
      </div>
    );
  }
}

export default Register;
