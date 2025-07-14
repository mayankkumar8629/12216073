import mongoose from "mongoose";
const { Schema, model } = mongoose;

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                try {
                    const url = new URL(v);
                    return url.protocol === 'http:' || url.protocol === 'https:';
                } catch(error) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid HTTP/HTTPS URL!`
        }
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-z0-9_-]{4,20}$/i.test(v);
            },
            message: props => `${props.value} must be 4-20 chars (letters, numbers, _-)!`
        }
    },
    expiresAt: {  
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now  
    }
});  

const Url = model('Url', urlSchema);
export default Url;