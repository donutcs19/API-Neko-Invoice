const conn = require("../Controller/conn.js");
require('dotenv').config();
const CryptoJS = require("crypto-js");

const tableUser = "invoice_users";
const tableBill = "invoice_bill";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";

module.exports = {
  
  listInvoiceAdmin: async (req, res) => {
    const {id} = req.params;
   
    try {
      conn.query(
        `SELECT * FROM ${tableBill} INNER JOIN ${tableUser } ON ${tableUser}.id = ${tableBill}.user_id WHERE organize = ? AND status != '4'`,
        [id],
        (error, results) => {
          if (error) {
            return res.status(400).send({error: e.message});
           
          }

          

          return res.status(200).send({ data: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  listInvoiceDelete: async (req, res) => {
    try {
      conn.query(
        `SELECT bill_id, description, payment, file, bill_create_at, bill_update_at, full_name, position, organize, status FROM ${tableBill} INNER JOIN ${tableUser} ON ${tableBill}.user_id = ${tableUser}.id WHERE organize = '2' AND status ='4'`,
        (error, results) => {
          if (error) {
            return res.status(400).send({error: e.message});
          }
          res.status(200).json({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },


  listUser: async (req, res) => {
    const { org } = req.body; 
    try {
      conn.query(
        `SELECT * FROM ${tableUser}  WHERE organize = ? `,
        [org],
        (error, results) => {
          if (error) {
            return res.status(400).send();
          }
          res.status(200).json({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  
  listDelete: async (req, res) => {
    const { org } = req.body; 
    try {
      conn.query(
        `SELECT bill_id, description, payment, file, bill_create_at, bill_update_at, full_name, position, organize, status FROM ${tableBill} INNER JOIN ${tableUser}  ON ${tableBill}.user_id = ${tableUser}.id WHERE organize = ? AND status ='4'`,
        [org],
        (error, results) => {
          if (error) {
            return res.status(400).send();
          }
          res.status(200).json({ results: results });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  updateStatus: async (req, res) => {
    const {id, status} = req.body;
    try {
      conn.query(
        `UPDATE ${tableBill} SET status = ? , bill_update_at = CURRENT_TIMESTAMP WHERE bill_id = ?`,
        [status, id],
        (error, results) => {
          if (error) {
            return res.status(400).send();
          }
          res.status(200).send({ message: "status updated" });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  updateRole: async (req, res) => {
    const {id, urole} = req.body;
    try {
      conn.query(
        `UPDATE ${tableUser} SET urole = ? , user_update_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [urole, id],
        (error) => {
          if (error) {
            return res.status(400).send();
          }
          res.status(200).send({ message: "urole updated" });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  disableUser: async (req, res) => {
    const {id} = req.params;
    try {
      conn.query(
        `UPDATE ${tableUser} SET urole = '3' , user_update_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [id],
        (error) => {
          if (error) {
            return res.status(400).send();
          }
          res.status(200).send({ message: "disable updated" });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

};
