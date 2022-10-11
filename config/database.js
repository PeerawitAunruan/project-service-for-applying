const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      //useFindAndModify: false
    })
    .then(() => {
      console.log("connect Successfully");
    })
    .catch((err) => {
      console.log("error connect");
      console.log(err);
      process.exit(1);
    });
};
