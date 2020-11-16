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

function Input(props) {
  return (
    <label>
      {props.label}
      <input
        type={props.type}
        value={props.value}
        onChange={event => props.onChange(props.name, event)}
      />
      <div
        className="indicator"
        style={{
          height: "20px",
          width: "20px",
          backgroundColor: getIndicatorColor(props)
        }}
      ></div>
    </label>
  );
}

// class Input extends React.Component {
//   constructor() {
//     super();
//     this.state = { valid: null };
//   }
//   validate = event => {
//     const value = event.target.value;
//     const valid = validator[this.props.type](value);
//     this.setState({ value, valid }, () => {
//       if (this.props.onChange) {
//         this.props.onChange();
//       }
//     });
//   };
//   render() {
//     return (
//       <label>
//         {this.props.label}
//         <input onChange={this.validate} type={this.props.type} />
//         <div
//           className="indicator"
//           style={{
//             height: "20px",
//             width: "20px",
//             backgroundColor: getIndicatorColor(this.state)
//           }}
//         ></div>
//       </label>
//     );
//   }
// }
function Button(props) {
  return <button disabled={props.disabled}>{props.title} </button>;
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
