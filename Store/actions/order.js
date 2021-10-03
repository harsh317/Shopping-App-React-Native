export const Add_Order = "Add_Order";
export const SET_ORDERS = "SET_ORDERS";
import Orders from "../../Models/order";

export const FetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const res = await fetch(
        `https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!res.ok) {
        throw new Error("Something went wrong!! ");
      }

      const resData = await res.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Orders(
            key,
            resData[key].cartitems,
            resData[key].TAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const ADD_Order = (cartitems, TAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const res = await fetch(
      `https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartitems,
          TAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong!! ");
    }
    const resData = await res.json();
    dispatch({
      type: Add_Order,
      ordersdata: {
        id: resData.name,
        allitems: cartitems,
        TAmount: TAmount,
        date: date,
      },
    });
  };
};
