const conn = require("../controllers/conn.js");

const tableUser = "invoice_users";
const tableBill = "invoice_bill";
const tablePosition = "invoice_position";
const tableOrganize = "invoice_organize";
const tableRole = "invoice_role";
const tablePayment = "invoice_payment";
const tableStatus = "invoice_status";

exports.listInvoiceAdmin = async (req, res) => {
  const { org } = req.params;

  try {
    conn.query(
      `SELECT bill_id, nickname, ${tablePosition}.position, ${tableOrganize}.organize, description, filename, ${tablePayment}.payment, ${tableStatus}.status, bill_create_at, bill_update_at FROM ${tableBill} 
        INNER JOIN ${tableUser} ON ${tableUser}.id = ${tableBill}.user_id 
        INNER JOIN ${tablePosition} ON ${tableUser}.position = ${tablePosition}.id 
        INNER JOIN ${tableOrganize} ON ${tableUser}.organize = ${tableOrganize}.id 
        INNER JOIN ${tablePayment} ON ${tableBill}.payment = ${tablePayment}.id
        INNER JOIN ${tableStatus} ON ${tableBill}.status = ${tableStatus}.id
        WHERE ${tableUser}.organize = ? AND ${tableBill}.status != '4'`,
      [org],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }
        const mappedResults = results.map((result) => {
          const create = new Date(result.bill_create_at);
          const createDate = `${String(create.getDate()).padStart(
            2,
            "0"
          )}-${String(create.getMonth() + 1).padStart(
            2,
            "0"
          )}-${create.getFullYear()}`;
          const createTime = `${String(create.getHours()).padStart(
            2,
            "0"
          )}:${String(create.getMinutes()).padStart(2, "0")}`;

          const update = new Date(result.bill_update_at);
          const updateDate = `${String(update.getDate()).padStart(
            2,
            "0"
          )}-${String(update.getMonth() + 1).padStart(
            2,
            "0"
          )}-${update.getFullYear()}`;
          const updateTime = `${String(update.getHours()).padStart(
            2,
            "0"
          )}:${String(update.getMinutes()).padStart(2, "0")}`;

          return {
            ...result,
            bill_create_at: `${createDate}, ${createTime}`,
            bill_update_at: `${updateDate}, ${updateTime}`,
          };
        });

        return res.status(200).send({ results: mappedResults });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.listInvoiceDelete = async (req, res) => {
  const { org } = req.params;
  try {
    conn.query(
      `SELECT bill_id, full_name, ${tablePosition}.position, ${tableOrganize}.organize, description, filename, ${tablePayment}.payment, ${tableStatus}.status, bill_create_at, bill_update_at FROM ${tableBill} 
        INNER JOIN ${tableUser} ON ${tableUser}.id = ${tableBill}.user_id 
        INNER JOIN ${tablePosition} ON ${tableUser}.position = ${tablePosition}.id 
        INNER JOIN ${tableOrganize} ON ${tableUser}.organize = ${tableOrganize}.id 
        INNER JOIN ${tablePayment} ON ${tableBill}.payment = ${tablePayment}.id
        INNER JOIN ${tableStatus} ON ${tableBill}.status = ${tableStatus}.id    
        WHERE ${tableUser}.organize = ? AND ${tableBill}.status = '4'`,
      [org],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }

        const mappedResults = results.map((result) => {
          const create = new Date(result.bill_create_at);
          const createDate = `${String(create.getDate()).padStart(
            2,
            "0"
          )}-${String(create.getMonth() + 1).padStart(
            2,
            "0"
          )}-${create.getFullYear()}`;
          const createTime = `${String(create.getHours()).padStart(
            2,
            "0"
          )}:${String(create.getMinutes()).padStart(2, "0")}`;

          const update = new Date(result.bill_update_at);
          const updateDate = `${String(update.getDate()).padStart(
            2,
            "0"
          )}-${String(update.getMonth() + 1).padStart(
            2,
            "0"
          )}-${update.getFullYear()}`;
          const updateTime = `${String(update.getHours()).padStart(
            2,
            "0"
          )}:${String(update.getMinutes()).padStart(2, "0")}`;

          return {
            ...result,
            bill_create_at: `${createDate}, ${createTime}`,
            bill_update_at: `${updateDate}, ${updateTime}`,
          };
        });

        res.status(200).json({ results: mappedResults });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.listUser = async (req, res) => {
  const { org } = req.params;
  try {
    conn.query(
      `SELECT ${tableUser}.id, full_name, nickname, ${tablePosition}.position, ${tableOrganize}.organize, ${tableRole}.role, last_login, user_create_at, user_update_at FROM ${tableUser}  
        INNER JOIN ${tablePosition} ON ${tableUser}.position = ${tablePosition}.id 
        INNER JOIN ${tableOrganize} ON ${tableUser}.organize = ${tableOrganize}.id 
        INNER JOIN ${tableRole} ON ${tableUser}.role = ${tableRole}.id
        WHERE ${tableUser}.organize = ?`,
      [org],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }

        const mappedResults = results.map((result) => {
          const lastSigndate = new Date(result.last_login);
          const lastSignDate = `${String(lastSigndate.getDate()).padStart(
            2,
            "0"
          )}-${String(lastSigndate.getMonth() + 1).padStart(
            2,
            "0"
          )}-${lastSigndate.getFullYear()}`;
          const lastSignTime = `${String(lastSigndate.getHours()).padStart(
            2,
            "0"
          )}:${String(lastSigndate.getMinutes()).padStart(2, "0")}`;

          const create = new Date(result.user_create_at);
          const createDate = `${String(create.getDate()).padStart(
            2,
            "0"
          )}-${String(create.getMonth() + 1).padStart(
            2,
            "0"
          )}-${create.getFullYear()}`;
          const createTime = `${String(create.getHours()).padStart(
            2,
            "0"
          )}:${String(create.getMinutes()).padStart(2, "0")}`;

          const update = new Date(result.user_update_at);
          const updateDate = `${String(update.getDate()).padStart(
            2,
            "0"
          )}-${String(update.getMonth() + 1).padStart(
            2,
            "0"
          )}-${update.getFullYear()}`;
          const updateTime = `${String(update.getHours()).padStart(
            2,
            "0"
          )}:${String(update.getMinutes()).padStart(2, "0")}`;

          return {
            ...result,
            last_login: `${lastSignDate}, ${lastSignTime}`,
            user_create_at: `${createDate}, ${createTime}`,
            user_update_at: `${updateDate}, ${updateTime}`,
          };
        });

        res.status(200).json({ results: mappedResults });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;

  let statusNow;
  if (status === "approve") {
    statusNow = 2;
  } else if (status === "disapprove") {
    statusNow = 3;
  } else {
    statusNow = 1;
  }

  try {
    conn.query(
      `UPDATE ${tableBill} SET status = ? , bill_update_at = CURRENT_TIMESTAMP WHERE bill_id = ?`,
      [statusNow, id],
      (error, results) => {
        if (error) {
          return res.status(400).send();
        }
        res.status(200).send({ message: "status updated" });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  const { id, role } = req.body;
  let roleNow;
  if (role === "admin") {
    roleNow = 2;
  } else if (role === "user") {
    roleNow = 3;
  } else {
    roleNow = 1;
  }
  try {
    conn.query(
      `UPDATE ${tableUser} SET role = ? , user_update_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [role, id],
      (error) => {
        if (error) {
          return res.status(400).send();
        }
        res.status(200).send({ message: "role updated" });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// exports.disableUser = async(req, res) => {
//     const {id} = req.params;
//     try {
//       conn.query(
//         `UPDATE ${tableUser} SET role = '3' , user_update_at = CURRENT_TIMESTAMP WHERE id = ?`,
//         [id],
//         (error) => {
//           if (error) {
//             return res.status(400).send();
//           }
//           res.status(200).send({ message: "disable updated" });
//         }
//       );
//     } catch (error) {
//       return res.status(500).send({ error: error.message });
//     }
// };

exports.listStatus = async (req, res) => {
  try {
    conn.query(
      `SELECT id, status FROM ${tableStatus} WHERE id != 4`,
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }
        res.status(200).send({ results: results });
      }
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.listRole = async (req, res) => {
  try {
    conn.query(`SELECT id, role FROM ${tableRole}`, (error, results) => {
      if (error) {
        return res.status(400).send({ error: error.message });
      }
      res.status(200).send({ results: results });
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.addPosition = async (req, res) => {
  const { position } = req.body;

  try {
    conn.query(
      `SELECT position FROM ${tablePosition} WHERE position = ?`,
      [position],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .send({ message: "ไม่สามารถเพิ่มตำแหน่งซ้ำได้" });
        }

        conn.query(
          `INSERT INTO ${tablePosition} (position, create_at) 
            VALUES (?, CURRENT_TIMESTAMP)`,
          [position],
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
};

exports.addOrganize = async (req, res) => {
  const { organize } = req.body;

  try {
    conn.query(
      `SELECT organize FROM ${tableOrganize} WHERE organize = ?`,
      [organize],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .send({ message: "ไม่สามารถเพิ่มองค์กรซ้ำได้" });
        }

        conn.query(
          `INSERT INTO ${tableOrganize} (organize, create_at) 
            VALUES (?, CURRENT_TIMESTAMP)`,
          [organize],
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
};
