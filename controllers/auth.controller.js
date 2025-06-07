import { prisma } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await prisma.user.findFirst({
    where: { name: name },
  });
  const hashedPassword = bcrypt.hashSync(password, salt);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "El nombre de usuario ya está en uso." });
  }

  const registrationDate = new Date();
  const result = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      confirm_password: hashedPassword,
      registrationDate: registrationDate,
    },
  });

  return res.status(200).send(result);
};

const login = async (req, res) => {
  const { name, password } = req.body;

  const validUser = await prisma.user.findFirst({
    where: {
      name, // Use the name to locate the user
    },
  });

  if (!validUser) {
    return res.status(400).send("Invalid username or password");
  }

  const validPassword = bcrypt.compareSync(password, validUser.password);

  if (!validPassword) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    {
      id: validUser.id,
      name: validUser.name,
      role: validUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.json(token);
};

export {
  register,
  login
}
