const express = require('express')
const uuid = require('uuid')
const Category = require('../models/categoryModel')
const router = express.Router()

// @desc Fetch all categories
// @route GET api/v1/categories
// @access Public
router.get('/', async function (req, res) {
	const categories = await Category.find({})
	res.status(200).json({ msg: 'Categories Fetched!', Payload: categories })
})

// @desc Create a new category
// @route POST api/v1/categories
// @access Public
router.post('/', async (req, res) => {
	const { name, description } = req.body

	const categoryToSave = new Category({
		id: uuid.v4(),
		name,
		description,
	})

	if (!categoryToSave.name || !categoryToSave.description) {
		res.status(400).json({ msg: 'Please include a name and description' })
	}
	await categoryToSave.save().then(console.log('Saved'))

	res.status(201).json({ msg: 'Category Created', Payload: categoryToSave })
})

// @desc Fetch single category
// @route GET api/v1/categories/:id
// @access Public
router.get('/', function (req, res) {
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
