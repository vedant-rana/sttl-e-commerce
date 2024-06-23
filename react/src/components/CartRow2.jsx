import React, { useState, useEffect } from "react";
import { imageServer } from "../utils/envVariables";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../redux/reducers/cartReducers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  manageQuantityService,
  removeItemService,
} from "../services/cartServices";

const CartRow = ({ product }) => {
  const { productId, name, image, price, quantity } = product;
  const dispatch = useDispatch();

  const [quant, setQuant] = useState(quantity);

  useEffect(() => {
    dispatch(updateItemQuantity({ productId, quantity: quant }));
    manageQuantityService({ productId, quantity: quant });
  }, [quant, dispatch, productId]);

  const handleIncrement = () => {
    if (quant < 10) {
      setQuant(quant + 1);
    }
  };

  const handleDecrement = () => {
    if (quant > 1) {
      setQuant(quant - 1);
    }
  };

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
    removeItemService(productId);
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <img
          src={`${imageServer}${image}`}
          alt={name}
          className="w-12 h-12 object-cover"
        />
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">
        <button onClick={handleDecrement}>-</button>
        <span>{quant}</span>
        <button onClick={handleIncrement}>+</button>
      </td>
      <td className="px-6 py-4">
        <button
          className="font-medium text-blue-600 hover:underline"
          onClick={() => removeFromCart(productId)}
        >
          <DeleteForeverIcon />
        </button>
      </td>
    </tr>
  );
};

export default CartRow;
