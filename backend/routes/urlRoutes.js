import express from "express";
import { urlShortner,redirectToOrginalUrl } from "../controllers/urlController.js";

const router=express.Router();

router.post('/api/shorten', urlShortner);
router.get('/:shortCode', redirectToOrginalUrl);

export default router;