import { Router } from "express";
import { EpicRoutes } from "src/enums/routes.enums";
import { EpicController } from "./controller/epic.controller";

const epicRouter = Router();
const epicController = new EpicController();

epicRouter.get(EpicRoutes.IMAGE_URL, epicController.getEpicImageUrl);

export default epicRouter;