import { MessageService } from "../../repository/index.js";

export const chat = async(req,res)=>{
    const messages = await MessageService.getAll();

    req.io.on('connection', socket => {
        req.logger.info('new cliente connected');
    
        socket.on('messagein', async data => {
            const messageGenerated = await MessageService.create(data);
            req.logger.info(messageGenerated);
    
            messages.push(data)
            req.io.emit('messageout', messages)
        })
    })

    res.render('chat', {
        style: 'chat.css'
    })
} 