import User from '../models/User.js';
import Resource from '../models/Resource.js';

// @desc    Save a bookmark
// @route   POST /api/bookmarks
// @access  Protected (Needs userId)
export const addBookmark = async (req, res) => {
    try {
        const { userId, resourceId } = req.body;

        if (!userId || !resourceId) {
            return res.status(400).json({ message: 'User ID and Resource ID are required' });
        }

        const resource = await Resource.findById(resourceId);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        const user = await User.findOne({ firebaseUid: userId });

        if (!user) {
            // Create user if not exists (Lazy creation)
            // For MVP, we might want to create it here if it doesn't exist
            const newUser = await User.create({
                firebaseUid: userId,
                email: `user_${userId}@example.com`, // Placeholder if we don't have email here
                name: 'User',
                bookmarks: [resourceId]
            });
            return res.status(200).json({ message: 'Bookmark added', bookmarks: newUser.bookmarks });
        }

        if (user.bookmarks.includes(resourceId)) {
            return res.status(400).json({ message: 'Resource already bookmarked' });
        }

        user.bookmarks.push(resourceId);
        await user.save();

        res.status(200).json({ message: 'Bookmark added', bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get bookmarks for a user
// @route   GET /api/bookmarks/:userId
// @access  Protected
export const getBookmarks = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ firebaseUid: userId }).populate('bookmarks');

        if (!user) {
            return res.status(200).json([]); // Return empty if user doesn't exist yet
        }

        res.status(200).json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:resourceId
// @access  Protected
export const removeBookmark = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const { userId } = req.body; // We need userId to know whose bookmark to remove

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.bookmarks = user.bookmarks.filter(id => id.toString() !== resourceId);
        await user.save();

        res.status(200).json({ message: 'Bookmark removed', bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
