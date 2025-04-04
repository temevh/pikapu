import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  console.log("Cleaning up existing data...");
  await prisma.post.deleteMany();
  await prisma.substitute.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.schoolCode.deleteMany();
  console.log("Cleanup complete");

  // Create subjects first
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: "Matematiikka",
      },
    }),
    prisma.subject.create({
      data: {
        name: "Fysiikka",
      },
    }),
    prisma.subject.create({
      data: {
        name: "Biologia",
      },
    }),
    prisma.subject.create({
      data: {
        name: "Kemia",
      },
    }),
  ]);

  // Create school codes
  const schoolCode = await prisma.schoolCode.create({
    data: {
      code: "1234567890",
    },
  });

  // Create users and their corresponding teacher/substitute records
  const users = await Promise.all([
    // Teacher 1
    prisma.user.create({
      data: {
        email: "matti.meikalainen@example.com",
        password: "password123",
        firstName: "Matti",
        lastName: "Meikäläinen",
        phoneNumber: "0401234567",
        teacher: {
          create: {},
        },
      },
      include: {
        teacher: true,
      },
    }),
    // Teacher 2
    prisma.user.create({
      data: {
        email: "liisa.virtanen@example.com",
        password: "password123",
        firstName: "Liisa",
        lastName: "Virtanen",
        phoneNumber: "0407654321",
        teacher: {
          create: {},
        },
      },
      include: {
        teacher: true,
      },
    }),
    // Substitute 1
    prisma.user.create({
      data: {
        email: "pekka.korhonen@example.com",
        password: "password123",
        firstName: "Pekka",
        lastName: "Korhonen",
        phoneNumber: "0401112222",
        substitute: {
          create: {
            schoolCodes: {
              connect: {
                id: schoolCode.id,
              },
            },
            subjects: {
              connect: [
                { id: subjects[0].id }, // Matematiikka
                { id: subjects[1].id }, // Fysiikka
              ],
            },
          },
        },
      },
      include: {
        substitute: true,
      },
    }),
    // Substitute 2
    prisma.user.create({
      data: {
        email: "anna.jarvinen@example.com",
        password: "password123",
        firstName: "Anna",
        lastName: "Järvinen",
        phoneNumber: "0403334444",
        substitute: {
          create: {
            schoolCodes: {
              connect: {
                id: schoolCode.id,
              },
            },
            subjects: {
              connect: [
                { id: subjects[2].id }, // Biologia
                { id: subjects[3].id }, // Kemia
              ],
            },
          },
        },
      },
      include: {
        substitute: true,
      },
    }),
  ]);

  // Extract teachers and substitutes for post creation
  const teachers = users.filter((u) => u.teacher).map((u) => u.teacher);
  const substitutes = users
    .filter((u) => u.substitute)
    .map((u) => u.substitute);

  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        subjectId: subjects[0].id, // Matematiikka
        content:
          "Tarvitsen sijaisopettajan matematiikan tunneille 8. ja 9. luokille. Tunnit ovat algebrasta ja geometriasta.",
        date: new Date("2024-03-15T08:00:00Z"),
        teacherId: teachers[0].id,
        filled: false,
      },
    }),
    prisma.post.create({
      data: {
        subjectId: subjects[2].id, // Biologia
        content:
          "Etsitään sijaisopettajaa biologian tunneille 10. luokalle. Aiheena on ekologia ja ympäristö.",
        date: new Date("2024-03-20T10:00:00Z"),
        teacherId: teachers[1].id,
        filled: true,
        primarySubstituteId: substitutes[1].id,
      },
    }),
    prisma.post.create({
      data: {
        subjectId: subjects[1].id, // Fysiikka
        content:
          "Tarvitsen sijaisopettajan fysiikan tunneille 7. luokalle. Tunnit käsittelevät mekaniikkaa.",
        date: new Date("2024-03-25T12:00:00Z"),
        teacherId: teachers[0].id,
        filled: false,
        secondarySubstitutes: {
          connect: [{ id: substitutes[0].id }, { id: substitutes[1].id }],
        },
      },
    }),
  ]);

  console.log("Seed data created successfully:");
  console.log("- Users:", users.length);
  console.log("- Teachers:", teachers.length);
  console.log("- Substitutes:", substitutes.length);
  console.log("- Subjects:", subjects.length);
  console.log("- School Codes:", 1);
  console.log("- Posts:", posts.length);
  console.log("Post IDs:");
  posts.forEach((post, index) => {
    console.log(`  Post ${index + 1}: ${post.id}`);
  });
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
