import { Request, Response } from "express";
import { controllerType } from "./controllerType";

export { buildController };

function buildController<paramT>(
  executeController: controllerType<paramT>,
  extractParams?: (request: Request) => paramT
) {
  return async (request: any, response: Response) => {
    try {
      const result = await (extractParams
        ? executeController(extractParams(request))
        : executeController({} as any));
      switch (result.kind) {
        case "success":
          return response
            .status(result.statusCode || 200)
            .json(result.response);
        case "error":
          console.error(result.message);
          return response.status(result.statusCode).send(result.message);
      }
    } catch (error) {
      console.error(error);
      return response.status(500).send(error);
    }
  };
}
