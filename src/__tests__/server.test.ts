import { connectDB } from "../server";
import { db } from "../config/db";

jest.mock("../config/db")

describe("connectDB", () => {
  it("should handle connection errors", async () => {
    jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Connection error"));

    const consoleSpy = jest.spyOn(console, "log");

    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching("Something went wrong when connecting to the database."))
  })
})