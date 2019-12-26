export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validatorFunction = (id, value, validators, password) => {
  switch (id) {
    case "Name":
      validators.Name =
        value.length < 5
          ? {
              content:
                "Organization name cannot be less than 5 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "Credentials":
      validators.Credentials =
        value.length < 1
          ? {
              content: "characters cannot be less than 5sam !",
              pointing: "below"
            }
          : null;
      break;
    case "FirstName":
      validators.FirstName =
        value.length < 1
          ? {
              content: "Firstname cannot be less than 5 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "LastName":
      validators.LastName =
        value.length < 5
          ? {
              content: "Lastname cannot be less than 5 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "Email":
      validators.Email = validEmailRegex.test(value)
        ? null
        : {
            content: "Email is not valid",
            pointing: "below"
          };
      break;
    case "Contact":
      validators.Contact =
        value.length < 7
          ? {
              content: "Contact cannot be less than 7 digits !",
              pointing: "below"
            }
          : null;
      break;
    case "Username":
      validators.Username =
        value.length < 1
          ? {
              content: "Username cannot be less than 8 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "Address":
      validators.Address =
        value.length < 10
          ? {
              content: "Address must not be less than 10 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "Country":
      validators.Country =
        value.length < 2
          ? {
              content: "Country of Origin cannot be empty !",
              pointing: "below"
            }
          : null;
      break;
    case "Code":
      validators.Code =
        value.length < 5
          ? {
              content: "Please enter the correct verification code !",
              pointing: "below"
            }
          : null;
      break;
    case "Password":
      validators.Password =
        value.length < 8
          ? {
              content: "Password must be at least 8 characters long !",
              pointing: "below"
            }
          : null;
      break;
    case "ConfirmPassword":
      validators.ConfirmPassword =
        password !== value
          ? {
              content: "Password did not match !",
              pointing: "below"
            }
          : null;
      break;

    default:
      break;
  }
  return validators;
};

export const InputToUpperCase = e => {
  return new Promise(resolve => {
    let Start = e.target.selectionStart;
    let End = e.target.selectionEnd;
    let value = (e.target.value = e.target.value.toUpperCase());
    e.target.setSelectionRange(Start, End);
    resolve(value);
  });
};

export const validateForm = validators => {
  let valid = true;
  // console.log(Object.values(validators), "list the objects");
  Object.values(validators).forEach(validator => {
    console.log(validator);
    if (validator !== null) {
      console.log("i have a false validator");
      valid = false;
    }
  });
  return valid;
};

export default validatorFunction;
