const BaseUrl = 'http://localhost:4000/api/v1/';

export const sendRequest = async ({ url, data, method, token }) => {
  try {
    const response = await fetch(`${BaseUrl}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': 'application/json',
        [token && 'Authorization']: token && `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response) {
      const newData = await response.json();
      return newData;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LoginUser = async ({ data }) => {
  const response = await sendRequest({
    url: `users/login`,
    method: `POST`,
    data: {
      identifier: data.email,
      password: data.password,
    },
  });

  return response;
};

export const SignUpUser = async ({ data }) => {
  const response = await sendRequest({
    url: `users/signup`,
    method: `POST`,
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword,
    },
  });

  return response;
};

export const createUser = async ({ data, token }) => {
  const response = await sendRequest({
    url: `users/signup`,
    method: `POST`,
    token,
    data,
  });
  return response;
};
export const removeUser = async ({ token, id }) => {
  const response = await sendRequest({
    url: `users/${id}`,
    token,
    method: `DELETE`,
  });
  return response;
};

export const AddToCart = async ({ data, token }) => {
  const response = await sendRequest({
    url: `cart/create`,
    method: `POST`,
    data,
    token,
  });
  return response;
};

export const getAllUsers = async ({ token }) => {
  const response = await sendRequest({
    url: `users`,
    token,
  });
  return response;
};

export const getCarts = async ({ token }) => {
  const response = await sendRequest({
    url: `cart`,
    token,
  });
  return response;
};

export const removeCarts = async ({ token, cartID }) => {
  const response = await sendRequest({
    url: `cart/remove`,
    token,
    method: `DELETE`,
    data: {
      cartID,
    },
  });
  console.log(response);
  return response;
};

export const getAddress = async ({ token }) => {
  const response = await sendRequest({
    url: `users/getAddress`,
    token,
  });

  return response;
};

export const updateAddress = async ({ token, addressData }) => {
  const response = await sendRequest({
    url: `users/updateAddress`,
    token,
    method: `PATCH`,
    data: addressData,
  });

  return response;
};

export const deleteAddressFunction = async ({ token, addressId }) => {
  console.log({ token, addressId });
  await sendRequest({
    url: `users/deleteAddress`,
    token,
    method: `DELETE`,
    data: {
      addressId,
    },
  });
};

export const createCard = async ({ data, token }) => {
  console.log(data);
  const response = await sendRequest({
    url: `users/cards/`,
    method: `POST`,
    data,
    token,
  });
  return response;
};

export const getCards = async ({ token }) => {
  const response = await sendRequest({
    url: `users/cards/`,
    token,
  });
  return response;
};

export const deleteCard = async ({ token, cardID }) => {
  const response = await sendRequest({
    url: `users/cards/${cardID}`,
    token,
    method: `DELETE`,
  });
  return response;
};

export const createOrder = async ({ cartId, token }) => {
  const response = await sendRequest({
    url: `orders/create`,
    token,
    method: `POST`,
    data: { cartId },
  });
  return response;
};

export const getOrders = async ({ token }) => {
  const response = await sendRequest({
    url: `orders/getOrders`,
    token,
  });
  return response;
};

export const getAllOrders = async ({ token }) => {
  const response = await sendRequest({
    url: `orders/getAllOrders`,
    token,
  });
  return response;
};

export const updateOrder = async ({ id, status, token }) => {
  const response = await sendRequest({
    url: `orders/updateOrder/${id}/${status}`,
    token,
    method: `PATCH`,
  });
  return response;
};
