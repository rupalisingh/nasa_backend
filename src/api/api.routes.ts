import { Router} from 'express';
import eonetRouter from './eonet/eonet.routes';
import epicRouter from './epic/epic.routes';
import { Routes } from 'src/enums/routes.enums';

const apiRoutes = Router();

apiRoutes.use(Routes.EONET, eonetRouter)
apiRoutes.use(Routes.EPIC, epicRouter)
export default apiRoutes;