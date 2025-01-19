const conn = require("../Controller/conn.js");
const CryptoJS = require("crypto-js");

const tableUser = "invoice_users";
const tableBill = "invoice_bill";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";

module.exports = {
  listInvoiceUser: async (req, res) => {

    const { id } = req.params;

        try {
          conn.query(
            `SELECT * FROM ${tableBill} WHERE user_id = ? AND status != '4'`,
            [id],
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

      createInvoice: async (req, res) => {
        const {
          user_id,
          description,
          payment,
          file,
          status,
          bill_create_at,
          bill_update_at,
        } = req.body;
    
        try {
          conn.query(
            `INSERT INTO ${tableBill} (user_id, description, payment, file, status, bill_create_at, bill_update_at) 
                VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [
              user_id,
              description,
              payment,
              file,
              status,
              bill_create_at,
              bill_update_at,
            ],
            (error) => {
              if (error) {
                return res.status(400).send({ error: error.message });
              }
              return res.status(200).json({ message: "Invoice created" });
            }
          );
        } catch (error) {
          return res.status(500).send({ error: error.message });
        }
      },
}