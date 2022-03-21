import { selectCartItems, removeFromCart } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };
  if (cartItems.length === 0) {
    return <h1>Lol</h1>;
  }

  return (
    <>
      <Row className="bg-warning h-100">
        <Col sm={8}>
          {cartItems.map((x) => {
            return (
              <Card className="d-flex flex-row">
                <Card.Img style={{ width: "128px" }} src={x.image} />
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleDelete(x.id)}>
                    Remove from cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
        <Col id="side-content"></Col>
      </Row>
    </>
  );
};

export default Cart;
<Card className="d-flex flex-row">
  <Card.Img
    style={{ width: "128px" }}
    src={"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"}
  />
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>;
