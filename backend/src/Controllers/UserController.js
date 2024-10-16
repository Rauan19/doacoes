import { Usuario } from "../models/user.MOdels";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const CriarUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const User = await Usuario.findOne({email})

        if(User) {
           return res.status(404).json("Usuario ja existe")
        }

        if(!name){
            return res.status(404).json("Nome obrigatório")
        }
        if(!email) {
            return res.status(404).json("Email obrigatório")
        }
        if(!password) {
            return res.status(404).json("Senha obrigatório")
        }
      
        const hashpassword = await bcrypt.hash(password, 10)

        const create = await Usuario.create({
            name,
            email,
            password: hashpassword}
        )

        return res.status(201).json({create})
    } catch (error) {
        return res.status(500).json({err: error.message})
        
    }
}

export const AuthLoginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const UserExist = await Usuario.findOne({email})
       if(!UserExist) {
        return res.status(404).json("Usuário não encontrado");
       }
        const CompareUser = await bcrypt.compare(password, UserExist.password)

        if(!CompareUser) {
            return res.status(404).json("Senha ou email inválidos")
        }

        

       const token =  jwt.sign({ id: UserExist._id, nome: UserExist.name},   process.env.TOKEN_CODE, {
             expiresIn: "3d"
           })

      return res.status(200).json({token})
        

    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


//mppt qmgd jwzg rgor   codigo app


