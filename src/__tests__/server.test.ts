import request from "supertest";
import { server } from "../server";

describe("GET /api", () => {
  it("should return back a response in json format", async () => {
    const response = await request(server).get("/api");
  
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ msg: "API running" });
    expect(response.status).not.toBe(404)
    expect(response.body.msg).not.toBe("from api")
  })

})