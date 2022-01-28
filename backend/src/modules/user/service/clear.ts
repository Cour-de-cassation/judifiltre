import { buildUserRepository } from "../repository";

export { clear };

async function clear() {
  const userRepository = buildUserRepository();

  return userRepository.clear();
}
