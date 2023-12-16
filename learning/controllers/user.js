const User = require('../models/user');

const handleGetAllUsers = async (req, res) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: 'Users fetched successfully!',
      users: documents,
    });
  });
};

const handleGetUserById = async (req, res) => {
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
};

const handleUpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: 'Changed' });
  return res.json({
    status: 'Success',
  });
};
const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    status: 'Success',
  });
};

const handleCreateNewUser = async (req, res) => {
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
  return res.status(200).json({ msg: 'success', id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
