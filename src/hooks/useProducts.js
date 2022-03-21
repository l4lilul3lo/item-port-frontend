import { useAxiosWrapper } from "./useAxiosWrapper";

const useProducts = () => {
  const axiosWrapper = useAxiosWrapper();
  const getProducts = async () => {
    return axiosWrapper.get("/products");
  };

  const getProduct = (productId) => {
    return axiosWrapper.get(`/products/${productId}`);
  };
  return {
    getProducts,
    getProduct,
  };
};

export { useProducts };
