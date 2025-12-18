import express from 'express';
import { addBookmark, getBookmarks, removeBookmark } from '../controllers/bookmarkController.js';

const router = express.Router();

router.post('/', addBookmark);
router.get('/:userId', getBookmarks);
router.delete('/:resourceId', removeBookmark);

export default router;
