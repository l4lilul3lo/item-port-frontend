import { useState } from "react";
import validator from "validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRegistration } from "../../hooks/useRegistration";
import logo from "../../images/logo.png";
import "./register.css";

const Register = () => {
  const registration = useRegistration();

  const [inputs, setInputs] = useState({
    username: {
      value: "",
      isValid: true,
      message: "",
    },
    email: {
      value: "",
      isValid: true,
      message: "",
    },
    password: {
      value: "",
      isValid: true,
      message: "",
    },
    password2: {
      value: "",
      isValid: true,
      message: "",
    },
  });

  const invalidate = (inputName, message) => {
    console.log(inputs["username"].value);
    setInputs({
      ...inputs,
      [inputName]: {
        value: inputs[inputName].value,
        isValid: false,
        message: message,
      },
    });
  };

  const validate = {
    username: () => validateUserName(),
    email: () => validateEmail(),
    password: () => validatePassword(),
    password2: () => validatePassword2(),
  };

  const validateUserName = async () => {
    const username = inputs.username.value;
    const isValid = inputs.username.isValid;
    const inputName = "username";

    if (username.length < 3 || username.length > 15) {
      const message = "Username must be between 3 and 15 characters";
      invalidate(inputName, message);
      return;
    }

    if (!username[0].match(/[a-z]/i)) {
      const message = "Username must start with a letter";
      invalidate(inputName, message);
      return;
    }

    if (username.match(/[^a-zA-Z0-9_]/)) {
      const message =
        "Username can only contain letters, numbers, and underscores";
      invalidate(inputName, message);
      return;
    }

    if (username && isValid) {
      const message = await registration.checkUserNameExists(username);
      if (message !== "Available") {
        invalidate(inputName, message);
      }
    }
  };

  const validateEmail = async () => {
    const email = inputs.email.value;
    const isValid = inputs.email.isValid;
    const inputName = "email";

    if (!validator.isEmail(email)) {
      const message = "Please enter a valid email address";
      invalidate(inputName, message);
      return;
    }

    if (email && isValid) {
      const message = await registration.checkEmailExists(email);
      if (message !== "Available") {
        invalidate(inputName, message);
      }
    }
  };
  // // lets think state

  const validatePassword = () => {
    const password = inputs.password.value;
    console.log(password);
    if (password.length < 6) {
      setInputs({
        ...inputs,
        password: {
          isValid: false,
          message: "Password must be at least 6 characters in length",
          value: password,
        },
      });
    }
  };

  const validatePassword2 = () => {
    const password = inputs.password.value;
    const password2 = inputs.password2.value;
    console.log(password);
    console.log(password2);
    if (password !== password2) {
      setInputs({
        ...inputs,
        password2: {
          isValid: false,
          message: "Passwords do not match",
        },
      });
    }
  };

  const isAllValid = () => {
    for (let key in inputs) {
      let { value, isValid } = inputs[key];

      if (!value || !isValid) {
        return false;
      }
    }
    return true;
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid: true, message: "" },
    });
  };

  // When the user navigates away from input, check for validation.
  const handleBlur = (e) => {
    if (e.target.value) {
      validate[e.target.name]();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAllValid()) {
      return;
    }
    const username = inputs.username.value;
    const email = inputs.email.value;
    const password = inputs.password.value;
    const body = { username, email, password };

    try {
      registration.register(username, email, password);
    } catch (error) {}
  };

  return (
    <div id="register-container">
      <img src={logo} />
      <form id="register-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={
              inputs.username.isValid ? "input valid" : "input invalid"
            }
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          ></input>
        </div>
        <div className="message">{inputs.username.message}</div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={inputs.email.isValid ? "input valid" : "input invalid"}
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          ></input>
          <div className="message">{inputs.email.message}</div>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={
              inputs.password.isValid ? "input valid" : "input invalid"
            }
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          ></input>

          <div className="message">{inputs.password.message}</div>

          <PasswordStrengthBar
            scoreWordStyle={{ fontSize: "17px" }}
            barColors={["#999999", "#ef4836", "#f6b44d", "#2b90ef", "#25c281"]}
            minLength={6}
            password={inputs.password.value}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            className={
              inputs.password2.isValid ? "input valid" : "input invalid"
            }
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          ></input>
          <div className="message">{inputs.password2.message}</div>
        </div>

        <button type="submit" id="registerbtn">
          Register
        </button>
      </form>
    </div>
  );
};

// if input passes validation, begin delayed database queries.

// focusing on react-redux and

export default Register;
