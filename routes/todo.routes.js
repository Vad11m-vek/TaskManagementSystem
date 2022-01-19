const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const User = require('../models/User')


router.get('/todos', (req, res) => {
	Todo.find({}, 'action')
		.then(data => res.json(data));

});

router.post('/todos', async (req, res) => {
	const id = req.body.id
	const action = req.body.action
	await User.findOneAndUpdate({ _id: id }, { $push: { tasks: action } })
	if (req.body.action) {
		Todo.create(req.body)
			.then(data => res.json(data))
	} else {
		res.json({
			error: "The input field is empty"
		})
	}
});

router.delete('/todos/:id', (req, res, next) => {
	Todo.findOneAndDelete({ "_id": req.params.id })
		.then(data => res.json(data))
		.catch(next)
})

module.exports = router;