import Nav from "../nav/Nav";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "../loading/Loading";
const PageLayout = () => {
  const [s, setS] = useState(true);
  function createGroups(arr, numGroups) {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
      .fill("")
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }
  const { isLoading, isError, data } = useQuery(
    "getAllProducts",
    () => fetch("http://localhost:4000/allProducts").then((res) => res.json()),
    { retry: 1 }
  );

  if (isLoading) return <h1>Loading product data...</h1>;

  if (isError)
    return (
      <>
        <Outlet />
        <h1>Something went wrong</h1>
      </>
    );
  return (
    <>
      <Outlet />
      {/* <div id="products-container">
        {data?.map((x, i) => {
          return (
            <div id="product-container" key={i}>
              <p>{x.title}</p>

              <p>{x.price}</p>
              <figure className="image is-128x128">
                <img className="p-image" src={x.image} />
              </figure>
            </div>
          );
        })}
      </div> */}
      {/* <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">John Smith</p>
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div> */}
      {/* <div className="container">
        {createGroups(data, 4).map((group) => {
          return (
            <div className="columns">
              {group.map((x) => {
                return <div className="column">{x.title}</div>;
              })}
            </div>
          );
        })}
      </div> */}
      <div className="container">
        <button onClick={() => setS(!s)}>click me</button>
        <div className="columns is-multiline">
          {data.map((x) => {
            return (
              <div className="column is-one-quarter">
                <div className="box">
                  <p>{x.title}</p>
                  <figure className="image is-square">
                    <img src={x.image} />
                  </figure>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PageLayout;
