import mongoose from "mongoose";

const ConnectToDatabase = async (user, pwd) => {
  const URL = `mongodb+srv://${user}:${pwd}@dhaujia-cluster.kbhbhvo.mongodb.net/?retryWrites=true&w=majority&appName=Dhaujia-Cluster`;

  //using async as it returns promise
  try {
    await mongoose.connect(URL);
    console.log("Connected to database succcessully");
  } catch (e) {
    //DB Connection error handling
    console.log("Error in connecting to Database ! >>", e);
  }
};

export default ConnectToDatabase;
