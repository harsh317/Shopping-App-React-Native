import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/product";
import { CREATE_Product } from "../actions/product";
import { UPDATE_Product } from "../actions/product";
import { SET_Product } from "../actions/product";
import Product from "../../Models/products";

const initialState = {
  availableProducts: [],
  UserProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_Product:
      return {
        availableProducts: action.products,
        UserProducts: action.userProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        UserProducts: state.UserProducts.filter(
          (UserProduct) => UserProduct.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (Product) => Product.id !== action.pid
        ),
      };

    case CREATE_Product:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.Price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        UserProducts: state.UserProducts.concat(newProduct),
      };
    case UPDATE_Product:
      const UpdatedProductIndex = state.UserProducts.findIndex(
        (product) => product.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.UserProducts[UpdatedProductIndex].OwnerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.UserProducts[UpdatedProductIndex].price
      );
      const updatedUserProducts = [...state.UserProducts];
      updatedUserProducts[UpdatedProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.pid
      );

      const updatedavailableProducts = [...state.availableProducts];
      updatedavailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedavailableProducts,
        UserProducts: updatedUserProducts,
      };
  }
  return state;
};
