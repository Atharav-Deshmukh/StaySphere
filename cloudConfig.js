const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration for Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API_Key,
    api_secret: process.env.Cloud_API_Secret
});


// Configure the storage engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Pass the configured cloudinary object
    params: {
      folder: 'Wanderlust_DEV', // Specify the folder in your Cloudinary account
      allowedFormats: ["png", "jpg", "jpeg"] // Define allowed file types
    },
});


module.exports = {
    cloudinary, 
    storage // Export the storage engine to be used by multer
};