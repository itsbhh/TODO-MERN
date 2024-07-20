const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Add a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      
      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, isChecked } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body, isChecked }, { new: true });

    if (list) {
      res.status(200).json({ message: "Task updated", list });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findOneAndUpdate({ list: req.params.id }, { $pull: { list: req.params.id } });

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task or user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get tasks for a user
router.get("/getTasks/:id", async (req, res) => {
  try {
    const lists = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (lists.length > 0) {
      res.status(200).json({ list: lists });
    } else {
      res.status(200).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
