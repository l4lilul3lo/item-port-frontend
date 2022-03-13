import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRegistration } from "../../hooks/useRegistration";
import { selectMessage } from "../../features/messageSlice";
import { useSelector } from "react-redux";
import "./register.css";
const Register = () => {
  const navigate = useNavigate();
  const registration = useRegistration();
  const message = useSelector(selectMessage);

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

  const validateUserName = () => {
    const username = inputs.username.value;
    const inputName = "username";
    if (username.length < 3 || username.length > 15) {
      const message = "Username must be between 3 and 15 characters";

      invalidate(inputName, message);
      // setInputs({
      //   ...inputs,
      //   username: {
      //     isValid: false,
      //     message: "Username must be between 3 and 15 characters",
      //   },
      // });
      return;
    }

    if (!username[0].match(/[a-z]/i)) {
      const message = "Username must start with a letter";
      invalidate(inputName, message);
    }

    if (username.match(/[^a-zA-Z0-9_]/)) {
      setInputs({
        ...inputs,
        username: {
          isValid: false,
          message:
            "Username can only contain letters, numbers, and underscores",
        },
      });
    }
  };

  const validateEmail = () => {
    const email = inputs.email.value;
    if (!validator.isEmail(email)) {
      setInputs({
        ...inputs,
        email: {
          isValid: false,
          message: "Please enter a valid email address",
        },
      });
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

  const checkValidation = () => {
    console.log(inputs);
    for (let key in inputs) {
      let { value, isValid } = inputs[key];

      if (!value || !isValid) {
        return false;
      }
    }
    return true;
  };

  const { username, email, password } = inputs;

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
    if (inputs.username.isValid && inputs.username.value) {
      registration.checkUserNameExists(inputs.username.value);
    }

    if (inputs.email.isValid && inputs.email.value) {
      registration.checkEmailExists(inputs.email.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkValidation()) {
      return;
    }
    const body = { username, email, password };

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.message === "register success") {
        console.log(parseRes);
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div id="register-container">
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
        <div className="message">
          {inputs.username.message}
          {message}
        </div>
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
