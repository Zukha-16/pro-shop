// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../slices/userDetailsSlice";
import { updateUserProfile, resetUpdateMessage } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { user, detailsStatus, errorMessage } = useSelector(
    (state) => state.userDetails
  );
  const { user: userLogin, userUpdateStatus } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    } else {
      if (!user.name || user.name !== userLogin.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userLogin, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      try {
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
        dispatch(getUserDetails("profile"));
        setTimeout(() => {
          dispatch(resetUpdateMessage());
        }, 3000);
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Row>
      <Col md={4} lg={3}>
        <h2>User profile</h2>
        {detailsStatus === "failed" && (
          <Message variant="danger">{errorMessage}</Message>
        )}
        {message && <Message variant="danger">{message}</Message>}
        {detailsStatus === "loading" && <Loader />}
        {userUpdateStatus === "succeeded" && (
          <Message variant="success">Profile updated</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mt-4">
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

          <Form.Group controlId="password" className="my-4">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8} lg={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};
export default ProfileScreen;
