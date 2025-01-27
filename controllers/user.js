const conn = require("../controllers/conn.js");

const tableBill = "invoice_bill";

exports.listInvoiceUser = async (req, res) => {
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
          const formattedDate = `${String(date.getDate()).padStart(
            2,
            "0"
          )}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${date.getFullYear()}`;
          const formattedTime = `${String(date.getHours()).padStart(
            2,
            "0"
          )}:${String(date.getMinutes()).padStart(2, "0")}`;

          return {
            ...result,
            payment:
              result.payment === 1
                ? "เงินสด"
                : result.payment === 2
                ? "โอน"
                : result.payment === 3
                ? "แคชเชียเช็ค"
                : result.payment === 4
                ? "เช็คเงินสด"
                : "unknown",

            status:
              result.status === 1
                ? "wait"
                : result.status === 2
                ? "approve"
                : result.status === 3
                ? "disapprove"
                : "unknown",

            bill_update_at: `${formattedDate}, ${formattedTime}`,
          };
        });

        res.status(200).json({ results: mappedResults });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.createInvoice = async (req, res) => {
  const { user_id, description, payment, file } = req.body;

  try {
    conn.query(
      `INSERT INTO ${tableBill} (user_id, description, payment, filename, status, bill_create_at, bill_update_at) 
              VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [user_id, description, payment, file],
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
};
