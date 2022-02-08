import { userModule } from "judifiltre-core";
import { buildUserRepository } from "../repository";

export { remove };

async function remove({ email }: { email: string }) {
  const userRepository = buildUserRepository();
  const user = await userRepository.findByEmail(email);

  return userRepository.remove(user._id);
}
