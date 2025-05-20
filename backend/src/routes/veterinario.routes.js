import { Router } from 'express';
import * as veterinarioCtrl from '../controllers/veterinario.controller.js';

const router = Router();

router.get('/', veterinarioCtrl.getVeterinarios);
router.post('/', veterinarioCtrl.createVeterinario);
router.get('/:id', veterinarioCtrl.getVeterinarioById);
router.put('/:id', veterinarioCtrl.updateVeterinario);
router.delete('/:id', veterinarioCtrl.deleteVeterinario);

export default router;