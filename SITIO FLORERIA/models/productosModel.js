const router = require('../routes');
var pool= require ('./bd');


async function getProductos (){
   
     var query ='select * from productos';
     var rows = await pool.query(query);
     return rows;
     
 };

 async function deleteProductosById (id){
   
    var query ='delete from productos where id =?';
    var rows = await pool.query(query, [id]);
    return rows;
    
};
 
async function insertProductos(obj){
    try{
        var query= "insert into productos set ?";
        var query= await pool.query(query, [obj])
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}    

async function getProductosById (id){
   
    var query ='select * from productos where id =?';
    var rows = await pool.query(query, [id]);
    return rows [0];
    
};
async function modificarProductosByid(obj, id){
    try{
        var query= "update into productos set ? where id=?";
        var query= await pool.query(query, [obj, id])
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}    
 module.exports= {getProductos, deleteProductosById, insertProductos, getProductosById, modificarProductosByid}