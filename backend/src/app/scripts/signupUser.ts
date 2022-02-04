import { userService } from "../../modules/user";
import { runScript } from "./runScript";

async function signupUser(argv: {
  email: string;
  name: string;
  password: string;
}) {
  await userService.signUp({
    email: argv.email,
    name: argv.name,
    password: argv.password,
  });
}

runScript(signupUser, {
  email: {
    demandOption: true,
    description: "account email",
    type: "string",
  },
  name: {
    demandOption: true,
    description: "account name",
    type: "string",
  },
  password: {
    demandOption: true,
    description: "account password",
    type: "string",
  },
});
