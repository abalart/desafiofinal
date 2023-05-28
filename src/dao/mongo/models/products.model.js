import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array,
    owner: {
        role: { type: String, default: 'admin' },
        id:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }
});

productSchema.plugin(mongoosePaginate);
mongoose.set("strictQuery", false);
const prodModel = mongoose.model(productCollection, productSchema);

export default prodModel;