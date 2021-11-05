import express from "express";
import { publicityInfoModule } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { decisionService } from "../../modules/decision";

export { buildRoutes };

function buildRoutes() {
  const router = express.Router();
  router.get("/publicityInfos", async (request, response) => {
    const publicityInfos = await publicityInfoService.findAll();
    response.json(publicityInfos);
  });

  router.get("/decision", async (request, response) => {
    const params = request.query as { _id: string; sourceDb: string };
    const parsedParams =
      publicityInfoModule.lib.converter.convertParameters(params);
    if (!parsedParams) {
      response.sendStatus(400);
      return;
    }
    const decision = await decisionService.findOne(parsedParams);
    response.json(decision);
  });
  return router;
}
