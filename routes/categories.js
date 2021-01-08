const express = require('express')
const router = express.Router()

// @desc Fetch all categories
// @route GET api/v1/categories
// @access Public
router.get('/', function (req, res) {
	res.send('All categories')
})

// @desc Fetch single category
// @route GET api/v1/categories/:id
// @access Public
router.get('/', function (req, res) {
	res.send('All categories')
})

// @desc Create a new category
// @route POST api/v1/categories
// @access Public
router.post('/', function (req, res) {
	res.send('All categories')
})

// @desc Update a category
// @route GET api/v1/categories/:id
// @access Public
router.put('/', function (req, res) {
	res.send('All categories')
})

// @desc Delete a category
// @route DELETE api/v1/categories/:id
// @access Public
router.put('/', function (req, res) {
	res.send('All categories')
})

module.exports = router
