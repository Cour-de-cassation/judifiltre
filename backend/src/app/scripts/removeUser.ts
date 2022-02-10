import { userService } from "../../modules/user";
import { runScript } from "./runScript";

async function removeUser(argv: { email: string }) {
  const result = await userService.remove({
    email: argv.email,
  });
  console.log(`${result} users deleted`);
}

runScript(removeUser, {
  email: {
    demandOption: true,
    description: "account email",
    type: "string",
  },
});
