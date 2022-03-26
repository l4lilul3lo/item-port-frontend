import { useState, useEffect } from "react";
import validator from "validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRegistration } from "../hooks/useRegistration";
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const registration = useRegistration();
  const navigate = useNavigate();

  const initialInputsState = {
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
  };

  const [inputs, setInputs] = useState(initialInputsState);

  const [verifyMethod, setVerifyMethod] = useState("on-site");

  useEffect(() => {
    return () => setInputs(initialInputsState);
  }, []);

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

    let usernameTaken = await registration.checkUsernameExists(username);
    console.log(`istaken ${usernameTaken}`);
    if (usernameTaken) {
      invalidate(inputName, "Username taken");
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
  };
  // hi ^__^

  const validatePassword = () => {
    const password = inputs.password.value;
    const inputName = "password";
    console.log(password);
    if (password.length < 6) {
      const message = "Password must be at least 6 characters in length";
      invalidate(inputName, message);
    }
  };

  const validatePassword2 = () => {
    const password = inputs.password.value;
    const password2 = inputs.password2.value;
    const inputName = "password2";
    console.log(password);
    console.log(password2);
    if (password !== password2) {
      const message = "Passwords do not match";
      invalidate(inputName);
      invalidate(inputName, message);
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

  const handleRadioChange = (e) => {
    const id = e.target.id;
    console.log(id);
    if (id === "email-radio") {
      setVerifyMethod("email");
    }

    if (id === "site-radio") {
      setVerifyMethod("on-site");
    }
  };

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
    const body = {
      username: username,
      email: email,
      password: password,
      verifyMethod: verifyMethod,
    };
    console.log(`register body ${JSON.stringify(body)}`);

    try {
      registration.register(body);

      setInputs(initialInputsState);
      if (verifyMethod === "on-site") {
        document.querySelector("#email-icon").style.display = "flex";
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div id="email-icon-container">
        <div
          id="email-icon"
          onClick={() => {
            navigate("/email");
            toast.dismiss();
          }}
        >
          <h4> {"Verify your email address ->"}</h4>

          <i
            className="bi bi-envelope-exclamation"
            style={{ fontSize: 30, marginLeft: "5px" }}
          ></i>
        </div>
      </div>
      <Container className="h-100 d-flex  align-items-center justify-content-center ">
        <Form className="text-center w-50" onSubmit={handleSubmit}>
          <div id="name-logo">
            <h3>Item</h3>
            <i
              className="bi bi-phone-flip"
              style={{
                fontSize: 100,
                color: "blue",
                marginLeft: "10px",
                marginRight: "10px",
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
              value={inputs.username.value}
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
              value={inputs.email.value}
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
              value={inputs.password.value}
              placeholder="Enter password"
              onChange={(e) => onChange(e)}
              onBlur={(e) => handleBlur(e)}
            />
            <Form.Text className="text-muted">
              {inputs.password.message}
            </Form.Text>
            <PasswordStrengthBar
              style={{ marginTop: "30px" }}
              scoreWordStyle={{ fontSize: "17px" }}
              barColors={[
                "#999999",
                "#ef4836",
                "#f6b44d",
                "#2b90ef",
                "#25c281",
              ]}
              minLength={6}
              password={inputs.password.value}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={inputs.password2.value}
              placeholder="Enter password"
              onChange={(e) => onChange(e)}
              onBlur={(e) => handleBlur(e)}
            />
            <Form.Text className="text-muted">
              {inputs.password2.message}
            </Form.Text>
          </Form.Group>
          <div>
            <Form.Check
              inline
              label="verify account here on website for convenient demo purposes"
              name="group1"
              type="radio"
              id="site-radio"
              checked={verifyMethod === "on-site" ? true : false}
              onChange={(e) => handleRadioChange(e)}
            />
            <Form.Check
              inline
              className="mt-3"
              label="verify account with email address"
              name="group1"
              type="radio"
              id="email-radio"
              checked={verifyMethod === "email" ? true : false}
              onChange={(e) => handleRadioChange(e)}
            />
          </div>
          <ButtonGroup aria-label="submit or cancel" className="mt-3">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>{" "}
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Container>
    </Container>
  );
};

export default Register;
