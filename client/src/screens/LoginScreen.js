import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, userStatus, errorMessage } = useSelector((state) => state.user);
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirect = search ? search.split("=")[1] : "";

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [user, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {userStatus === "failed" && (
        <Message variant="danger">{errorMessage}</Message>
      )}
      {userStatus === "loading" && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
