import { Router } from 'express';
import * as citaCtrl from '../controllers/cita.controller.js';

const router = Router();

router.get('/', citaCtrl.getCitas);
router.post('/', citaCtrl.createCita);
router.get('/:id', citaCtrl.getCitaById);
router.put('/:id', citaCtrl.updateCita);
router.delete('/:id', citaCtrl.deleteCita);

export default router;