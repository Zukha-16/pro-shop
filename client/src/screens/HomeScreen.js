import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
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
    
  }, []);
  useMemo(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      <h1>Lates products</h1>
      <ProductsList />
    </>
  );
};
export default HomeScreen;
