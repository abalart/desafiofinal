import { Router } from 'express';
import prodModel from '../dao/mongo/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await prodModel.find().lean().exec();

        req.io.on('connection', socket => {
            console.log('new Client Connected');
            socket.on('updateProducts', async data => {
                const productAdded = await prodModel.create(data);
                console.log(productAdded);
                socket.emit('realtimeProducts', await prodModel.find().lean().exec());
            })

            socket.on('deleteProducts', async data => {
                const productdel = await prodModel.findByIdAndDelete(data.id);
                console.log(productdel);
                socket.emit('realtimeProducts', await prodModel.find().lean().exec());
            })
        })

        res.render('realTimeProducts', {
            style: 'realTimeProducts.css',
            data: products
        })
    } catch (error) {
        console.log("Error: ", error);
    }
})


export default router;
