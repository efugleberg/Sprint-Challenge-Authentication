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

  describe("add()", () => {
    it("should insert user into db", async () => {
      await Users.add({ username: "chris", password: "goalie" });
      const users = await db("users");

      expect(users).toHaveLength(1);
    });
    it("should insert user into db", async () => {
      const users = await Users.add({ username: "chris", password: "goalie" });

      expect(users.username).toBe("chris");
    });
  });
});
