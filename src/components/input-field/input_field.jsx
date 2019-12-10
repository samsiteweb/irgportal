import React from "react";
import { Form, Input } from "semantic-ui-react";

const Formfield = ({
  label,
  icon,
  iconposition,
  placeholder,
  type,
  id,
  getChange
}) => {
  return (
    <Form.Field>
      <label> {label} </label>
      <Input
        id={id}
        icon={icon}
        iconPosition={iconposition}
        onChange={getChange}
        placeholder={placeholder}
        type={type}
      />
    </Form.Field>
  );
};

export default Formfield;
