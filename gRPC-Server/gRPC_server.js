var PROTO_PATH = './proto/demo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

/* Conexion a la base de datos */
const mysqlConnection = require('./mysql_connection');

function AddVideo(call, callback) {
  const query = 'INSERT INTO videos(titulo,duracion,autor,url) VALUES (' +
    '\'' + call.request.titulo + '\',' +
    '\'' + call.request.duracion + '\',' +
    '\'' +call.request.autor + '\',' +
    '\'' + call.request.url + '\');';

  mysqlConnection.query(query, function (err, rows, fields) {
    if (err) throw err;
    callback(null, { message: 'Dato de video insertado insertado en la base de datos' });
  });
}

function ListarVideos(call) {
  const query = 'SELECT titulo,duracion,autor,url FROM videos;';

  mysqlConnection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for (const data of rows) {
      //console.log(data);
      call.write(data);
    }
    call.end();
  });

}

function main() {
  var server = new grpc.Server();
  server.addService(demo_proto.Videos.service, {
    AddVideo: AddVideo,
    ListarVideos: ListarVideos
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server on port 50051')
  });
}

main();
