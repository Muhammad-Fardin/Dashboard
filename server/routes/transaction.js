import Transaction from "../models/Transaction.js"
import express from "express";

const router = express.Router();

router.get("/transactions", async(req, res) => {
     try {
          const transactions = await Transaction.find().limit(50).sort({createdOm: -1});
          res.status(200).json(transactions)
     } catch (error) {
          res.status(400).json({success: false, message: "something went wrong"})
     }
})

export default router;