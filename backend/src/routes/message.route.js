import e from "express";
const router = e.Router();
router.get("/send", (req, res) => {
  res.send("Send message endpoint");
});

export default router;
