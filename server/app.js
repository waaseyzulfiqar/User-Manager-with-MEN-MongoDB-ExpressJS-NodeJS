import express from "express";
import { userModel } from "./Models/usersSchema.js";
import { dbConnection } from "./DB/db.js";
import cors from "cors";

const app = express();
const PORT = 4211;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is working😊')
})

// create new user

app.post("/createUser", async (req, res) => {
  try {
    if (req.body) {
      const createdUser = await userModel.create(req.body);
      res.send(createdUser);
    }
  } catch (error) {
    res.json({
      message: `${error.message} || "Oops😕 Something went wrong!"`,
    });
  }
});

// get all users

app.get("/getAllUser", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    res.json({
      message: `${error.message} || "Oops😕 Something went wrong!"`,
    });
  }
});

// update any user

app.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body);
    res.send(updatedUser);
  } catch (error) {
    res.json({
      message: `${error.message} || "Oops😕 Something went wrong!"`,
    });
  }
});

// delete user

app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.send(deletedUser);
  } catch (error) {
    res.json({
      message: `${error.message} || "Oops😕 Something went wrong!"`,
    });
  }
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

// db connection
dbConnection();
