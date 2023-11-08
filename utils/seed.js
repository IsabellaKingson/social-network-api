const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { faker } = require("@faker-js/faker");

connection.on("error", (err) => err);

connection.on("open", async () => {
  console.log("connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  const users = [];
  const thoughts = [];

  const createThought = (username) => {
    const thoughtText = faker.lorem.sentences({ min: 1, max: 3 });
    const thought = {
      thoughtText,
      username,
    };
    thoughts.push(thought);
    return thought;
  };
  for (let i = 0; i < 20; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    createThought(username);
    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
