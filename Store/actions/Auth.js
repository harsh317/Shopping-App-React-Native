import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;

export const authenticate = (token, userId, ExpiryTime) => {
  return (dispatch) => {
    dispatch(setLogutTimer(ExpiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  };
};

export const signUp = (Email, Pass) => {
  return async (dispatch) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7XrmhEzqK3yjUJy4VkXY87LQGKInSBrA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Pass,
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) {
      let message = "Something Went wrong!";
      const errorResData = await res.json();
      const errorMessage = errorResData.errors.message;
      if (errorMessage == "EMAIL_EXISTS") {
        message = "This Email exists already!";
      }
      throw new Error(message);
    }

    const resData = await res.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const ExpireDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDatatoStorage(resData.idToken, resData.localId, ExpireDate);
  };
};

export const Login = (Email, Pass) => {
  return async (dispatch) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7XrmhEzqK3yjUJy4VkXY87LQGKInSBrA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Pass,
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) {
      let message = "Something Went wrong!";
      const errorResData = await res.json();
      const errorMessage = errorResData.error.message;
      if (errorMessage == "EMAIL_NOT_FOUND") {
        message = "Sorry, There is no such email";
      } else if (errorResData.error.message === "INVALID_PASSWORD") {
        message = "Sorry, Your Password Is Wrong Like You";
      }
      throw new Error(message);
    }

    const resData = await res.json();

    console.log(resData);

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const ExpireDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDatatoStorage(resData.idToken, resData.localId, ExpireDate);
  };
};

export const Logout = () => {
  clearLogutTimer();
  AsyncStorage.removeItem("Userdata");
  return { type: LOGOUT };
};

const setLogutTimer = (expireTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(Logout());
    }, expireTime);
  };
};

const clearLogutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDatatoStorage = (token, userId, ExpireDate) => {
  AsyncStorage.setItem(
    "Userdata",
    JSON.stringify({
      token: token,
      userId: userId,
      ExpireDate: ExpireDate.toISOString(),
    })
  );
};
