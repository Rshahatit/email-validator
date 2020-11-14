import React from "react";
import "./App.css";

const validator = {
  email: email => /\S+@\S+\.\S+/.test(email)
};

function getIndicatorColor(state) {
  if (state.valid === null || state.value.length === 0) {
    return "transparent";
  }
  return state.valid ? "green" : "red";
}

class Input extends React.Component {
  constructor() {
    super();
    this.state = { valid: null };
  }
  validate = event => {
    const value = event.target.value;
    const valid = validator[this.props.type](value);
    this.setState({ value, valid });
  };
  render() {
    return (
      <label>
        {this.props.label}
        <input onChange={this.validate} type={this.props.type} />
        <div
          className="indicator"
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: getIndicatorColor(this.state)
          }}
        ></div>
      </label>
    );
  }
}
function Button(props) {
  return <button>{props.title} </button>;
}

function register(email) {
  // send to validate on the server
  const payload = { email: email };
  const request = new Request("/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return fetch(request).then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      console.log(response.error);
    }
  });
}
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
  }

  handleRegistration = event => {
    event.preventDefault();
    event.stopPropagation();
    const hasValidParams = this.email.current.state.valid;
    if (!hasValidParams) {
      console.error("Invalid Parameters");
      return;
    }
    const email = this.email.current.state.value;
    console.log(email);
    register(email)
      .then(console.log)
      .catch(console.error);
  };
  render() {
    return (
      <form onSubmit={this.handleRegistration}>
        <Input lable="Email" type="email" ref={this.email} />
        <Button title="Validate" />
      </form>
    );
  }
}

export default RegistrationForm;
