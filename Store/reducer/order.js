import Orders from "../../Models/order";
import { Add_Order, SET_ORDERS } from "../actions/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case Add_Order:
      const newOrder = new Orders(
        action.ordersdata.id,
        action.ordersdata.allitems,
        action.ordersdata.TAmount,
        action.ordersdata.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};
