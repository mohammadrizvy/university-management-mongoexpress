import express from 'express'


const router = express.Router()

router.get("/")
router.get("/:adminId")
router.patch("/:adminId")
router.delete("/:adminId")

export const adminRoutes = router; 