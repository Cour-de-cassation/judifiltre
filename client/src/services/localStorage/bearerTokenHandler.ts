export { bearerTokenHandler };

const BEARER_TOKEN_KEY = "JUDIFILTRE_BEARER_TOKEN";

const bearerTokenHandler = {
  get() {
    return localStorage.getItem(BEARER_TOKEN_KEY) || undefined;
  },

  set(token: string) {
    return localStorage.setItem(BEARER_TOKEN_KEY, token);
  },

  remove() {
    return localStorage.removeItem(BEARER_TOKEN_KEY);
  },
};
