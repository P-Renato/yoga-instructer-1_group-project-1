import { Router } from "express";
import { getListOfMes, getOneMes, deleteMes, addMessage } from "../controllers/messages";

const router = Router();

router.get("/all", getListOfMes);
router.get(":mesId", getOneMes);


router.post("/add", addMessage);
// make a route to reply message of customer here


router.delete(":mesId", deleteMes);

export default router;
