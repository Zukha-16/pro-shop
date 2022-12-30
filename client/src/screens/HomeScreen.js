import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../slices/productsSlice";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, errorMessage, productsStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const ProductsList = () => {
    if (productsStatus === "loading") {
      return <Loader />;
    } else if (productsStatus === "error") {
      return <Message variant={"danger"}>{errorMessage}</Message>;
    } else {
      return (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  return (
    <>
      <h1>Latest products</h1>
      <ProductsList />
    </>
  );
};
export default HomeScreen;
