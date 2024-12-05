export class HttpClient {
  constructor(options) {
    if (!options.baseURL) {
      throw new Error("[HttpService]: Base URL is empty");
    }
    this.httpProvider = options.httpProvider;
    this.getToken = options.getToken;
    this.baseUrl = options.baseURL;
  }

  buildRequest(options = {}) {
    const token = this.getToken?.();
    let headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };

    if (options.headers) {
      headers = { ...headers, ...options.headers };
    }

    return {
      baseURL: this.baseUrl,
      headers,
      ...options,
    };
  }

  checkPath(path) {
    if (!path.startsWith("/")) {
      throw new Error(
        `[HttpService]: Path must start with "/", received: "${path}"`,
      );
    }
  }

  async get(path, options) {
    this.checkPath(path);
    return this.httpProvider.get(path, this.buildRequest(options));
  }

  async post(path, options) {
    this.checkPath(path);
    return this.httpProvider.post(path, this.buildRequest(options));
  }

  async put(path, options) {
    this.checkPath(path);
    return this.httpProvider.put(path, this.buildRequest(options));
  }

  async delete(path, options) {
    this.checkPath(path);
    return this.httpProvider.delete(path, this.buildRequest(options));
  }
}
