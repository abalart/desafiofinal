import { Router } from 'express';

const router= Router();

router.get('/', (req, res) =>{
    req.logger.error('error ' + req.errored);
    req.logger.warning('warning ' + req.rawHeaders);
    req.logger.http('http ' + req.httpVersion);
    req.logger.debug('debug '+ req.header);
    req.logger.fatal('fatal ' + req.file);
    res.send('Warning!');
});

export default router;