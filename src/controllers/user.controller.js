import User from "../models/user.js";

export const getAllUsers = async(req, res)=>{
    try{
        const users = await User.findAll({
            attributes: ['username', 'email']
        });
        if(users.length === 0) return res.status(404).json({Message: "No hay ningún usuario registrado."});
        
        res.json(users);

    }catch(e){
        res.status(500).json({Error: e.message});
    }
}

export const getUserById = async(req, res)=>{
    try{
        const user= await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({Message: "El usuario no existe."});
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    }catch(e){
        res.status(500).json({Error: e.message});
    }
}

export const updateUser = async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json({Message: "El usuario no existe."});

        if(username !== undefined) user.username = username;
        if(email !== undefined) user.email = email;
        if(password !== undefined) user.password = password;

        await user.save();
        res.status(200).json({
            Message: "El usuario ha sido actualizado con éxito.",
            username: user.username,
            email: user.email
        });
    } catch (e) {
        console.log("Error al actualizar el usuario: ", e);
        res.status(500).json({Error: e.Message});
    }
}

export const deleteUser = async(req, res)=>{
    try {
        const deleted = User.destroy({where: {id: req.params.id}});
        if(!deleted) return res.status(404).json({Message: "El usuario no existe."});
        
        res.status(200).json({Message: "El usuario ha sido eliminado"});
            
    } catch (e) {
        res.status(500).json({Error: e.Message});
    }
}