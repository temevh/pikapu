import prisma from "../services/prismaClient.js";

export const getsubs = async (req, res) => {
  const { selectedSubject, selectedDate } = req.body;

  if (!selectedSubject || !selectedDate) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const substitutes = await prisma.substitute.findMany({
      where: {
        subjects: {
          some: {
            name: selectedSubject,
          },
        },
      },
      include: {
        subjects: true,
      },
    });

    res.status(200).json({ substitutes, message: "Subs fetched" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching substitutes" });
  }
};
