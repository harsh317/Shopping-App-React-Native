import Product from "../../Models/products";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_Product = "CREATE_Product";
export const UPDATE_Product = "Update_Product";
export const SET_Product = "SET_Product";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // Any Async code
    try {
      const res = await fetch(
        "https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/products.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!! ");
      }

      const resData = await res.json();
      const productstobeloaded = [];
      for (const key in resData) {
        productstobeloaded.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].Price
          )
        );
      }
      dispatch({
        type: SET_Product,
        products: productstobeloaded,
        userProducts: productstobeloaded.filter(
          (prod) => prod.OwnerId == userId
        ),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const delete_product = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await fetch(
      `https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong!! ");
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const Create_Product = (title, imageUrl, Price, description) => {
  return async (dispatch, getState) => {
    // Any Async code
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const res = await fetch(
      `https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          Price,
          ownerId: userId,
        }),
      }
    );

    const resData = await res.json();

    dispatch({
      type: CREATE_Product,
      productData: {
        id: resData.name,
        title: title,
        imageUrl: imageUrl,
        Price: Price,
        description: description,
        ownerId: userId,
      },
    });
  };
};

export const Update_Product = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await fetch(
      `https://rn-complete-guide-f7715-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong!! ");
    }

    dispatch({
      type: UPDATE_Product,
      productData: {
        title: title,
        imageUrl: imageUrl,
        description: description,
      },
      pid: id,
    });
  };
};
