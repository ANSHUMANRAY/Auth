const userServices = require('../services/user');

const getAllUsers = async (_req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, email, password, role,
    } = req.body;
    const user = await userServices.createUser(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwt = await userServices.loginUser(email, password);
    res.status(200).json(jwt);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = await userServices.validateToken(token);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers, createUser, loginUser, validateToken,
};
