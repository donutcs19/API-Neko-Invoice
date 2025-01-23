const conn = require("../controllers/conn.js");
const { listOrganize } = require("./user.js");
require("dotenv").config();

const tableUser = "invoice_users";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";
const tableRole = "invoice_role";

module.exports = {
  createUser: async (req, res) => {
    const {
      googleId,
      email,
      fullName,
      imageUrl,
      familyName,
      givenName,
      nickname,
      position,
      organize,
    } = req.body;

    try {
      conn.query(
        `INSERT INTO ${tableUser} (token, email, full_name, picture, first_name, last_name, nickname, position, organize, role, user_create_at, user_update_at, last_login) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [
          googleId,
          email,
          fullName,
          imageUrl,
          familyName,
          givenName,
          nickname,
          position,
          organize,
        ],
        (error) => {
          if (error) {
            return res.status(400).send({ error: error.message });
          }
          return res.status(200).json({ message: "user created" });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  listOrganize: async (req, res) => {
    try {
      conn.query(
        `SELECT id, organize FROM ${tableOrganize}`,
        (error, results) => {
          if (error) {
            return res.status(400).send({ error: error.message });
          }
          res.status(200).json({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  listPosition: async (req, res) => {
    try {
      conn.query(
        `SELECT id, position FROM ${tablePosition}`,
        (error, results) => {
          if (error) {
            return res.status(400).send({ error: error.message });
          }
          res.status(200).json({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  checkUser: async (req, res) => {
    try {
      const { token } = req.body;
      
      conn.query(
        `SELECT ${tableRole}.role, ${tableUser}.id FROM ${tableUser} INNER JOIN ${tableRole} ON ${tableUser}.role = ${tableRole}.id WHERE token = ?`,
        [token],
        (error, results) => {
          if (error) {
            return res.status(400).send({ error: error.message });
          }
        
          return res.status(200).send({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  lastLogin: async (req, res) => {

    const { id } = req.body;

      try {
        conn.query(
          `UPDATE ${tableUser} SET last_login = CURRENT_TIMESTAMP WHERE id = ?`,
          [id],
          (error) => {
            if (error) {
              return res.status(400).send();
            }
            res.status(200).json({ message: "lastLogin Updated" });
          }
        );
      } catch (error) {
        return res.status(500).send({ error: e.message });
      }
    },


  
};
