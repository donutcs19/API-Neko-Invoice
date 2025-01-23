const conn = require("../controllers/conn.js");
const CryptoJS = require("crypto-js");

const tableUser = "invoice_users";
const tableBill = "invoice_bill";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";

module.exports = {
  // listInvoiceUser: async (req, res) => {

  //   const { id } = req.params;

  //       try {
  //         conn.query(
  //           `SELECT * FROM ${tableBill} WHERE user_id = ? AND status != '4'`,
  //           [id],
  //           (error, results) => {
  //             if (error) {
  //               return res.status(400).send();
  //             }
  //             res.status(200).json({ results: results });
  //           }
  //         );
  //       } catch (error) {
  //         return res.status(500).send({ error: e.message });
  //       }
  //     },   

  listInvoiceUser: async (req, res) => {
    const { id } = req.params;
  
    try {
      conn.query(
        `SELECT bill_id, description, payment, filename, status, bill_update_at  FROM ${tableBill} WHERE user_id = ? AND status != '4'`,
        [id],
        (error, results) => {
          if (error) {
            return res.status(400).send();
          }
  
          
          const mappedResults = results.map((result) => {
          const date = new Date(result.bill_update_at);
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
          const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;


            return {
              ...result,
              payment: result.payment === 1
                ? 'เงินสด'
                : result.payment === 2
                ? 'โอน'
                : result.payment === 3
                ? 'แคชเชียเช็ค'
                : result.payment === 4
                ? 'เช็คเงินสด'
                : 'unknown',

              status: result.status === 1
                ? 'wait'
                : result.status === 2
                ? 'approve'
                : result.status === 3
                ? 'disapprove'
                : 'unknown',

                bill_update_at: `${formattedDate}, ${formattedTime}`,
            };
          });
  
          res.status(200).json({ results: mappedResults });
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  

      createInvoice: async (req, res) => {
        const {
          user_id,
          description,
          payment,
          filename,
          status,
          bill_create_at,
          bill_update_at,
        } = req.body;
    
        try {
          conn.query(
            `INSERT INTO ${tableBill} (user_id, description, payment, filename, status, bill_create_at, bill_update_at) 
                VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [
              user_id,
              description,
              payment,
              filename,
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