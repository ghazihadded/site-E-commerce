const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate-v2')

const productSchema= new mongoose.Schema({

    name:{
        type :String ,
        required:true,
        trim :true ,
        maxLength:[100,'Product name cannot exeed 100 character ']
    },
    price:{
        type :Number ,
        required:true,
        maxLength:[6],
        default:0.0
    },
    description :{
        type:String ,
        required:true,

    },
    ratings:{
        type:Number ,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String ,
                required :true ,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String ,
        required:[true,'please select category of this product'],
        enum :{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Food',
                'Books',
                'Accessories',
                'Headphones',
                'Clothes/Shoes',
                'Beauty/Healths',
                'Sports',
                'Outdoor',
                'Home'
            ],  
            message:'please select correct category for product'
        }
    },
    seller:{
        type:String ,
        required:[true,'please enter product seller']
    },
    stock:{
        type :Number ,
        required :[true,"please enter product stock"],
        maxlength:[5,'number of stock connot exeed 5 character'],
        default:0,
    },
    numOfRev:{
        type:Number,
        default:0,
    },
    reviews :[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
                default:0,
            },
            comment:{
                type:String,
                required :true,
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now,
    }

})

productSchema.plugin(mongoosePaginate);

module.exports= mongoose.model('Product',productSchema)