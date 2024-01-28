import express from "express";
import { create, edit, getProducersData, hardDelete, showAll } from "./components/controller";

const router = express.Router();

router.get("/", showAll);

router.get("/estatisticas", getProducersData);

router.post("/", create);

router.put("/:id", edit);

router.delete("/:id", hardDelete);

export default router;
