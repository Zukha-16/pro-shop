import { useSelector } from "react-redux";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.product} className="temp_class">
          <p>
            <img src={item.image} alt={item.name} />{" "}
            {item.name}
          </p>
          <p>Quantity: {item.qty}</p>
        </div>
      ))}
    </div>
  );
};
export default CartScreen;
