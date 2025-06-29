import User from "../models/user.js";
import bcrypt from "bcrypt";

export const login = async (req, res)=>{
    console.log("BODY:", req.body);
    const { email, password } = req.body;
try {
        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(404).json({Message: "El correo o la contraseña son incorrectos."});
    
        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword) return res.status(404).json({Message: "El correo o la contraseña son incorrectos."});
        console.log("Is valide?", validatePassword);
        res.status(200).json({Message: "Has inciado sesión con éxito.",
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (e) {
        console.log('Error al iniciar sesion: ', e)
        res.status(500).json({Error: e.message});
    }
}