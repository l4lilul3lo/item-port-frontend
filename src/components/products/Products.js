import { useQuery } from "react-query";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useDispatch } from "react-redux";

const Products = () => {
  const { getProducts } = useProducts();
  const navigate = useNavigate();

  const columnsPerRow = 4;

  const getColumnsForRow = () => {
    let items = products.map((product, i) => {
      let productId = product.id;
      let productInfo = product.info;
      return (
        <Col key={i} className="d-flex align-items-stretch">
          <Card
            id="product-card"
            onClick={() => navigate(`/product/${productId}`)}
          >
            <Card.Img
              src={productInfo.image}
              style={{ width: "30%", margin: "0 auto" }}
            />
            <Card.Body className=" d-flex align-items-end">
              <Card.Title>{productInfo.title}</Card.Title>
            </Card.Body>
            <Card.Footer>{productInfo.price}</Card.Footer>
          </Card>
        </Col>
      );
    });
    return items;
  };

  const { isLoading, isError, data } = useQuery("getProducts", getProducts, {
    staleTime: 1000 * 60,
  });

  if (isLoading) return <h1>Loading product data...</h1>;

  const products = data.data;

  return (
    <Container className="mt-3">
      <Row xs={1} md={columnsPerRow}>
        {getColumnsForRow()}
      </Row>
    </Container>
  );
};

export default Products;
