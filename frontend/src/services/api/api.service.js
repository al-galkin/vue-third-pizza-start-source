import axios, { AxiosError } from "axios";

class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export class ApiService {
  /** Метод для обработки ошибок */
  _getError(e) {
    if (e instanceof AxiosError) {
      /* Возвращаем ошибку, содержащую сообщение об ошибке и ответ сервера */
      /* Если имеем дело с ошибкой Axios, пытаемся получить сообщение, которое отправил бэкенд */
      return new ApiError(
        e.response.data?.error?.message ?? e.message,
        e.response,
      );
    } else {
      /* Возвращаем ошибку, содержащую сообщение об ошибке и ответ сервера */
      return new ApiError(e.message, e.response);
    }
  }

  /** Обертка для запросов без тела (GET, DELETE) */
  _wrapperWithoutPayload(method, url) {
    return async () => {
      try {
        const response = await method(url);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  /** Обертка для запросов с телом (POST, PUT) */
  _wrapperWithPayload(method, url, payload) {
    return async () => {
      try {
        const response = await method(url, payload);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  $get(url) {
    return this._wrapperWithoutPayload(axios.get, url)();
  }

  $post(url, payload) {
    return this._wrapperWithPayload(axios.post, url, payload)();
  }

  $put(url, payload) {
    return this._wrapperWithPayload(axios.put, url, payload)();
  }

  $delete(url) {
    return this._wrapperWithoutPayload(axios.delete, url)();
  }
}
