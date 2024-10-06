import { celebrate, Joi, Segments } from "celebrate";

export default {
    getEvents: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            categoryId: Joi.number(),
            days: Joi.number()
        })
    })
}