const Property = require('../models/Property');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
        host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const createProperty = async (req, res) => {
    const { title, description, price, address, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
    try {
        const property = new Property({
            title,
            description,
            price,
            address,
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges,
            owner: req.user._id,
        });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'firstName lastName email phoneNumber');
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        Object.assign(property, req.body);
        await property.save();
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await Property.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Property removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likeProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        property.likes += 1;
        await property.save();
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const interestInProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'firstName lastName email phoneNumber');
        const buyer = req.user;

        // Send email to buyer
        const mailOptionsBuyer = {
            from: process.env.EMAIL_USER,
            to: buyer.email,
            subject: 'Property Interest - Rentify',
            text: `Hi! You have shown interest in the property: ${property.title}. Owner details: ${property.owner.firstName} ${property.owner.lastName}, Email: ${property.owner.email}, Phone: ${property.owner.phoneNumber}`,
        };
        await transporter.sendMail(mailOptionsBuyer);

        // Send email to seller
        const mailOptionsSeller = {
            from: process.env.EMAIL_USER,
            to: property.owner.email,
           
            subject: 'New Interest in Your Property - Rentify',
            text: `Hi! Buyer ${buyer.firstName} ${buyer.lastName} has shown interest in your property: ${property.title}. Buyer details: Email: ${buyer.email}, Phone: ${buyer.phoneNumber}`,
        };
        // console.log(`property.owner.email`,property.owner.email);
        // console.log(`buyer.email`,buyer.email);
        await transporter.sendMail(mailOptionsSeller);

        res.status(200).json({ message: 'Interest email sent to both parties' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProperty, getProperties, updateProperty, deleteProperty, likeProperty, interestInProperty };
