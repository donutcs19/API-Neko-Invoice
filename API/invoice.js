const conn = require("../Controller/conn");
const tableUser = "invoice_users";
const tableBill = "invoice_bill";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";

module.exports = {
  deleteBill: async (req, res) => {
    const { id } = req.body;

    try {
      conn.query(
        `SELECT status FROM ${tableBill} WHERE bill_id = ?`,
        [id],
        (error, results) => {
          if (error) {
            return res.status(400).send({ error: error.message });
          }

          const statusNow = results[0].status;

          if (statusNow != "1") {
            return res
              .status(200)
              .send({ message: "ไม่สามารถลบรายการซ้ำได้!!!" });
          } else if (statusNow == "1") {
            conn.query(
              `UPDATE ${tableBill} SET status = '4', bill_update_at = CURRENT_TIMESTAMP WHERE bill_id = ?`,
              [id],
              (error) => {
                if (error) {
                  return res.status(400).send({ error: error.message });
                }
                return res.status(200).send({ message: "ลบรายการสำเร็จ!!!" });
              }
            );
          }
          return res.status(200).send({ message: "สถานะไม่ถูกต้อง!!!" })
        }
      );
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },
};
