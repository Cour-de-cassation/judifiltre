import { userService } from "../../modules/user";
import { runScript } from "./runScript";

async function listUsers(argv: { email: string }) {
  const users = await userService.list();
  users.forEach((user) => {
    console.log("- " + user.name + " | " + user.email);
  });
}

runScript(listUsers, {});
