import { ObjectId } from "mongodb";
import "server-only";
import DbConnect from "./DbConnect";

export const getProductsFromDb = async (categoryId) => {
  const db = await DbConnect();
  const productsCollection = db.collection("products");
  const query = {};
  if (categoryId) {
    query.categoryId = categoryId;
  }
  return productsCollection.find(query).toArray();
};

export const getProductIdFromDb = async (id) => {
  const db = await DbConnect();
  const productsCollection = db.collection("products");
  const query = {
    _id: new ObjectId(id),
  };

  return productsCollection.findOne(query);
};
