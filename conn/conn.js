const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://anandbhawna40:0e2atqaobov6WSB2@cluster0.6e8jllh.mongodb.net/"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    res.status(400).json({
      message: "Not Connected",
    });
  }
};
conn();
