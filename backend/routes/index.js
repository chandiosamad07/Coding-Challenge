const { Router } = require("express")
const controllers = require("../controllers")
const router = Router()

router.get("/", (req,res) => res.send("This is the root!"))
router.post("/recipes", controllers.createItem)
router.get("/recipes", controllers.getAllItems)
router.get("/recipes/:id", controllers.getItemById)
router.put("/recipes/:id", controllers.updateItem)
router.delete("/recipes/:id", controllers.deleteItem)

module.exports = router;
