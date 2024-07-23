import express from 'express'
import { apply, login, logout, signin } from '../controllers/auth.controller.js';
import AppliedOppurtunity from '../models/applied.model.js';
import protectRoute from '../middleware/protectRoute.js';

const router=express.Router();

router.post("/signin",signin)
router.post("/login",login)
router.post("/logout",logout)
router.post("/apply",protectRoute,apply)
router.get("/applied-oppurtunities",protectRoute,async (req,res)=>{
    try {
      console.log(req.body);
       const appliedOppurtunities = await AppliedOppurtunity.find({userId:req.user.email})
       res.json(appliedOppurtunities)
    } catch (error) {
       res.status(500).send("Internal server error")
    }
   })
export default router;