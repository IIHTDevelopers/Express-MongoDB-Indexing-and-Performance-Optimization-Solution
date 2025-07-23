const Hotel = require('../models/hotel');

// POST method to create a hotel
const createHotel = async (req, res) => {
    try {
        const { name, location, price, rooms, description } = req.body;

        const hotel = new Hotel({
            name,
            location,
            price,
            rooms,
            description
        });

        await hotel.save();
        res.status(201).json({ message: 'Hotel successfully added!', hotel });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Test query performance with single-field index
const testSingleFieldIndex = async (req, res) => {
    console.time('Single-field index query');
    const hotels = await Hotel.find({ location: 'California' });
    console.timeEnd('Single-field index query');
    res.status(200).json(hotels);
};

// Test query performance with compound index
const testCompoundIndex = async (req, res) => {
    console.time('Compound index query');
    const hotels = await Hotel.find({ location: 'California', price: { $lt: 300 } });
    console.timeEnd('Compound index query');
    res.status(200).json(hotels);
};

// Test query performance with text index
const testTextIndex = async (req, res) => {
    console.time('Text index query');
    const hotels = await Hotel.find({ $text: { $search: 'beachfront' } });
    console.timeEnd('Text index query');
    res.status(200).json(hotels);
};

// Test query performance with dynamic index (on 'price')
const testDynamicIndex = async (req, res) => {
    console.time('Dynamic index query');
    const hotels = await Hotel.find({ price: { $gt: 200 } });
    console.timeEnd('Dynamic index query');
    res.status(200).json(hotels);
};

module.exports = { createHotel, testSingleFieldIndex, testCompoundIndex, testTextIndex, testDynamicIndex };
