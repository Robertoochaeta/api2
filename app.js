const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reportes'
});
// mysql://bdccc7c876e756:b10f0e81@us-cdbr-east-04.cleardb.com/heroku_d1ed4da642176b6?reconnect=true

// Route
app.get('/', (req, res) => {
  res.send('Bienvenido a mi API!');
});

// Todos los usuarios
app.get('/usuarios',(req,res)=>{
const sql = 'SELECT * FROM usuarios';
connection.query(sql,(err,results)=>{
  if(err) throw error;
  if(results.length>0){
    res.json(results);
  }else{
    res.send('No hay resultado')
  }
})

});
app.get('/usuarios/:id',(req,res)=>{

  const {id}=req.params
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`;
connection.query(sql,(err,result)=>{
  if(err) throw error;
  if(result.length>0){
    res.json(result);
  }else{
    res.send('No hay resultado')
  }
})
})

app.post('/add',(req,res)=>{
  const sql ='INSERT INTO usuarios SET ?';

  const usuariosObj={
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    Direccion:req.body.Direccion,
    puesto:req.body.puesto
  };
  connection.query(sql,usuariosObj,error=>{
    if(error) throw error;
    res.send('Usuario Creado');
  });
});
app.put('/update/:id',  (req,res)=>{
  const {id}=req.params;
  const {nombre,apellido,Direccion,puesto}=req.body;
  const sql= `UPDATE usuarios SET nombre = '${nombre}',apellido='${apellido}', Direccion='${Direccion}', puesto='${puesto}'
   where id=${id}`;
  connection.query(sql,error=>{
    if(error) throw error;
    res.send('Usuario Actualizado');
  });

});
app.delete('/delete/:id',(req,res)=>{
const {id}=req.params;
const sql = `DELETE FROM usuarios where id=${id}`;
connection.query(sql,error=>{
  if(error) throw error;
  res.send('Usuario Eliminado');
});
})
// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));