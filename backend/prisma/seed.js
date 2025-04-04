import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to generate a random hash
function generateHash() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function main() {
  // Create teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: "Matti Meikäläinen",
        email: "matti.meikalainen@example.com",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Liisa Virtanen",
        email: "liisa.virtanen@example.com",
      },
    }),
  ]);

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

  // Create substitutes
  const substitutes = await Promise.all([
    prisma.substitute.create({
      data: {
        email: "pekka.korhonen@example.com",
        password: "password123",
        firstName: "Pekka",
        lastName: "Korhonen",
        phoneNumber: "0401112222",
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
    }),
    prisma.substitute.create({
      data: {
        email: "anna.jarvinen@example.com",
        password: "password123",
        firstName: "Anna",
        lastName: "Järvinen",
        phoneNumber: "0403334444",
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
    }),
  ]);

  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Matematiikan sijaisopettaja etsitään",
        subject: "Matematiikka",
        content:
          "Tarvitsen sijaisopettajan matematiikan tunneille 8. ja 9. luokille. Tunnit ovat algebrasta ja geometriasta.",
        date: new Date("2024-03-15T08:00:00Z"),
        teacherId: teachers[0].id,
        filled: false,
        hash: generateHash(),
      },
    }),
    prisma.post.create({
      data: {
        title: "Biologian sijaisopettaja etsitään",
        subject: "Biologia",
        content:
          "Etsitään sijaisopettajaa biologian tunneille 10. luokalle. Aiheena on ekologia ja ympäristö.",
        date: new Date("2024-03-20T10:00:00Z"),
        teacherId: teachers[1].id,
        filled: true,
        substituteId: substitutes[1].id,
        hash: generateHash(),
      },
    }),
    prisma.post.create({
      data: {
        title: "Fysiikan sijaisopettaja etsitään",
        subject: "Fysiikka",
        content:
          "Tarvitsen sijaisopettajan fysiikan tunneille 7. luokalle. Tunnit käsittelevät mekaniikkaa.",
        date: new Date("2024-03-25T12:00:00Z"),
        teacherId: teachers[0].id,
        filled: false,
        hash: generateHash(),
      },
    }),
  ]);

  console.log("Seed data created successfully:");
  console.log("- Teachers:", teachers.length);
  console.log("- Subjects:", subjects.length);
  console.log("- School Codes:", 1);
  console.log("- Substitutes:", substitutes.length);
  console.log("- Posts:", posts.length);
  console.log("Post hashes:");
  posts.forEach((post, index) => {
    console.log(`  Post ${index + 1}: ${post.hash}`);
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
