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


describe("GET /api/products/:id", () => {
  it("should return a 404 status for a product that does not exist", async () => {
    const productId = 2000
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(404)
  })

  it("should check if the id is a number", async () => {
    const productId = "Hola"
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(400)
  })

  it("should get a product", async () => {
    const productId = 1
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("PUT /api/products/:id", () => {
  it("should return validation error messages if data is wrong typed", async () => {
    const productId = 1
    const response = await request(server)
      .patch(`/api/products/${productId}`)
      .send({
        name: "Mouse testing",
        price: "Hola",
        available: true
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.status).not.toBe(404)
    expect(response.body.errors).toHaveLength(1)
  })

  it("should update a product", async () => {
    const productId = 1
    const response = await request(server)
      .patch(`/api/products/${productId}`)
      .send({
        name: "Mouse testing",
        price: 10,
        available: true
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("DELETE /api/products/:id", () => {

  it("should check if the id is a number", async () => {
    const productId = "Hola"
    const response = await request(server).delete(`/api/products/${productId}`)
    expect(response.status).toBe(400)
  })

  it("should return a 404 status for a product that does not exist", async () => {
    const productId = 2000
    const response = await request(server).delete(`/api/products/${productId}`)
    expect(response.status).toBe(404)
  })

  it("should delete a product", async () => {
    const productId = 1
    const response = await request(server).delete(`/api/products/${productId}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })
})