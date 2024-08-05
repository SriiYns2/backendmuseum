const {
	getAllCollection,
	createCollection,
	upload,
	findCollectionById,
	updateCollection,
	deleteCollection,
} = require('../controllers/CollectionController');

const router = require('express').Router();
const authenticate = require('../middleware/authenticate');

router.get('/', getAllCollection);
router.post(
	'/',
	authenticate,
	upload.fields([
		{ name: 'image' },
		{ name: 'audio_id' },
		{ name: 'audio_en' },
		{ name: 'audio_sasak' },
	]),
	createCollection
);
router.get('/:id', findCollectionById);
router.put(
	'/:id',
	authenticate,
	upload.fields([
		{ name: 'image' },
		{ name: 'audio_id' },
		{ name: 'audio_en' },
		{ name: 'audio_sasak' },
	]),
	updateCollection
);

router.delete('/:id', authenticate, deleteCollection);

module.exports = router;
