import { buildCallAttemptsRegulator } from "sder-core";
import { buildLogin } from "./login";

export { userService };

const DELAY_BETWEEN_LOGIN_ATTEMPTS_IN_SECONDS = 1 * 1000;

const MAX_LOGIN_ATTEMPTS = 1;

const userService = buildUserService();

function buildUserService() {
  const { checkCallAttempts } = buildCallAttemptsRegulator(
    MAX_LOGIN_ATTEMPTS,
    DELAY_BETWEEN_LOGIN_ATTEMPTS_IN_SECONDS
  );

  return { login: buildLogin(checkCallAttempts) };
}
