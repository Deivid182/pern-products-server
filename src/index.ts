import colors from "colors";
import { server } from "./server";
import "dotenv/config";

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(colors.blue.bold(`Server running on port ${port}`));
});