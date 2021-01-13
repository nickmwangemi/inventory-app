const express = require('express')
const router = express.Router()

// @desc Fetch all categories
// @route GET  /items
// @access Public
router.get('/', (req, res) => {
	const items = ['Item 1', 'Item 2']

	res.render('items', {
		title: 'Inventory App',
		items: items,
	})
})

// @desc Show Item Form
// @route GET /items/new
// @access Public
router.get('/new', (req, res) => {
	res.render('createItem', {
		title: 'Inventory App',
	})
})

// @desc Create a new item
// @route POST /items
// @access Public
router.post('/new', (req, res) => {
	const item = {
		id: 1,
		name: 'Item1',
	}
	res.redirect('/items')
})

module.exports = router
