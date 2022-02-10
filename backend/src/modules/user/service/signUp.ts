import { userModule } from "judifiltre-core";
import { buildUserRepository } from "../repository";

export { signUp };

async function signUp({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  const userRepository = buildUserRepository();
  if (await userRepository.findByEmail(email)) {
    throw new Error(`A user already exists with this email`);
  }
  const newUser = await userModule.lib.buildUser({
    email,
    name,
    password,
  });

  return userRepository.insert(newUser);
}
