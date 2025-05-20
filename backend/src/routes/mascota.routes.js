// src/routes/mascota.routes.js
import { Router } from 'express';
import * as mascotaCtrl from '../controllers/mascota.controller.js';

const router = Router();

router.get('/', mascotaCtrl.getMascotas);
router.post('/', mascotaCtrl.createMascota);
router.get('/:id', mascotaCtrl.getMascotaById);
router.put('/:id', mascotaCtrl.updateMascota);
router.delete('/:id', mascotaCtrl.deleteMascota);

export default router;