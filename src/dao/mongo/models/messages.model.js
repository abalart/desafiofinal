import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const msgCollections = "messages";

const messagesSchema = new mongoose.Schema({
    email: String,
    user: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});


messagesSchema.plugin(mongoosePaginate);
mongoose.set("strictQuery", false);
const msgModel = mongoose.model(msgCollections, messagesSchema);

export default msgModel;