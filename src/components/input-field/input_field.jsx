import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";

const Formfield = ({
  label,
  icon,
  iconposition,
  placeholder,
  type,
  id,
  getChange,
  getBlurChange,
  error
}) => {
  return (
    <Form.Field
      control={Input}
      id={id}
      icon={icon}
      label={{ icon: "asterisk" }}
      labelPosition='right corner'
      iconPosition={iconposition}
      onChange={getChange}
      onBlur={getBlurChange}
      placeholder={placeholder}
      type={type}
      error={error}
    />
  );
};
export const ActionInput = React.forwardRef(
  (
    {
      options,
      state,
      color,
      defaultValue,
      placeholder,
      action,
      getChange,
      getSelect,
      textContent,
      disabled
    },
    ref
  ) => (
    <Form.Field style={{ marginTop: "10px" }}>
      <Input type='text' placeholder={placeholder}>
        <input onChange={getChange} id='Code' disabled={disabled} ref={ref} />
        <Select
          compact
          options={options}
          onChange={getSelect}
          defaultValue={defaultValue}
        />
        <Button color={color} loading={state} onClick={action}>
          {textContent}
        </Button>
      </Input>
    </Form.Field>
  )
);

export default Formfield;
