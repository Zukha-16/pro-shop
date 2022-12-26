import { userLogin, userLogout, userRegister } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Loader from "../components/Loader";
const UserScreen = () => {
  const dispatch = useDispatch();
  const { user, userStatus, errorMessage } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const loginHandler = () => {
    dispatch(
      userLogin({ email: "zukhriddin853@gmail.com", password: "password" })
    );
  };
  const registerHandler = () => {
    dispatch(
      userRegister({
        name: "Zukhriddin",
        email: "zukhriddin853@gmail.com",
        password: "password",
      })
    );
  };
  return (
    <div>
      <h1>User Screen</h1>
      {userStatus === "loading" && <Loader />}
      {user ? (
        <>
          <Row>
            <Col md={3}>
              <h2>{user.isAdmin ? "Admin" : "Client"}</h2>
            </Col>
            <Col md={3}>
              <h2>{user.name}</h2>
            </Col>
            <Col md={6}>
              <h2>{user.email}</h2>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Button variant="primary" onClick={logoutHandler}>
                Logout
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={6}>
            <Button variant="primary" onClick={loginHandler}>
              Login
            </Button>
          </Col>
        </Row>
      )}
      <Col style={{ marginTop: "2rem" }}>
        <Row>
          <Col md={4}>
            <h2>Status: {userStatus}</h2>
          </Col>
          <Col md={4}>
            <h2>Error: {errorMessage ? errorMessage : "No errors"}</h2>
          </Col>
          <Col md={4}>
            <Button variant="primary" onClick={registerHandler}>
              Register
            </Button>
          </Col>
        </Row>
      </Col>
    </div>
  );
};
export default UserScreen;
