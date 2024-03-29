const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const cors = require('cors')




const app = express()
app.use(cors());
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/confirm', require('./routes/redirect.routes'))
app.use('/api', require('./routes/todo.routes.js'))

// if (process.env.NODE_ENV === 'production') {
// 	app.use("/", express.static(path.join(__dirname, 'client', 'build')))
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// 	})
// }

const PORT = config.get('port') || 5000

async function start() {
	try {
		await mongoose.connect(config.get('mongoUrl'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()