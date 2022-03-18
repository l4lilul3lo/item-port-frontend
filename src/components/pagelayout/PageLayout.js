import Nav from "../nav/Nav";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../loading/Loading";
const PageLayout = () => {
  const { isLoading, isError, data } = useQuery("getAllProducts", () =>
    fetch("http://localhost:4000/allProducts").then((res) => res.json())
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <Nav />
      <Outlet />
      <div id="products-container">
        {data?.map((x, i) => {
          return (
            <div id="product-container" key={i}>
              <p>{x.title}</p>

              <p>{x.price}</p>
              <img src={x.image} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PageLayout;
