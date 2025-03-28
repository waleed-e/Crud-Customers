const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/user/add.html',userController.createUser)
router.get('/',userController.getAllUsers)
router.get('/user/:id',userController.oneUser)

router.get('/edit/:id',userController.updateOneUser)




module.exports = router