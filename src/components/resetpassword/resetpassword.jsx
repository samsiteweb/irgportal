import React from "react";
import CardContainer from "../card-container/card_container";
import Formfield from "../input-field/input_field";
import { Form, Button } from "semantic-ui-react";

const ResetPassword = ({ getEmailAddress, handleSubmit, history }) => {
  return (
    <CardContainer
      header=' Reset Password'
      description={`We have sent you a reset password code to ${getEmailAddress}. \n Kindly enter the code into the field below to set your new password`}
    >
      <Form>
        <Formfield
          label='Reset Code'
          placeholder='Enter reset code'
          icon='barcode'
          iconposition='left'
        />
        <Formfield
          label='New password'
          placeholder='Enter new password'
          icon='low vision'
          iconposition='left'
        />
        <Formfield
          placeholder='Confirm Password'
          icon='low vision'
          iconposition='left'
        />
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          content='Submit'
          color='violet'
          onClick={() => history.push("/")}
        />
      </div>
    </CardContainer>
  );
};

export default ResetPassword;
