import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../services/prismaClient.js";

export const register = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, schoolCode } =
    req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  //const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newSub = await prisma.substitute.create({
      data: {
        email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        schoolCode: schoolCode,
        phoneNumber: phoneNumber,
      },
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("user data", email, password);

  const user = await prisma.substitute.findUnique({ where: { email } });
  /* 
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  */

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, user: { email: user.email } });
};
