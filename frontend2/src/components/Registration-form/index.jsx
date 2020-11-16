import React from "react";
import { validator } from "../../utils/validator";
import register from "../../utils/register";
import Button from "../button/index.jsx";
import Input from "../input/index.jsx";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        valid: null
      }
    };
  }

  handleRegistration = event => {
    event.preventDefault();
    event.stopPropagation();
    const hasValidParams = this.state.email.valid;
    if (!hasValidParams) {
      console.error("Invalid Parameters");
      return;
    }
    const email = this.state.email.value;
    console.log(email);
    register(email)
      .then(console.log)
      .catch(console.error);
  };

  handleInputChange = (name, event) => {
    const value = event.target.value;
    const valid = validator[name](value);
    this.setState({
      [name]: { value, valid }
    });
  };
  render() {
    return (
      <form onSubmit={this.handleRegistration}>
        <Input
          lable="Email"
          type="email"
          name="email"
          value={this.state.email.value}
          valid={this.state.email.valid}
          onChange={this.handleInputChange}
        />
        <Button title="Validate" disabled={!this.state.email.valid} />
      </form>
    );
  }
}

export default RegistrationForm;
