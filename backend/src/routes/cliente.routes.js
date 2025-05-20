import { Router } from 'express';
import * as clienteCtrl from '../controllers/cliente.controller.js';

const router = Router();

router.get('/', clienteCtrl.getClientes);
router.post('/', clienteCtrl.createCliente);
router.get('/:id', clienteCtrl.getClienteById);
router.put('/:id', clienteCtrl.updateCliente);
router.delete('/:id', clienteCtrl.deleteCliente);

export default router;