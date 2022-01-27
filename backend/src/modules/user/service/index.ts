import { buildCallAttemptsRegulator } from "sder-core";
import { clear } from "./clear";
import { buildLogin } from "./login";
import { signUp } from "./signUp";

export { userService };

const DELAY_BETWEEN_LOGIN_ATTEMPTS_IN_SECONDS = 1 * 1000;

const MAX_LOGIN_ATTEMPTS = 1;

const userService = buildUserService();

function buildUserService() {
  const { checkCallAttempts } = buildCallAttemptsRegulator(
    MAX_LOGIN_ATTEMPTS,
    DELAY_BETWEEN_LOGIN_ATTEMPTS_IN_SECONDS
  );

  return {
    clear,
    login: buildLogin(checkCallAttempts),
    signUp,
  };
}
