const db = require("../database/dbConfig.js");

const request = require("supertest");
const server = require("../api/server.js");

const Users = require("./usersModel.js");

describe("users model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("db environment set to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  //// TWO POST REQUESTS FOR REGISTER
  describe("add()", () => {
    it("should insert user into db", async () => {
      await Users.add({ username: "chris", password: "goalie" });
      const users = await db("users");

      expect(users).toHaveLength(1);
    });

    it("should provide username of chris", async () => {
      const users = await Users.add({ username: "chris", password: "goalie" });

      expect(users.username).toBe("chris");
    });
  });

  //// 1 GET REQUEST
  describe("get dad jokes", () => {
    it("should return 404 for unauthorized request", () => {
      return request(server)
        .post("/jokes")
        .set("Authorization", "incorrectToken")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  //// LOGIN REQUESTS
  describe("add()", () => {
    it("should insert user into db", async () => {
      await Users.add({ username: "chris", password: "goalie" });
      const users = await db("users");
      await request(server)
        .post('/api/login')
        .send({ username: "chris", password: "goalie" })
        .expect(401)
    });
  });
});
