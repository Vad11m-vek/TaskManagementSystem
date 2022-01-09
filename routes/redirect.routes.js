const { Router } = require("express")
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/default.json')
const config = require('config')


router.get("/:confirmationCode", async (req, res) => {
	try {
		console.log('redirect')
		const user = await User.findOne({ confirmationCode: req.params.confirmationCode })

		if (!user) {
			return res.status(404).send({ message: "User Not found." })
		}
		const userStatus = user.status = "Active"
		await User.findOneAndUpdate({ status: "Active" })
		const token = jwt.sign(
			{ userId: user.id },
			config.get("jwtSecret"),
			{ expiresIn: '1h' }
		)
		return res.json({ token, userId: user.id, userStatus })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: `${e} Щось пішло не так, будь ласка спробуйте знову ` })
	}
})
module.exports = router