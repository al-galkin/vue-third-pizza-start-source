import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "@/services/providers";

const BASE_URL = "/api/addresses";

class AddressService extends HttpClient {
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
  async update(dataObject) {
    try {
      return this.put(`/${dataObject.id}`, { data: dataObject });
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

export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
