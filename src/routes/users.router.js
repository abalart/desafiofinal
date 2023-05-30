import { Router } from 'express';
import { passportCall, authorization} from '../utils.js';
import { UserService }  from '../repository/index.js'
import __dirname from '../utils.js';
import { upload } from '../config/multer.js';

const router = Router();

router.get('/premium/:uid', passportCall('jwt'), authorization(['user', 'premium']), (req, res) =>{
    const id = req.params.uid;
    console.log(id);
    res.render('switchRole', {
        user: req.user.user,
        id: id,
    })
})

router.post('/premium/:uid', passportCall('jwt'), authorization('user'), async (req, res) =>{
    const id = req.params.uid;
    console.log(id);
    const user = await UserService.getOne(id);
    if(!user) res.send(404);
    if (user.role == 'admin')  res.redirect('/api/users/profile');
    user.role = (user.role == 'user' ? 'premium' : 'user');
    const newUser = await UserService.update(id, user);
    console.log(newUser);
    res.redirect('/api/users/profile');
})

router.get('/profile', passportCall('jwt'), authorization('user'), (req, res)=>{

    res.render('profile', {
        user: req.user.user
    })
})

router.get('/private', passportCall('jwt'), authorization('user'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'user'});
});

router.get('/secret', passportCall('jwt'), authorization('admin'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'ADMIN'});
});

router.post('/documents', passportCall('jwt'), authorization(['user','premium','admin']), upload, (req, res) =>{
    const user = req.user.user;

    res.json({status: 'success', payload: 'archivo subido' });
});


export default router;