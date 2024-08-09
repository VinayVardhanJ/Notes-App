import mongoose from "mongoose";
import app from "./app";
import env from "./utility/validEnv";

const Port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION)
.then(() => {
        console.log("Connection to DataBase is Formed");
        app.listen(Port, () => {
            console.log(`Server started and Connected to Port: ${Port}`)
        })
    }
)
.catch(
   () =>  console.log("Connection to DataBase Failed")
);