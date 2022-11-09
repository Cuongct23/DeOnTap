const Ghichu = require('../models/ghichu.model')
const fs = require("fs");
var mylibs = require('../libs/myLibs');
exports.getListGhiChu = async (req, res, next) => {
    console.log(req.params)
    var listGhiChu = await Ghichu.find();
    res.render('./ghichu/List', {listGhiChu: listGhiChu});
}

exports.postSearch = async (req, res, next) => {
    let tieude = req.body.tieude1;
    if (tieude.length != 0) {
        let listGhiChu = await Ghichu.find({tieude: tieude});
        res.render('./ghichu/List', {listGhiChu: listGhiChu});
    } else {
        let listGhiChu = await Ghichu.find({tieude: {$regex: tieude, $options: 'i'}});
        res.render('./ghichu/List', {listGhiChu: listGhiChu});


    }

}
exports.postSortList = async (req, res) => {
    let listGhiChu = await Ghichu.find().sort({'tieude': 1});
    res.render('./ghichu/List', {listGhiChu: listGhiChu, title: 'Danh sách',});
};
exports.getAddGhiChu = (req, res, next) => {
    res.render('./ghichu/Add');
}
exports.postAddGhiChu = (req, res, next) => {
    console.log(req.body);
    if (req.body.tieude.length == 0 && req.body.noidung.length == 0 && req.body.anhdaidien.length == 0) {
        return res.send("Dữ liệu không được để trống");
    }
    let objGhiChu = new Ghichu(
        {
            tieude: req.body.tieude,
            noidung: req.body.noidung,
            anhdaidien: req.body.anhdaidien,
            trangthai: req.body.trangthai,
        }
    );
    objGhiChu.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Ghi dữ liệu thành công")
        }
    })
    console.log(req.file)
    res.redirect('/ghichus/List')
}
exports.getUpdateGhiChu = async (req, res, next) => {
    console.log(req.params)
    let itemmGhiChu = await Ghichu.findById(req.params.id)
        .exec()
        .catch((err) => {
            if (err) {
                console.log(err)
            }
        });
    console.log(itemmGhiChu)
    if (itemmGhiChu == null) {
        res.render("Không tìm thấy bản ghi");
    }
    res.render('./ghichu/Update', {itemmGhiChu: itemmGhiChu});
}
exports.postUpdateGhiChu = async (req, res, next) => {
    console.log(req.body)
    let diekien = {
        _id: req.params.id
    }
    let dulieu = {
        tieude: req.body.tieude,
        noidung: req.body.noidung,
        anhdaidien: req.body.anhdaidien,
        trangthai: req.body.trangthai,
    }
    await Ghichu.updateOne(diekien, dulieu)
        .catch((err) => {
            if (err) {
                res.send("Lỗi cập nhật" + err.message)
                console.log(err)
            }
        })
    res.redirect('/ghichus/List');
}
exports.getDeleteGhichu = async (req, res, next) => {
    console.log(req.params)
    let itemmGhiChu = await Ghichu.findById(req.params.id)
        .exec()
        .catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    console.log(itemmGhiChu)
    if (itemmGhiChu == null) {
        res.send("Không tìm thấy bản ghi")
    }
    res.render('./ghichu/Delete', {itemmGhiChu: itemmGhiChu});
}
exports.postDeleteGhiChu = (req, res, next) => {
    console.log(req.body)
    let dieukien = {
        _id: req.params.id
    }
    Ghichu.deleteOne(dieukien, (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.redirect('/ghichus/List');

}
exports.getUpdateStatus = async (req, res, next) => {
    console.log(req.params)
    let itemmGhiChu = await Ghichu.findById(req.params.id)
        .exec()
        .catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    console.log(itemmGhiChu)
    if (itemmGhiChu == null) {
        res.send("Không tìm thấy bản ghi")
    }
    res.render('./ghichu/UpdateStatus', {itemmGhiChu: itemmGhiChu})
}
exports.postUpdateStatus = async (req, res, next) => {
    console.log(req.body)
    let dieukien = {
        _id: req.params.id
    }
    let dulieu = {
        trangthai: req.body.trangthai,
    }
    await Ghichu.updateOne(dieukien, dulieu)
        .catch((err) => {
            if (err) {
                console.log("Lỗi cập nhật" + err.message)
                console.log(err)
            }
        })
    res.redirect('/ghichus/List');

}