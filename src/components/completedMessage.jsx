import React from "react";
import { Card, Button } from "semantic-ui-react";

const CompletedMessage = ({ handlepush, message, btnMsg }) => {
  return (
    <Card fluid style={{ textAlign: "center" }}>
      <Card.Content>
        <Card.Description>
          <b>{`Congratulations you have successfully ${message}`}.</b>
        </Card.Description>
        <div style={{ padding: "10px" }}>
          <Button
            onClick={handlepush}
            content={`Proceed ${btnMsg}`}
            icon='checkmark'
            color='green'
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default CompletedMessage;
