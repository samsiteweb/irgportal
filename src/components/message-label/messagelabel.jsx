import React from "react";
import { Label, Icon } from "semantic-ui-react";

const MessageLabel = ({ pointing, color, icon, message }) => {
  return (
    <div style={{ marginTop: "15px" }}>
      <Label style={{ display: "flex" }} pointing={pointing} color={color}>
        <Icon name={icon} size='large' />
        {message}
      </Label>
    </div>
  );
};
export default MessageLabel;
