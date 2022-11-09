var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/db_ghichu')

const ghichuSchema=new mongoose.Schema(
    {
        tieude:'String',
        noidung:'String',
        anhdaidien:'String',
        trangthai:'String',
    });

const Ghichu=mongoose.model('Ghichu',ghichuSchema);
module.exports=Ghichu;