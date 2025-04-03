import prisma from "../services/prismaClient.js";

async function main() {
  // Create a default teacher if it doesn't exist
  const defaultTeacher = await prisma.teacher.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "default@teacher.com",
      name: "Default Teacher",
    },
  });

  console.log({ defaultTeacher });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
