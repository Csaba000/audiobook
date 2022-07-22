import mongoose, { isObjectIdOrHexString } from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName:String,
    emailAddress:String,
    password:String
})
export default UserSchema;
