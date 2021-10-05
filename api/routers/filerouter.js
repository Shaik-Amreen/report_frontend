const express = require("express");
var router = express.Router();

const file = require('../controllers/file')
const users=require('../controllers/users.Controller')


router.post('/savefile',file.savefile)
router.post('/fetchroll',file.fetchroll)
router.post('/fetchrollsection',file.fetchrollsection)
router.post('/uploadsubjects',file.uploadsubjects)
router.post('/uploadelectives',file.uploadelectives)
router.post('/uploadmarks',file.uploadmarks)
router.post('/uploadassignment',file.saveassignment)
router.post('/uploadlabmarks',file.uploadlabmarks)
router.post('/saveco',file.saveco)
router.post('/savecoques',file.savecoques)
router.post('/fetchdata',file.fetchdata)
router.post('/feedback',file.savefeedback)
router.post('/getsubjects',file.getsubjects)
router.post('/studentfeedback',file.savestudentfeedback)

router.post('/signup',users.createAdminUsers)
router.post('/activesignup',users.checkRole)
router.post('/login',users.findoneUsers)
router.post('/forgotpassword',users.forgotpassword)
router.post('/changepassword',users.updateoneUsers)
module.exports = router;
