var express = require('express');
var router = express.Router();
var productosModel= require('./../../models/productosModel');


router.get('/', async function(req, res, next) {
    var productos = await productosModel.getProductos();

    res.render('admin/productos',{
        layout:'admin/layout',
        usuario: req.session.nombre,
        productos
       
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    const id= req.params.id;
    await productosModel.deleteProductosById(id);
    res.redirect('/admin/productos')
});

router.get('/agregar',(req, res, next) => {
    res.render('admin/agregar',{
        layout:'admin/layout'})
    });

    router.post('/agregar', async (req, res, next) => {
        try {
            if(req.body.productos!= "" && req.body.precio !="" ) {
                await productosModel.insertProductos(req.body);
                res.redirect('/admin/productos')
            } else {
                res.render('admin/agregar', {
                    layout:'admin/layout',
                    error: true,
                    message:'Todos los campos son requeridos'
                })  
                
            }
        } catch(error) {
            console.log(error)
            res.render('admin/agregar', {
                layout:'admin/layout',
                error: true,
                message:'no se cargo el producto'
            });   
        }
    }); 
        
    router.get('/modificar/:id', async (req, res, next)=> {
        var id= req.params.id;
        var productos = await productosModel.getProductosById(id);
    
        res.render('admin/modificar',{
            layout:'admin/layout',
            productos
           
        });
    });
        
    router.post('/modificar', async (req, res, next) => {
        try {
            var obj = {
                productos: req.body.productos,
                precio: req.body.precio
            }
            console.log(obj)
            await productosModel.modificarProductosByid(obj, req.body.id);
            res.redirect('/admin/productos');
        } catch(error) {
            console.log(error)
            res.render('admin/modificar', {
                layout:'admin/layout',
                error: true,
                message:'no se modifico producto'
            })   
        }

        });
        
module.exports = router;
