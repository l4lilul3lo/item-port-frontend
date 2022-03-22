import {
  selectCartItems,
  removeFromCart,
  selectCartTotal,
  updateQuantity,
} from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
  Dropdown,
  FormControl,
  DropdownButton,
} from "react-bootstrap";

import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const handleDelete = (product) => {
    console.log(product.id);
    dispatch(removeFromCart(product.id));
    const shortenedName =
      product.info.title.slice(0, 20) + "..." + "was removed from  your cart";
    toast.success(shortenedName);
  };

  const handleChange = (e) => {
    window.alert("hello");
  };
  const handleQtyClick = (e, productId) => {
    const qty = parseInt(e.target.innerHTML);
    dispatch(updateQuantity({ id: productId, qty: qty }));
  };

  console.log(JSON.stringify(cartItems));
  const productIds = Object.keys(cartItems);
  if (productIds.length === 0) {
    return (
      <Container fluid>
        <Row className=" h-100 mt-3">
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 8, order: 1 }}>
            <Card className="d-flex flex-row mb-3 mt-3">
              <Card.Body>
                <h4>Your cart is empty</h4>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            className="mt-3"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 4, order: 2 }}
          >
            <Card>
              <Card.Body>
                <h4>Subtotal ${cartTotal}</h4>
                <Card.Text>Saving money is good!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className=" h-100 mt-3">
        <Col xs={{ span: 12, order: 2 }} lg={{ span: 8, order: 1 }}>
          {productIds.map((productId, i) => {
            let product = cartItems[productId];
            let productInfo = cartItems[productId];
            console.log(`product in cart ${JSON.stringify(productInfo)}`);
            return (
              <Card className="d-flex flex-row mb-3 mt-3" key={i}>
                <Card.Img
                  style={{ width: "20%", height: "20%" }}
                  src={productInfo.image}
                />
                <Card.Body>
                  <Card.Title>{productInfo.title}</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Row>
                    <Col
                      lg={2}
                      style={{ minWidth: "120px", maxWidth: "120px" }}
                    >
                      <InputGroup className="mb-3 mr-3 flex-nowrap" size="sm">
                        <FormControl
                          style={{ minWidth: "30px", maxWidth: "30px" }}
                          aria-label="Text input with dropdown button"
                          value={productInfo.qty}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          disabled={true}
                        />
                        <DropdownButton
                          variant="outline-secondary"
                          id="input-group-dropdown-1"
                          title="qty"
                        >
                          {Array.from(Array(10).keys()).map((x) => {
                            return (
                              <Dropdown.Item
                                onClick={(e) => {
                                  handleQtyClick(e, productId);
                                }}
                              >
                                {x}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </InputGroup>
                    </Col>
                    <Col>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleDelete({ id: productId, info: productInfo })
                        }
                      >
                        delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
        <Col
          className="mt-3"
          xs={{ span: 12, order: 1 }}
          lg={{ span: 4, order: 2 }}
        >
          <Card>
            <Card.Body>
              <h4>Subtotal ${cartTotal}</h4>
              <button>Proceed to checkout</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
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

// cart state should be updated when we increase quantity of an item. The quantity of the item being purchased should be included in the cart as an object with the amount
