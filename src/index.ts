import dotenv from "dotenv";
import { server } from "./server";

dotenv.config();

console.log(process.env.MY_VAR1);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
