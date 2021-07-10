const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://user:pass@sample-hostname:27017/dbname?retryWrites=true&w=majority";

const insertOneUser = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    const userSchema = new mongoose.Schema({
      name: { type: String },
      id: { type: Number, unique: true },
      image: Buffer,
    });

    const UserModel = mongoose.model("user", userSchema);

    const response = await UserModel.create({
      name: "Bikram",
      id: 1,
      image: fs.readFileSync("uploads/bird.jpeg"),
    });

    console.log(response);
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
};

insertOneUser();
