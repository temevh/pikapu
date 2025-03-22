import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../services/prismaClient.js";

export const register = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, schoolCode } =
    req.body;

  console.log("adding user");

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !schoolCode
  ) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("flag 1");

    const newSub = await prisma.substitute.create({
      data: {
        email,
        password: password,
        firstName,
        lastName,
        phoneNumber,
        schoolCodes: {
          connect: [{ code: schoolCode }],
        },
      },
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }
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
