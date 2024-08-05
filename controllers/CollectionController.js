const Collection = require('../models/collection');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, 'uploads/images');
		} else if (file.mimetype.startsWith('audio/')) {
			cb(null, 'uploads/audio');
		} else {
			cb(
				{ message: 'This file is neither an image nor audio file.' },
				false
			);
		}
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});

const upload = multer({ storage: storage });

const getAllCollection = async (req, res) => {
	try {
		const collections = await Collection.find();
		res.status(200).json({
			status: true,
			message: 'OK',
			data: collections,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: false,
			message: 'An error occurred while fetching collections.',
			error: error.message,
		});
	}
};

const findCollectionById = async (req, res) => {
	try {
		const { id } = req.params;
		const collection = await Collection.findById(id);

		if (!collection) {
			return res.status(404).json({
				status: false,
				message: 'Collection not found',
			});
		}

		res.status(200).json({
			status: true,
			message: 'OK',
			data: collection,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: 'An error occurred while fetching the collection.',
			error: error.message,
		});
	}
};

const createCollection = async (req, res) => {
	try {
		const IMAGE = '/uploads/images/';
		const AUDIO = '/uploads/audio/';

		const image_url = IMAGE + req.files['image'][0].filename;
		const audio_url_id = AUDIO + req.files['audio_id'][0].filename;
		const audio_url_en = AUDIO + req.files['audio_en'][0].filename;
		const audio_url_sasak = AUDIO + req.files['audio_sasak'][0].filename;

		const { image, audio_id, audio_en, audio_sasak, ...rest } = req.body;
		const newCollection = new Collection({
			...rest,
			image_url,
			audio_url_id,
			audio_url_en,
			audio_url_sasak,
		});

		await newCollection.save();
		res.status(201).json({
			status: true,
			message: 'Created',
			data: newCollection,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: false,
			message: 'An error occurred while creating collection.',
			error: error.message,
		});
	}
};

const updateCollection = async (req, res) => {
	try {
		const { id } = req.params;
		let existingCollection = await Collection.findById(id);
		if (!existingCollection) {
			return res.status(404).json({
				status: false,
				message: 'Collection not found.',
			});
		}

		const IMAGE = '/uploads/images/';
		const AUDIO = '/uploads/audio/';

		const { image, audio_id, audio_en, audio_sasak, ...rest } = req.body;
		await Collection.findByIdAndUpdate(id, {
			...rest,
		});

		const promises = [];

		if (req.files && req.files['image']) {
			promises.push(
				Collection.findByIdAndUpdate(id, {
					image_url: IMAGE + req.files['image'][0].filename,
				})
			);
		}

		if (req.files && req.files['audio_id']) {
			promises.push(
				Collection.findByIdAndUpdate(id, {
					audio_url_id: AUDIO + req.files['audio_id'][0].filename,
				})
			);
		}

		if (req.files && req.files['audio_en']) {
			promises.push(
				Collection.findByIdAndUpdate(id, {
					audio_url_en: AUDIO + req.files['audio_en'][0].filename,
				})
			);
		}

		if (req.files && req.files['audio_sasak']) {
			promises.push(
				Collection.findByIdAndUpdate(id, {
					audio_url_sasak:
						AUDIO + req.files['audio_sasak'][0].filename,
				})
			);
		}

		await Promise.all(promises);

		res.status(200).json({
			status: true,
			message: 'Collection updated successfully.',
			data: existingCollection,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: 'An error occurred while updating collection.',
			error: error.message,
		});
	}
};

const deleteCollection = async (req, res) => {
	try {
		const { id } = req.params; // Assuming id is passed in the URL params

		// Find the collection by ID and delete it
		const deletedCollection = await Collection.findByIdAndDelete(id);

		if (!deletedCollection) {
			return res.status(404).json({
				status: false,
				message: 'Collection not found.',
			});
		}

		res.status(200).json({
			status: true,
			message: 'Collection deleted successfully.',
			data: deletedCollection,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: 'An error occurred while deleting collection.',
			error: error.message,
		});
	}
};

module.exports = {
	getAllCollection,
	createCollection,
	upload,
	findCollectionById,
	updateCollection,
	deleteCollection,
};
