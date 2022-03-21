import { useQuery } from "react-query";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
const Products = () => {
  const dispatch = useDispatch();
  const { getProducts } = useProducts();
  const navigate = useNavigate();
  console.log(getProducts);
  const { isLoading, isError, data } = useQuery("getProducts", getProducts);

  if (isLoading) return <h1>Loading product data...</h1>;

  const products = data.data;

  return (
    <div className="container d-flex justify-content-center align-items-center bg-dark mt-3">
      <div className="row bg-warning">
        {products.map((x, i) => {
          return (
            <div className="col" key={i}>
              <Card
                className="product-card"
                style={{
                  width: "18rem",
                  height: "18rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/product/${x.id}`)}
              >
                <Card.Img
                  className="product-image"
                  variant="top"
                  src={x.image}
                  alt={x.category}
                  style={{ width: "60px" }}
                />
                <Card.Footer variant="bottom">
                  <Card.Title>{x.title}</Card.Title>
                  <div>
                    <Card.Text>{x.price}</Card.Text>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
