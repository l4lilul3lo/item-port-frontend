import { useState } from "react";
import validator from "validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRegistration } from "../hooks/useRegistration";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const registration = useRegistration();
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate("/");
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
    <Container className="h-100 d-flex  align-items-center justify-content-center ">
      <Form className="text-center w-50" onSubmit={handleSubmit}>
        <div id="name-logo">
          <h3>Item</h3>
          <i
            className="bi bi-phone-flip"
            style={{
              fontSize: 100,
              color: "blue",
              "margin-left": "10px",
              "margin-right": "10px",
            }}
          />
          <h3>Port</h3>
        </div>
        <h3>Register</h3>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <Form.Text className="text-muted">
            {inputs.username.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <Form.Text className="text-muted">{inputs.email.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <Form.Text className="text-muted">
            {inputs.password.message}
          </Form.Text>
          <PasswordStrengthBar
            style={{ "margin-top": "30px" }}
            scoreWordStyle={{ fontSize: "17px" }}
            barColors={["#999999", "#ef4836", "#f6b44d", "#2b90ef", "#25c281"]}
            minLength={6}
            password={inputs.password.value}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Enter password"
            onChange={(e) => onChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <Form.Text className="text-muted">
            {inputs.password2.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="secondary" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

// if input passes validation, begin delayed database queries.

// focusing on react-redux and

export default Register;
