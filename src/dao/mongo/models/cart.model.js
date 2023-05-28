import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
});

cartSchema.pre('find', function(){
    this.populate('products.id');
})
//cartSchema.plugin(mongoosePaginate);
mongoose.set("strictQuery", false);
const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;