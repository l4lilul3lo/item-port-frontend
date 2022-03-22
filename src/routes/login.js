import { useState, useEffect } from "react";

import { useUser } from "../hooks/useUser";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  useEffect(() => {
    return () => {
      setInputs({});
    };
  }, []);
  const user = useUser();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    message: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value, message: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    const body = { email, password };
    let message = await user.login(email, password);
    setInputs({ ...inputs, message: message });
  };

  return (
    <Container className="h-100 d-flex  align-items-center justify-content-center ">
      <Form className="text-center w-50 " onSubmit={handleSubmit}>
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Text>{inputs.message}</Form.Text>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    // <form onSubmit={handleSubmit} autoComplete="off">
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     name="email"
    //     className="input"
    //     onChange={(e) => onChange(e)}
    //   ></input>

    //   <input
    //     type="password"
    //     placeholder="Password"
    //     name="password"
    //     className="input"
    //     onChange={(e) => onChange(e)}
    //   ></input>
    //   <div className="message">{inputs.message}</div>
    //   <button type="submit" className="button is-primary is-large">
    //     Login
    //   </button>
    // </form>
  );
};

export default Login;
