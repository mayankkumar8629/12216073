import express from "express";
import { urlShortner,redirectToOrginalUrl } from "../controllers/urlController.js";
import logger from "../../logging/index.js";

const router=express.Router();

router.post('/api/shorten',logger, urlShortner);
router.get('/:shortCode',logger, redirectToOrginalUrl);

export default router;