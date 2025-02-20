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
        password: {
            type: String,
            require: true
        },
        confirmedPassword: {
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
            type: String,
            require: true
        },
        movieSubGender: {
            type: String,
            require: true
        }, 
    },
    {timestamps: true}
    )
)

export default User