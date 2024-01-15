var express = require('express');
var router = express.Router();
const client = require('../gRPC_client')

router.post('/agregarVideo',  function(req, res) {
    const data_caso = {
        titulo : req.body.titulo,
        duracion : req.body.duracion,
        autor : req.body.autor,
        url : req.body.url,
    }
    
    client.AddVideo(data_caso, function(err, response) {
        res.status(200).json({mensaje: response.message})
    });
});

router.get('/listarVideos',  function(req, res) {
    const rows = [];

    const call = client.ListarVideos();
    call.on('data', function(data) {
        rows.push(data);
    });
    call.on('end', function() {
        console.log('Data obtenida con exito');
        res.status(200).json({data:rows});
    });
    call.on('error', function(e) {
        console.log('Error al obtener la data',e);
    });
    /*
    call.on('status', function(status) {
        // process status
    });
    */
});

module.exports = router;

