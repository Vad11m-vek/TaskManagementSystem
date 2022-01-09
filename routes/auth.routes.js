const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const { jwtSecret } = require('../config/default.json')
const nodemailer = require('../config/nodemailer.config')

// /api/auth/register
router.post(
	'/register',
	[
		check('username', 'Введіть username').exists(),
		check('email', 'Некоректний емейл').isEmail(),
		check('password', 'мінімальна довжина пароля 6 символів').isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректні данні при реєстрації'
				})
			}
			const { username, email, password } = req.body
			if (!username) {
				return res.status(400).json({ message: 'Введіть username' })
			}
			const candidate = await User.findOne({ email })
			if (candidate) {
				return res.status(400).json({ message: 'Такий користувач вже існує' })
			}
			const token = jwt.sign({ email: req.body.email }, jwtSecret)
			const hachedPassword = await bcrypt.hash(password, 12)
			const user = new User({ username, email, password: hachedPassword, confirmationCode: +":" + token })
			await user.save()
			nodemailer.sendConfirmationEmail(
				user.username,
				user.email,
				user.confirmationCode
			)

			res.status(201).json({ message: "Користувач створений" })
		} catch (e) {
			res.status(500).json({ message: `Щось пішло не так, будь ласка спробуйте знову` })
		}
	})

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Введіть коректний email').normalizeEmail().isEmail(),
		check('password', 'Введіть пароль').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректні данні при вході в систему'
				})
			}
			const { username, email, password, confirmationCode, status } = req.body
			const user = await User.findOne()
			if (!user.username) {
				return res.status(400).json({ message: 'Користувач не знайдений' })
			}
			if (!user.email) {
				return res.status(400).json({ message: 'Користувач не знайдений' })
			}
			const idMatch = await bcrypt.compare(password, user.password)
			if (!idMatch) {
				return res.status(400).json({ message: "Не коректний пароль, спробуйте ще" })
			}
			if (user.status === "Active") {
				const token = jwt.sign(
					{ userId: user.id },
					config.get("jwtSecret"),
					{ expiresIn: '1h' }
				)
				return res.json({ token, userId: user.id, userStatus: user.status })
			}
			nodemailer.sendConfirmationEmail(
				user.username,
				user.email,
				user.confirmationCode
			)

			return res.status(401).send({
				message: "Pending Account. Please Verify Your Email!",
			})
		} catch (e) {
			res.status(500).json({ message: `${e} Щось пішло не так, будь ласка спробуйте знову ` })
		}
	})


// /api/auth/confirm
// router.post(
// 	'/confirm',
// 	[],
// 	async (req, res) => {
// 		try {
// 			await User.findOne({ confirmationCode: req.params.confirmationCode })
// 			if (!user) {
// 				return res.status(404).send({ message: "User Not found." })
// 			}
// 			user.status = "Active"
// 			const token = jwt.sign(
// 				{ userId: user.id },
// 				config.get("jwtSecret"),
// 				{ expiresIn: '1h' }
// 			)
// 			res.json({ token, userId: user.id })
// 			await user.findOneAndUpdate(confirmationCode)

// 		} catch (e) {
// 			res.status(500).json({ message: `${e} Щось пішло не так, будь ласка спробуйте знову ` })
// 		}
// 	})

module.exports = router