const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const port = "3456";


const User = require("./API/user.js");
const Admin = require("./API/admin.js");
const SignIn = require("./API/signIn.js");
const Invoice = require("./API/invoice.js");




app.get("/", (req, res) => {
  res.send("Hello Neko Invoice");
});

app.get("/listInvoiceUser/:id", (req, res) => User.listInvoiceUser(req, res));
app.post("/createInvoice", (req, res) => User.createInvoice(req, res));

app.get("/listInvoiceAdmin/:org", (req, res) => Admin.listInvoiceAdmin(req, res));
app.get("/listInvoiceDelete/:org", (req, res) => Admin.listInvoiceDelete(req, res));
app.get("/listUser/:org", (req, res) => Admin.listUser(req, res));
app.get("/listDelete", (req, res) => Admin.listDelete(req, res));
app.put("/updateStatus", (req, res) => Admin.updateStatus(req, res));
app.put("/updateRole", (req, res) => Admin.updateRole(req, res));
app.put("/disableUser/:id", (req, res) => Admin.disableUser(req, res));

app.post("/createUser", (req, res) => SignIn.createUser(req, res));
app.put("/lastLogin", (req, res) => SignIn.lastLogin(req, res));
app.post("/checkUser", (req, res) => SignIn.checkUser(req, res));
app.get("/listOrganize", (req, res) => SignIn.listOrganize(req, res));
app.get("/listPosition", (req, res) => SignIn.listPosition(req, res));

app.put("/deleteBill", (req, res) => Invoice.deleteBill(req, res));


app.listen(port, () => {
    console.log(`Server -> http://localhost:${port}`);
})