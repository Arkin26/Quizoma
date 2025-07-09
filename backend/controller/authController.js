const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// SIGN UP controller
const signUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, SECRET, { expiresIn: '2h' });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      userId: newUser._id,
      email: newUser.email, // ✅ include email in response
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// LOGIN controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      email: user.email, // ✅ include email in response
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export both
module.exports = { signUp, login };
