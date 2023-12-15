const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));

// Connection
mongoose
	.connect('mongodb://127.0.0.1:27017/practice-app-1')
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(() => {
		console.log('Connection failed!');
	});

// Schema
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		jobTitle: {
			type: String,
		},
		gender: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// Model
const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
	const allDbUsers = await User.find({});
	console.log(allDbUsers);
	const html = `

		<!DOCTYPE html>
		<html>
			<head>
				<title>Users</title>
			</head>
			<body>
				<h1>Users</h1>
				<ul>
					${allDbUsers
						.map(
							(user) =>
								`<li><a href="/users/${user._id}">${user.firstName} ${user.lastName}</a></li>`
						)
						.join('')}
				</ul>
			</body>
		</html>
	`;
	res.send(html);
});

// REST API
app.get('/api/users', (req, res) => {
	User.find().then((documents) => {
		res.status(200).json({
			message: 'Users fetched successfully!',
			users: documents,
		});
	});
});

app
	.route('/api/users/:id')
	.get(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found!',
			});
		}
		return res.status(200).json({
			message: 'User fetched successfully!',
			user: user,
		});
	})
	.patch(async (req, res) => {
		await User.findByIdAndUpdate(req.params.id, { lastName: 'Changed' });
		return res.json({
			status: 'Success',
		});
	})
	.delete(async (req, res) => {
		await User.findByIdAndDelete(req.params.id);
		return res.json({
			status: 'Success',
		});
	});

app.post('/api/users/', async (req, res) => {
	const body = req.body;
	if (
		!body ||
		!body.first_name ||
		!body.email ||
		!body.last_name ||
		!body.gender ||
		!body.job_title
	) {
		return res.status(400).json({
			message: 'Invalid body!',
		});
	}

	const result = await User.create({
		firstName: body.first_name,
		lastName: body.last_name,
		email: body.email,
		gender: body.gender,
		jobTitle: body.job_title,
	});
	console.log(result);
	return res.status(200).json({ msg: 'success' });
});

app.listen(8080, () => {
	console.log('Example app listening on port 8080!');
});
