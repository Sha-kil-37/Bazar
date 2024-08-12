import axios from "axios";
// base url
let baseUrl = "https://dummyjson.com/products";

// get all products and single product by id
export const getProduct = async function (query) {
  if (query) {
    try {
      let url = `${baseUrl}/${query}`;
      return await axios.get(url);
    } catch (error) {
      return error;
    }
  } else {
    try {
      let url = baseUrl;
      return await axios.get(url);
    } catch (error) {
      return error;
    }
  }
};
// get product by category
export const getProductByCategory = async function (query) {
  try {
    let url = `${baseUrl}/category/${query}`;
    return await axios.get(url);
  } catch (error) {
    return error;
  }
};

// search product
export const seachAndPaginationProduct = async function (query, currentTotal) {
  if (typeof query === "string") {
    try {
      let params = new URLSearchParams({
        q: query,
      });
      let url = `${baseUrl}/search?${params}`;
      return await axios.get(url);
    } catch (error) {
      return error;
    }
  } else {
    try {
      let skip = currentTotal.length * (query - 1);
      let params = new URLSearchParams({
        skip: skip,
      });
      let url = `${baseUrl}?${params}`;
      return await axios.get(url);
    } catch (error) {
      return error;
    }
  }
};

// get all products categorys
export const productCategory = async function () {
  try {
    let url = `${baseUrl}/category-list`;
    return await axios.get(url);
  } catch (error) {
    return error;
  }
};
// get sort product by asc desc
export const sortProduct = async function (query) {
  try {
    let params = new URLSearchParams({
      sortBy: "title",
      order: query,
    });
    let url = `${baseUrl}/?${params}`;
    return await axios.get(url);
  } catch (error) {
    return error;
  }
};
