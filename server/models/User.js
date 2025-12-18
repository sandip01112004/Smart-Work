import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
