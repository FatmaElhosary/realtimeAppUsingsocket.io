const router=require('express').Router();
const controller=require('../controller/index');

router.get('/',controller.home);


module.exports=router;