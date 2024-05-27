import request from "supertest"
import { server } from "../../server"

describe("POST /api/products", () => {

  it("should display erros if data is missing", async () => {
    const response = await request(server).post("/api/products").send({})
    // console.log(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty("data")
    expect(response.body.errors).toHaveLength(4)
  })
  
  it("should that the price sent is a number and greater than 0", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({
        name: "Mouse testing",
        price: "Hola",
        available: true
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.status).not.toBe(404)
    expect(response.body.errors).toHaveLength(2)
    expect(response.body).not.toHaveProperty("data")
  })



  it("should create a product", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({
        name: "Mouse testing",
        price: 10,
        available: true
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("data")
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("GET /api/products", () => {

  

  it("should get all products", async () => {
    const response = await request(server).get("/api/products")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty("errors")
  })
})