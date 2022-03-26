import { useLocation, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
const Product = () => {
  const { getProduct } = useProducts();
  const dispatch = useDispatch();
  const location = useLocation();

  const params = useParams();

  console.log(`params ${JSON.stringify(params)}`);
  const productId = params.id;
  console.log(location);
  const handleClick = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };
  const { isLoading, isError, data } = useQuery("getProduct", async () => {
    return getProduct(productId);
  });

  if (isLoading) return <h1>loading</h1>;

  const product = data.data;
  const productInfo = product.info;
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1>{productInfo.title}</h1>
      <img src={productInfo.image} style={{ width: "256px" }} />
      <div id="product-description">
        <h4>{productInfo.description}</h4>
      </div>
      <Button
        variant="primary"
        onClick={() => handleClick(product)}
        style={{ marginTop: "25px" }}
      >
        Add Item to cart
      </Button>
    </Container>
  );
};

export default Product;
