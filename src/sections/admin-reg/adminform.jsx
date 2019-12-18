import React from "react";
import { Form, Button, Input } from "semantic-ui-react";
import Formfield from "../../components/input-field/input_field";

const AdminForm = ({ state, handleChange, handleSubmit, resolve }) => {
  console.log(state);
  return (
    <Form style={{ paddingTop: 20 }}>
      <Formfield
        id='FirstName'
        label='FirstName'
        icon='user'
        iconposition='left'
        placeholder='Enter first name'
        type='text'
        getChange={handleChange}
        error={state.FirstName}
      />
      <Formfield
        id='LastName'
        label='LastName'
        icon='user'
        iconposition='left'
        placeholder='Enter last name'
        type='text'
        getChange={handleChange}
        error={state.LastName}
      />
      <Formfield
        id='Email'
        label='Email'
        icon='at'
        iconposition='left'
        placeholder='Enter admin email address'
        type='email'
        getChange={handleChange}
        error={state.Email}
      />
      <Formfield
        id='Contact'
        label='Contact'
        icon='phone'
        iconposition='left'
        placeholder='Enter admin mobile number'
        type='number'
        getChange={handleChange}
        error={state.Contact}
      />
      <Formfield
        id='Username'
        label='Username'
        icon='user circle'
        iconposition='left'
        placeholder='Set admin username'
        type='text'
        getChange={handleChange}
        error={state.Username}
      />
      <Formfield
        id='Password'
        label='Password'
        icon='key'
        iconposition='left'
        placeholder='Set Admin Password'
        type='password'
        getChange={handleChange}
        error={state.Password}
      />
      <Formfield
        id='ConfirmPassword'
        icon='key'
        iconposition='left'
        placeholder='Confirm Password '
        type='password'
        getChange={handleChange}
        error={state.ConfirmPassword}
      />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          size='large'
          color='violet'
          onClick={handleSubmit}
          content='Register'
          loading={resolve}
        />
      </div>
    </Form>
  );
};

export default AdminForm;
