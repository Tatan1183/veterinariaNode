import { Router } from 'express';
import * as servicioCtrl from '../controllers/servicio.controller.js';

const router = Router();

router.get('/', servicioCtrl.getServicios);
router.post('/', servicioCtrl.createServicio);
router.get('/:id', servicioCtrl.getServicioById);
router.put('/:id', servicioCtrl.updateServicio);
router.delete('/:id', servicioCtrl.deleteServicio);

export default router;