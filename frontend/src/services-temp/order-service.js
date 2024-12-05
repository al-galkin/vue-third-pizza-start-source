import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/addresses";

class OrderService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
  async create(dataObject) {
    try {
      return this.post("/", { data: dataObject });
    } catch (e) {
      throw Error(e);
    }
  }
  async delete(id) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
