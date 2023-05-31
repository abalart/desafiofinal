import { Router } from 'express';
import passport from 'passport';
import { passportCall, generateToken, authToken, authorization, transport, isValidPassword, createHash, validateTokenAndGetID, passwordFormatIsValid } from '../utils.js';
import { UserService }  from '../repository/index.js'
import __dirname from '../utils.js';
import config from '../config/config.js';


const router = Router();

//vista para registrar users
router.get('/', (req, res) => {
    res.redirect('/session/register');
});

router.get('/register', (req, res) => {
    res.render('session/register');
});


//api para generar usuarios
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login');
});

router.get('/failregister', (req, res) => {
    res.render('session/register');
})

//vista de login
router.get('/login', (req, res) => {
    res.render('session/login');
})

//api para login con jwt
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {

    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    //cookie del token
    res.cookie(config.jwt_cookie_name, req.user.token).redirect('/products');
})

router.get('/faillogin', (req, res) => {
    res.render('session/login');
})

router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email']}),
    async(req, res) => {}
);

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/session/login'}),
    async(req, res)=>{
        console.log('callback', req.user);

        req.session.user = req.user
        console.log('user session: ', req.session.user);
        //jwt cookie con el github
        res.cookie(config.jwt_cookie_name, req.user.token).redirect('/products');
    }
);


// cerrar session
router.get('/logout', (req, res) => {
    // borra la cookie
    res.clearCookie(config.jwt_cookie_name).redirect('home');
});


router.get('/restore/:jwt', validateTokenAndGetID, async(req, res) => {
    const id = req.id;
    const user = await UserService.getOne(id);
    const token = req.params.jwt;
    res.cookie('user', user).render('session/changepass');
})

router.post('/restore', async(req, res) => {
    const password = req.body?.password;
    if(!password) return res.render('session/changepass', { message: 'La contraseña no puede ser vacia'});
    const message = passwordFormatIsValid(password);
    if(Object.keys(message).length != 0) return res.render('session/changepass', { message: Object.values(message).join(' '), value: password });
    const user = req.cookies['user'];
    const passwordRepite = isValidPassword(user, password);
    if(passwordRepite) return res.render('session/changepass', { message: 'La contraseña no puede ser la misma', value: password});
    user.password = createHash(password);
    const result = await UserService.update(user._id, user);
    res.clearCookie('user').redirect('login');
});

router.get('/sendrestore', (req, res) => {
    res.render('session/restore');
})
router.post('/sendrestore', async (req, res) => {
    const email = req.body.email;
    const user = await UserService.getBy(email);

    if(!user) return res.render('session/restore', { message: 'User not register'})

    const jwt = generateToken(user._id);
    const result = await transport.sendMail({
        from: 'balartagustin@gmail.com',
        to: email,
        subject: 'Restore Password',
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f9fa;padding:24px" >
        <tbody>
            <tr>
                <td></td>
                <td width="600">
                    <table width="100%" cellspacing="0" style="padding:30px;background-color:#202c33;background-image: url('cid:bg.png'); background-size: fill;border:1px solid #cccccc">
                        <tbody style="background:#111b21;color:#fff;display:inline-block;min-width:80px;border-top:14px solid #009879;border-bottom:14px solid #009879;border-left:12px solid #009879;border-right:12px solid #009879">
                            <tr>
                                <td style="border-bottom:1px solid #cccccc;background-color: #009879">
                                    <p style="display: inline-block; border-radius: 5px;">
                                        <a style="text-decoration:none;color:#202c33;font-size: 28px">My Eccomerce <img style="display:inline;max-height:28px;width:auto" alt=""></a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:24px 24px 0 24px">
                                    <p>
                                        <a style="text-decoration:none;color:#cccccc">Hi ${user.first_name}</a>
                                    </p>
                                    <p>
                                        <a style="text-decoration:none;color:#cccccc"> We have received a password reset
                                            request for your account.</a>
                                    </p>
                                    <p>
                                        <a style="text-decoration:none;color:#cccccc">Click the button below to change your
                                            password.</a>
                                    </p>
                                    <p style="margin-bottom:0">
                                        <a style="text-decoration:none;color:#cccccc">Please note that this link is valid
                                            for 30 minutes only. Once the period has elapsed, you will have to request the
                                            reset of the password again.</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:16px 24px 0 24px">
                                    <a style="border:1px solid #cccccc;display:inline-block" href="http://127.0.0.1:8080/session/restore/${jwt}" target="_blank">
                                        <span
                                            style="background:#009879;color:#fff;display:inline-block;min-width:80px;border-top:14px solid #009879;border-bottom:14px solid #009879;border-left:12px solid #009879;border-right:12px solid #009879;text-align:center;text-decoration:none;white-space:nowrap;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;font-weight:700;line-height:1.2;letter-spacing:-0.2px">
                                            Change your password
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:24px 24px 0 24px">
                                    <p style="margin-bottom:0">
                                        <a style="text-decoration:none;color:#cccccc">If you were not the one who submitted
                                            the request,</a> <a target="_blank">please contact the support service.</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:48px 24px 0 24px">
                                    <p
                                        style="font-family:'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:12px;font-weight:400;line-height:1.4;color:#6a6f73;margin:0">
                                        My Eccommerce <a
                                            href="https://www.google.com/maps/search/600+Harrison+Street?entry=gmail&amp;source=g">600
                                            Harrison Street</a> , 3rd Floor, San Francisco, CA 94107. </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-bottom:1px solid #cccccc; padding:24px 0 0 0"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
        `,
       
    })

    res.render('session/mailsend');
})

export default router;