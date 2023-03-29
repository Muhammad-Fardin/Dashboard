import KPI from "../models/KPI.js"
import express from "express";

const router = express.Router();

router.get("/kpis", async(req, res) => {
     try {
          const kpis = await KPI.find();
          res.status(200).json(kpis)
     } catch (error) {
          res.status(400).json({success: false, message: 'something went wrong'})
     }
})

export default router;