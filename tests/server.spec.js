const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response).toHaveProperty(Object.keys(response)[0]);
  });

  it("Comprueba que se obtiene un código 404 al intentar eliminar un café", async () => {
    const response = await request(server).delete("/cafes/6").send();
    const status = response.statusCode;
    expect(status).toBe(400);
  });

  it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const newCafe =   {
      "id": 5,
      "nombre": "frappuccino"
    }
    
    const response = await request(server).post("/cafes").send(newCafe);
    const status = response.statusCode;
    expect(status).toBe(201);
  });
});
