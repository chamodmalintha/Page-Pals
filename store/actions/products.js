import Product from '../../models/product';
import ENV from '../../env';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState)  => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://page-pals-new.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].address
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, 
        products: loadedProducts, 
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId) });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(
      `https://page-pals-new.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price, location) => {
  return async (dispatch, getState) => {

    const responseLocation = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

    if(!responseLocation.ok) {
      throw new Error('something went wrong!');
;    }
    const resDataLocation = await responseLocation.json();
      console.log(resDataLocation);

      if(!resDataLocation.results) {
        throw new Error('Something went wrong');
      }

      const address = resDataLocation.results[0].formatted_address;

    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      // `https://shop-app-38e8f.firebaseio.com/products.json?auth=${token}`,
      `https://page-pals-new.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          address,
          ownerId: userId
          // ownerId: 'u1'
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        address,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price, location) => {
  return async (dispatch, getState) => {

    const responseLocation = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

    if(!responseLocation.ok) {
      throw new Error('something went wrong!');
;    }
    const resDataLocation = await responseLocation.json();
      console.log(resDataLocation);

      if(!resDataLocation.results) {
        throw new Error('Something went wrong');
      }

      const address = resDataLocation.results[0].formatted_address;

    const token = getState().auth.token;
    const response = await fetch(
      // `https://shop-app-38e8f.firebaseio.com/products/${id}.json?auth=${token}`,
      `https://page-pals-new.firebaseio.com/products/${id}.json?auth=${token}`,

      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          address,
          price
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        address,
        price
      }
    });
  };
};
