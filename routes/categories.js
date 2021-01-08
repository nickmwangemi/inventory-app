const express = require('express')
const uuid = require('uuid')
const Category = require('../models/categoryModel')
const router = express.Router()

// @desc Fetch all categories
// @route GET api/v1/categories
// @access Public
router.get('/', async (req, res) => {
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
	await categoryToSave
		.save()
		.then(
			res.status(201).json({ msg: 'Category Created', Payload: categoryToSave })
		)
})

// @desc Fetch single category
// @route GET api/v1/categories/:id
// @access Public
router.get('/:id', async (req, res) => {
	const category = await Category.findOne({ _id: req.params.id }).then(
		console.log('\nCategory Fetched')
	)

	if (!category) {
		res.status(404).json({ msg: 'Category Not Found' })
	} else {
		res.json(category)
	}
})

// @desc Update a category
// @route GET api/v1/categories/:id
// @access Public
router.put('/:id', async (req, res) => {
	try {
		const found = await Category.findById(req.params.id)

		if (req.body.name === '' || req.body.email === '') {
			res.status(400).json({ msg: 'Please include a name and description' })
		} else {
			found.name = req.body.name
			found.description = req.body.description

			await found.save().then(
				res.status(200).json({
					msg: `Category with ID of ${req.params.id} Updated`,
					Payload: found,
				})
			)
		}

		// res.status(200).json({
		// 	msg: `Category with ID of ${req.params.id} Updated`,
		// 	Payload: found,
		// })
	} catch (error) {
		res
			.status(404)
			.json({ msg: `Category with ID of ${req.params.id} Not Found` })
	}
})

// @desc Delete a category
// @route DELETE api/v1/categories/:id
// @access Public
router.put('/', async (req, res) => {
	res.send('All categories')
})

module.exports = router
