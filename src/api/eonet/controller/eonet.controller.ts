import { Request, Response, NextFunction } from "express";
import { EonetService } from "../service/eonet.service";
import { Response as ResponseModel } from "src/api/model/response.model";
import { HttpStatusCode } from "src/enums/http-status-codes.enum";

export class EonetController {
  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eonetSerivce = new EonetService();
      const data = await eonetSerivce.getAllCategories();
      ResponseModel.success(res, {
        statusCode: HttpStatusCode.OK,
        message: "Fetched categories successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { categoryId, days = 7 } = req.query as {
        categoryId?: number;
        days?: number;
      };
      const eonetSerivce = new EonetService();
      const data = await eonetSerivce.getEvents(days);
      const filteredData = categoryId
        ? data.filter(
            (item) => !!item.categories.find((val) => val.id === categoryId)
          )
        : data;
      ResponseModel.success(res, {
        statusCode: HttpStatusCode.OK,
        message: "Fetched events successfully",
        data: filteredData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
