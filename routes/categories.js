const express = require('express')
const uuid = require('uuid')
const Category = require('../models/categoryModel')
const router = express.Router()

// @desc Fetch all categories
// @route GET /categories
// @access Public
router.get('/', async (req, res) => {
	const categories = await Category.find({})

	res.render('categories', {
		title: 'Inventory App',
		categories: categories,
	})
})

// @desc Create a new category
// @route POST /categories
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
// @route GET /categories/:id
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.id)
		const categories = await Category.find({})

		if (!category) {
			res
				.status(404)
				.json({ msg: `Category with ID of ${req.params.id} Not Found` })
		} else {
			// res.status(200).json({ msg: 'Category Fetched!', Payload: category })
			res.render('categoryDetail', {
				title: 'Inventory App',
				category: category,
				categories: categories,
			})
		}
	} catch (error) {
		res
			.status(404)
			.json({ msg: `Category with ID of ${req.params.id} Not Found` })
	}
})

// @desc Update a category
// @route PUT /categories/:id
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
	} catch (error) {
		res
			.status(404)
			.json({ msg: `Category with ID of ${req.params.id} Not Found` })
	}
})

// @desc Delete a category
// @route DELETE /categories/:id
// @access Public
router.delete('/:id', async (req, res) => {
	const { id } = req.params
	try {
		const found = await Category.findById(id)

		if (found) {
			await Category.deleteOne(found).then(res.redirect('/categories'))
		}
		res.json({ msg: `Category with ID of ${req.params.id} Not Found` })
	} catch {
		res.status(400)
		res.json({ error: `Bad Request` })
	}
})

module.exports = router
