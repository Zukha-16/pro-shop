import bcrypt from "bcryptjs";

const users = [
  {
    name: "Zukhriddin Mekhrullaev",
    email: "zukhriddin853@gmail.com",
    password: bcrypt.hashSync("password", 12),
    isAdmin: true,
  },
  {
    name: "Zukha",
    email: "zukha@gmail.com",
    password: bcrypt.hashSync("password", 12),
  },
  {
    name: "Angelina",
    email: "angelina@gmail.com",
    password: bcrypt.hashSync("password", 12),
  },
];

export default users;
