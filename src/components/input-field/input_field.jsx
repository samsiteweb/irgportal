import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";

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
        label={{ icon: "asterisk" }}
        labelPosition='right corner'
        iconPosition={iconposition}
        onChange={getChange}
        placeholder={placeholder}
        type={type}
      />
    </Form.Field>
  );
};

export const ActionInput = ({
  options,
  state,
  color,
  defaultValue,
  placeholder,
  action
}) => {
  return (
    <Form.Field>
      <Input type='text' placeholder={placeholder} action>
        <input />
        <Select compact options={options} defaultValue={defaultValue} />
        <Button color={color} loading={state} onClick={action}>
          Generate
        </Button>
      </Input>
    </Form.Field>
  );
};

export default Formfield;
