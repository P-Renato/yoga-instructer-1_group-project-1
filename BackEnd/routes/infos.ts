import { Router } from "express";
import { getListOfInfos, getOneInfo, addNewInfo, updateInfo, deleteInfo } from "../controllers/infos";

const router = Router();

router.get("/all", getListOfInfos);
router.get("/:infoId", getOneInfo);

router.post("/add", addNewInfo);

router.put("/:infoId", updateInfo);

router.delete("/:infoId", deleteInfo);

export default router;
