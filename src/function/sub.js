import axios from "axios";
import {baseURL} from "../../BaseUrl";

export const getCategories = async () =>
  await axios.get(`${baseURL}categories`);

export const getCategory = async (slug) =>
  await axios.get(`${baseURL}category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${baseURL}category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${baseURL}category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${baseURL}category`, category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${baseURL}api/category/subs/${_id}`);