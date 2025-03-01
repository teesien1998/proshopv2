import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import axios from "axios";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  // Get Products Query Redux
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  console.log(data);
  //   const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get("/api/products/");
  //       setProducts(data);
  //     };

  //     fetchProducts();
  //   }, []);

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {keyword ? <h1>Results of '{keyword}'</h1> : <h1>Latest Products</h1>}
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            <Paginate
              pages={data.pages}
              currentPage={data.currentPage}
              keyword={keyword}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
