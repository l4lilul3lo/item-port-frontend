import { Form } from "react-bootstrap";
import { useState } from "react";
const Search = () => {
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    window.alert(input);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
      <Form.Control
        type="text"
        name="search"
        placeholder="search"
        onChange={(e) => setInput(e.target.value)}
      />
    </Form>
  );
};

export default Search;
