import { Router } from 'express';
import {
    searchUser,
    getUsers,
    registerUser

} from '../controllers/asistencia.controller.js';

const router = Router();

router.post('/search', searchUser);
router.post('/register', registerUser);
router.get('/users', getUsers);

router.get('/', (req, res) => {
    res.send("Chido Perrito");
});



export default router;