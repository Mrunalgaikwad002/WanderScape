import userModel from "../model/userSchema.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  // Optional check
  if (password !== cpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      cpassword // Saving as plain text
    });

    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default registerController;
