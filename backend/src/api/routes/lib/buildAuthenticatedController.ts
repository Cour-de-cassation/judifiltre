import { Response } from "express";
import { controllerType } from "./controllerType";
import { buildController } from "./buildController";
import { userService } from "../../../modules/user";

export { buildAuthenticatedController };

function buildAuthenticatedController<paramT>(
  executeController: controllerType<paramT>,
  extractParams?: (request: any) => paramT
) {
  return async (request: any, response: Response) => {
    await userService.fetchAuthenticatedUserFromAuthorizationHeader(
      request.headers.authorization
    );
    return buildController(executeController, extractParams)(request, response);
  };
}
