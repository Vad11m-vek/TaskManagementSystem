const { Schema, model } = require('mongoose')

//Todo Schema

const TodoSchema = new Schema({
	action: {
		type: String,
		required: ['true', 'The todo text field is required']
	},
	// action: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: "User"
	// }]
});



module.exports = model('Todo', TodoSchema);




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TodoSchema = new Schema({
// 	title: { type: String, required: true },
// 	description: { type: String, required: true },
// 	isDone: { type: Boolean, default: false },
// 	priority: { type: Number, required: true },
// 	dueDate: { type: Date, required: true }
// });

// const Todo = mongoose.model('todo', TodoSchema);

// module.exports = Todo;