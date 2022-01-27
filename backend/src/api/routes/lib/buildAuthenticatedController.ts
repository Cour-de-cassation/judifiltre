import { idModule, userModule, userType } from "judifiltre-core";
import { buildAuthenticator } from "sder-core";
import { buildUserRepository } from "src/modules/user/repository";

export { buildAuthenticatedController };

export type { authorizationHeaderType };

type authorizationHeaderType = {
  authorization: string;
};

function buildAuthenticatedController<inT, outT>({
  controllerWithUser,
}: {
  controllerWithUser: (
    user: userType,
    req: { args: inT; headers: authorizationHeaderType }
  ) => Promise<outT>;
}): (req: { args: inT; headers: authorizationHeaderType }) => Promise<outT> {
  return async (req: { args: inT; headers: authorizationHeaderType }) => {
    const userId = idModule.lib.buildId(
      buildAuthenticator(
        req.headers.authorization
      ).extractUserIdFromAuthorizationHeader(req.headers.authorization)
    );

    const userRepository = buildUserRepository();
    const user = await userRepository.findById(userId);

    userModule.lib.assertAuthorization(user);

    return controllerWithUser(user, req);
  };
}
