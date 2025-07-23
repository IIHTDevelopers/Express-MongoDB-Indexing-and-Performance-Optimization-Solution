const mongoose = require('mongoose');

// Define the schema for the Hotel model
const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
    description: { type: String }  // For text search
}, { timestamps: true });

// 1. Single-Field Index (e.g., on 'location')
hotelSchema.index({ location: 1 });  // Index on location field for fast search

// 2. Compound Index (e.g., on 'location' and 'price')
hotelSchema.index({ location: 1, price: 1 });  // Compound index for location and price

// 3. Text Index (e.g., on 'name' and 'description')
hotelSchema.index({ name: 'text', description: 'text' });  // Text search index on name and description

// Function to create a dynamic index if needed
const createDynamicIndex = async (field) => {
    // Only create index if it doesn't exist
    const existingIndexes = await mongoose.connection.db.listCollections({ name: 'hotels' }).toArray();

    // Check if indexes are already created, and create only if needed
    if (existingIndexes.length > 0) {
        const indexes = await mongoose.connection.db.collection('hotels').indexes();
        const indexExists = indexes.some(idx => idx.name === field);
        if (!indexExists) {
            await mongoose.connection.db.collection('hotels').createIndex({ [field]: 1 });
            console.log(`Dynamic index created for field: ${field}`);
        }
    }
};

// Ensure dynamic index creation after connection is established
mongoose.connection.on('connected', () => {
    createDynamicIndex('price');  // Example: dynamically create an index on 'price'
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
