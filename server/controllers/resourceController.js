import Resource from '../models/Resource.js';

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Public (for MVP, or Protected later)
export const createResource = async (req, res) => {
    try {
        const { title, description, semester, subject, type, link, contributorName } = req.body;

        // Basic validation
        if (!title || !semester || !subject || !type) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const resource = await Resource.create({
            title,
            description,
            semester,
            subject,
            type,
            link,
            contributorName
        });

        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get resources by class (semester & subject)
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res) => {
    try {
        const { semester, subject } = req.query;

        const query = {};
        if (semester) query.semester = semester;
        if (subject) query.subject = { $regex: subject, $options: 'i' }; // Case-insensitive search

        const resources = await Resource.find(query).sort({ createdAt: -1 });

        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
