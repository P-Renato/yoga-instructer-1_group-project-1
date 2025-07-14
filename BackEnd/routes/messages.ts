import { Router } from "express";
import { getListOfMes, getOneMes, deleteMes } from "../controllers/messages";

const router = Router();

router.get("all", getListOfMes);
router.get(":mesId", getOneMes);

// make a route to reply message of customer here


router.delete(":mesId", deleteMes);

export default router;
