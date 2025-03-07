import express, { json } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const PORT = 4211;

let users = [];

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create new user

app.post("/createUser", (req, res) => {
  if (req.body) {
    users.push({ ...req.body, _id: uuidv4() });
  }
  res.send(users);
});

// get all users

app.get("/getAllUser", (req, res) => {
  res.send(users);
});

// update any user

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  users = users.map((user) =>
    user._id === id ? { ...user, ...req.body } : user
  );
  res.send(users);
});


// delete user

app.post("/delete/:id", (req, res) => {
    const id = req.params.id

    const index = users.findIndex((user) => user._id == id)
    
    users.splice(index, 1)
    res.send('done')
})

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
