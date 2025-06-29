import sequelize from "./database.js";

const startDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log("Se estableció conexión con la base de datos.");
        await sequelize.sync();
    }catch(e){
        console.log("Error al conectar con la base de datos: ", e);
    }
}

export default startDB;