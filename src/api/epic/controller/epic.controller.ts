import { Request, Response, NextFunction } from "express";
import { Response as ResponseModel } from "src/api/model/response.model";
import { HttpStatusCode } from "src/enums/http-status-codes.enum";
import { EpicService } from "../service/epic.service";

export class EpicController {
  public getEpicImageUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { date, geoJson } = req.query as { date: string; geoJson: string };
      const parsedGeoJson = JSON.parse(geoJson);
      const epicSerivce = new EpicService();
      const data = await epicSerivce.getEpicImageUrl({
        date,
        geoJson: parsedGeoJson,
      });
      ResponseModel.success(res, {
        statusCode: HttpStatusCode.OK,
        message: "Fetched categories successfully",
        data: {
            imageUrl: data
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
