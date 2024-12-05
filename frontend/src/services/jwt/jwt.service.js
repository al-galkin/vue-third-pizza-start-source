const ID_TOKEN_KEY = "token";

class JwtService {
  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }

  setToken(token) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }

  removeToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }
}

export default new JwtService();
