const { Router } = require("express");
const {
  dealerForm,
  acceptRequest,
  denieRequest,
  getDealerRequests,
} = require("../controllers/dealer.controller");

const router = Router();

router.get("/getDealerRequests", getDealerRequests);
router.post("/dealerForm", dealerForm);
router.put("/acceptRequest", acceptRequest);
router.delete("/denieRequest", denieRequest);

module.exports = router;
