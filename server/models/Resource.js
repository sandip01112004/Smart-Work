import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    // Class Info
    semester: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8'] // Assuming 4-year course, can be adjusted
    },
    subject: {
        type: String,
        required: true,
        index: true
    },
    chapter: {
        type: String,
        trim: true
    },
    concept: {
        type: String,
        trim: true
    },
    // Resource Details
    type: {
        type: String,
        required: true,
        enum: ['pdf', 'video', 'website', 'text', 'image', 'other'],
        default: 'other'
    },
    link: {
        type: String,
        trim: true
    },
    textContent: {
        type: String, // For 'text' type resources
        trim: true
    },
    // Contributor Details
    contributorName: {
        type: String,
        default: 'Anonymous'
    },
    contributorId: {
        type: String, // Optional: Link to a User firebaseUid if they are a registered user
        index: true
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
