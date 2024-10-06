import { Router } from "express";
import { EonetRoutes } from "src/enums/routes.enums";
import { EonetController } from "./controller/eonet.controller";
import eonetValidator from "./validator/eonet.validator";

const eonetRouter = Router();
const eonetController = new EonetController();

eonetRouter.get(EonetRoutes.CATEGORIES, eonetController.getAllCategories);
eonetRouter.get(EonetRoutes.EVENTS, eonetValidator.getEvents, eonetController.getEvents);

export default eonetRouter;