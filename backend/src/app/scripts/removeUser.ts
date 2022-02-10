import { userService } from "../../modules/user";
import { runScript } from "./runScript";

async function removeUser(argv: { email: string }) {
  await userService.remove({
    email: argv.email,
  });
}

runScript(removeUser, {
  email: {
    demandOption: true,
    description: "account email",
    type: "string",
  },
});
