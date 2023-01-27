const request = require("supertest");
const server = require("../index");
const cafes = require("../cafes.json");

describe("Operaciones CRUD de cafes", () => {
  it("01 - Devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response).toHaveProperty(Object.keys(response)[0]);
  });

  it("02 - Comprueba que se obtiene un código 404 al intentar eliminar un café", async () => {
    const response = await request(server).delete("/cafes/6").send();
    const status = response.statusCode;
    expect(status).toBe(400);
  });

  it("03 - Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const newCafe = {
      id: 5,
      nombre: "frappuccino",
    };

    const response = await request(server).post("/cafes").send(newCafe);
    const status = response.statusCode;
    expect(status).toBe(201);
  });

  it("04 - Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const cafe = {
      id: 1,
      nombre: "frappuccino Venti",
    };

    const response = await request(server).put("/cafes/2").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
