import mongoose from "../../../database/database";

const {Schema} = mongoose

// model do usuário, define os campos do documento
const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            require: true
        },
        gender: {
            type: String,
            require: true
        }, 
        email: {
            type: String,
            require: true
        },
        birth: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        uid:{
            type: String
        },
        movieGender: {
            type: Array,
            require: false
        },
        movieSubGender: {
            type: Array,
            require: false
        }, 
        active: {
            type: Boolean,
            require: true,
            default: true
        }
    },
    {timestamps: true}
    )
)

export default User