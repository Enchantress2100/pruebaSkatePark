//ejecutar npm's
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const admin = require("./public/admin"); //directorio de admins
//npm y middleware para subir imagenes al servidor
const expressFileUpload = require('express-fileupload')
app.use(expressFileUpload({
  limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'el peso de la imagen que ud quiere subir supera el limite permitido'
}))
//middleware de bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//registro de nuevos usuarios en la base de datos skaters
const createUsuarios = require('./createUsuarios')
//visualizar los usuarios
const getUsuarios = require('./getUsuarios')
//actualizacion de usuarios
const updateUsuarios = require('./updateUsuarios')
//eliminar usuarios
const eliminarUsuario = require('./eliminarUsuario')
//confirmar usuarios
const confirmarUsuario= require('./confirmarUsuario')

//puerto para levantar el servidor en Heroku
//const port = process.env.PORT || 5000;

//disponibilizar carpeta publica
app.use(express.static("public"));

//integrar handlebars como motos de plantillas
app.set("view engine", "handlebars");

//configurar el motor de plantilla con el metodo engine
app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes",
  })
);

//middleware para cargar las librerias de bootstrap y jquery
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/BootstrapJs", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));

//ruta para visualizar las tareas
app.get("/", async (req, res) => {
  const skaters = await getUsuarios();
  res.render("inicio", {
    layout: "inicio",
    skaters,
  });
});
app.get("/skaters", async (req, res) => {
  const respuesta = await getUsuarios();
  res.send(respuesta);
});

//ruta para crear nuevos skaters
//ruta Login
app.get("/login", (req, res) => {
  res.render("tareaLogin", {
    layout: "tareaLogin",
  });
});

app.get("/skater-create", async (req, res) => {
  res.render("agregar", {
    layout: "agregar",
  });
});

//subir la imagen y los nuevos datos
app.post("/skater-create", async(req, res) => {
  const { foto } = req.files
  const { name } = foto
  const { email, nombre, password, anos_experiencia, especialidad } =req.body;
  await createUsuarios(email, nombre, password, anos_experiencia, especialidad, name, 'TRUE');
  foto.mv(`${__dirname}/public/${name}`, (err) => {
    res.render('registroExitoso', {
      layout: 'registroExitoso'
    })
  })
})

//ruta para actualizar los datos
app.get("/skater-update", async (req, res) => {
    const skater = decoded.data;
    err
      ? res.status(401).send({
          error: "401 Unauthorized",
          message: err.message,
        })
      : res.render("loginExitoUsuario", {
          layout: "loginExitoUsuario",
          skater,
        });
});

app.post("/skater-update", async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad } = req.body;
  await updateUsuarios(email, nombre, password, anos_experiencia, especialidad);
  res.render("actualizar", {
    layout: "actualizar",
  });
});

//ruta para borrar registros
app.get("/skater-delete", async (req, res) => {
  const { email } = req.query;
  console.log('entre a eliminar')
  await eliminarUsuario(email);
    res.render("eliminar", {
      layout: "eliminar",
      email,
    });
});

//jsonwebtoken para admin y para usuarios
const jwt = require('jsonwebtoken')

//password del signature
const secretKey  = "Mi llave secreta";

//ruta admin y token para admin de acuerdo al documento admin.js
app.get('/SignIn', async (req, res) => {
  const skaters = await getUsuarios();
  const { contraseña } = req.query
  const admins = admin.find((a) => a.contraseña == contraseña);
  if (admins) {
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 120, data: admins }, secretKey);
    console.log(`<script>sessionStorage.setItem('token', JSON.stringify('${token}'))</script>`)
      res.render('admin', {
        layout: 'admin',
        skaters
      });
  }
})

//ruta login para el usuario
app.get('/skater-login', async (req, res) => {
  const { email, password } = req.query
  const skaters = await getUsuarios()
  const user = skaters.find((d) => d.email == email && d.password == password);
  if (user) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 120,
      data: user}, secretKey);
    res.send(`<script>alert("Credenciales correctas. Ahora podrás cambiar tus datos");window.location.href = "/Dashboard?token=${token}"</script>`);
  } else {
    res.status(401).send(
    `<script>alert("Credenciales erróneas"); window.location.href = "/"</script>`
    );
  }
})
  //disponibilizar ruta restringida para los usuarios autorizados. En caso contrario devolver mensaje de error y su descripcion (estado HTTP)
  app.get('/Dashboard', (req, res) => {
    const { token } = req.query
    jwt.verify(token, secretKey, (err, decoded) => {
      const skater = decoded.data
      err
        ? res.status(401).send({
          error: '401 Unauthorized',
          message: 'no está autorizado a acceder a esta página'
        })
        : res.render('loginExitoUsuario', {
          layout: 'loginExitoUsuario',
          skater
        })
    })
  })
  //mconsuelo.gomezt@gmail.com //2100

//confirmar skater con privilegio de administrador
app.get("/skater-confirm", async (req, res) => {
  const {estado} = req.body;
  console.log('hola')
  await confirmarUsuario(estado);
  res.render("confirmarSkater", {
        layout: "confirmarSkater",
        estado,
      });
});

//levantar el servidor
app.listen(3000, () => console.log('Server on and working OK'))