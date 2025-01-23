const conn = require("../controllers/conn");
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
  
          if (results.length === 0) {
            return res.status(404).send({ message: "ไม่พบรายการ! โปรดตรวจสอบข้อมูล" });
          }
  
          const statusNow = results[0].status;
  
          if (statusNow != "1") {
            return res
              .status(400)
              .send({ message: "ไม่สามารถลบรายการที่ผ่านการพิจารณาแล้วได้!!!" });
          }
  
          conn.query(
            `UPDATE ${tableBill} SET status = '4', bill_update_at = CURRENT_TIMESTAMP WHERE bill_id = ?`,
            [id],
            (updateError) => {
              if (updateError) {
                return res.status(400).send({ error: updateError.message });
              }
              return res.status(200).send({ message: "ดำเนินการสำเร็จ" });
            }
          );
        }
      );
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  
};
