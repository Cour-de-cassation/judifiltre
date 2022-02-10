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
  try {
    if (await userRepository.findByEmail(email)) {
      throw new Error(`A user already exists with this email`);
    }
  } catch (e) {}
  const newUser = await userModule.lib.buildUser({
    email,
    name,
    password,
  });

  return userRepository.insert(newUser);
}
