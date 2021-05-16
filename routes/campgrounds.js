const express = require('express');
const router = express.Router();

// Cloudinary Image Upload
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


// Mongoose Models
const Campground = require('../models/campground');

// Middleware
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

// Controllers
const campgrounds = require('../controllers/campgrounds');

// Error Handling
const catchAsync = require('../utils/catchAsync');


// CRUD Routes
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,
        catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground,
        catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor,
        catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor,
    catchAsync(campgrounds.renderEditForm));

module.exports = router;