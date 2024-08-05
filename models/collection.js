const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
	judul_id: { type: String, required: true },
	judul_en: { type: String, required: true },
	judul_sasak: { type: String, required: true },

	tahun: { type: Number, required: true },
	kategori: { type: String, required: true },
	tag: { type: [String], required: true },
	image_url: { type: String },

	deskripsi_en: { type: String },
	deskripsi_id: { type: String },
	deskripsi_sasak: { type: String },

	audio_url_id: { type: String },
	audio_url_en: { type: String },
	audio_url_sasak: { type: String },

	referensi: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);
