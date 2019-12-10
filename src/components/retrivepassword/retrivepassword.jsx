import React from "react";
import CardContainer from "../../components/card-container/card_container";
import Formfield from "../../components/input-field/input_field";
import { Form, Button } from "semantic-ui-react";

const RetrivePassword = ({ handlesend }) => {
  return (
    <CardContainer
      header='Retrieve Password'
      description={`Don't worry. Resetting your password is easy, just tell us the email address or mobile contact you registered with iRegisterkids.`}
    >
      <Form style={{ marginTop: "10px" }}>
        <Formfield
          label='Registered Email Address'
          icon='at'
          iconposition='left'
        />
      </Form>
      <div style={{ marginTop: "10px" }}>
        <Button
          size='huge'
          color='violet'
          content='Send'
          onClick={handlesend}
        />
      </div>
    </CardContainer>
  );
};
export default RetrivePassword;
