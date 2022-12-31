export const calculate = (cartItems) => {
  const total = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const taxTotal = (total * 0.15).toFixed(2);
  const subTotal = (total - taxTotal).toFixed(2);
  const shipping = total > 500 ? 0 : (total * 0.1).toFixed(2);
  const grandTotal = (
    Number(subTotal) +
    Number(shipping) +
    Number(taxTotal)
  ).toFixed(2);
  
  const getTotal = (num1, num2) => {
    return (num1 * num2).toFixed(2);
  };

  return { subTotal, shipping, taxTotal, grandTotal, getTotal };
};
