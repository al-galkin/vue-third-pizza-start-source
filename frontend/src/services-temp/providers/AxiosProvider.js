import axios from "axios";

export default class AxiosProvider {
  constructor() {
    this.interceptors = [];
    this.instance = axios.create();
  }

  /** Метод для добавления параметров запроса */
  computeQueryParams(query) {
    if (!query) return "";
    const queryParams = new URLSearchParams(query);
    return `?${queryParams.toString()}`;
  }

  /** Метод для обработки запросов */
  async request(options) {
    try {
      const response = await this.instance({
        url:
          options.baseUrl +
          options.path +
          this.computeQueryParams(options.query),
        method: options.method,
        headers: options.headers,
        data: options.data || null,
      });

      return response.data;
    } catch (error) {
      const message = await this.onError(error);
      throw new Error(message);
    }
  }

  /** Метод для добавления перехватчиков */
  addInterceptor(interceptor) {
    if (interceptor && interceptor.onError) {
      this.interceptors.push(interceptor);

      // Применяем перехватчики ошибок в Axios
      this.instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const message = await this.onError(error);
          return Promise.reject(new Error(message));
        },
      );
    } else {
      throw new Error("Interceptor не поддерживается");
    }
    return this;
  }

  /** перехватчики ошибок */
  async onError(error) {
    const response = error.response;

    if (response && response.data) {
      const { error: apiError } = response.data;
      const { message, statusCode } = apiError || {};

      this.interceptors.forEach((interceptor) => {
        if (interceptor.onError) {
          interceptor.onError(statusCode, message);
        }
      });

      return message || "Произошла ошибка при обработке запроса";
    }

    return error.message || "Произошла неизвестная ошибка";
  }

  /** Методы HTTP-методы */
  get(path, requestOptions) {
    return this.request({ path, method: "GET", ...requestOptions });
  }

  post(path, requestOptions) {
    return this.request({ path, method: "POST", ...requestOptions });
  }

  put(path, requestOptions) {
    return this.request({ path, method: "PUT", ...requestOptions });
  }

  delete(path, requestOptions) {
    return this.request({ path, method: "DELETE", ...requestOptions });
  }
}
