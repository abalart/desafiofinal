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


/* io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('post', async data =>{
        try {
            const generatedProd = new prodModel(data);
            await generatedProd.save();
    
            io.emit('post', prodModel.find().lean().exec())
        } catch (error) {
            console.log('ERROR: ', error);
        }
    })
    socket.on('delete', async data =>{
        try {

            const result = await prodModel.deleteOne({id: data})
            io.emit('delete', await prodModel.find().lean().exec())
        } catch (error) {
            console.log('ERROR: ', error);
        }
    })
}) */

export default router;
