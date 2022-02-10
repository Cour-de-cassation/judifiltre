import { userType } from "judifiltre-core";
import { buildUserRepository } from "../repository";

export { list };

async function list() {
  const userRepository = buildUserRepository();
  const users = await userRepository.listAll();

  return users;
}
