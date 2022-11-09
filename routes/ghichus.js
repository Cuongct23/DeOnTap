var express=require('express');
var router=express.Router();
var multer=require('multer');
const ghichucontroller=require('../controllers/ghichu.controller')
router.get('/List',ghichucontroller.getListGhiChu);
router.post('/List',ghichucontroller.postSortList);
// router.post('/List',ghichucontroller.postSearch);

var uploader=multer({dest:'./tmp/'});
router.get('/Add',ghichucontroller.getAddGhiChu);
router.post('/Add',ghichucontroller.postAddGhiChu);

router.get('/Update/:id',ghichucontroller.getUpdateGhiChu);
router.post('/Update/:id',ghichucontroller.postUpdateGhiChu);

router.get('/UpdateStatus/:id',ghichucontroller.getUpdateStatus);
router.post('/UpdateStatus/:id',ghichucontroller.postUpdateStatus);

router.get('/Delete/:id',ghichucontroller.getDeleteGhichu);
router.post('/Delete/:id',ghichucontroller.postDeleteGhiChu);


module.exports=router;