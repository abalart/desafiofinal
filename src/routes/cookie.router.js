import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser('mySecretCookie'));

router.get('/', (req, res) =>{
    res.send('ok');
});

router.get('/set', (req, res)=>{
    res.cookie('CookieLucas', 'aguante el god of war').json({cookieStatus: 'create'});
});

router.get('/get', (req, res)=>{
    console.log(req.cookies);
    res.json({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    });
});

router.delete('/delete', (req, res)=>{
    res.clearCookie('CookieLucas').json({ cookieStatus: 'Delete CookieLucas'});
})

router.get('/setsigned', (req, res)=>{
    res.cookie('CookieLucas', 'aguante el god of war', {signed: true}).json({cookieStatus: 'create cookie signed'});
})

