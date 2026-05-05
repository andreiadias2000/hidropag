// src/usuarios/login.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuarios } from "./entities/usuario.entity"; 
import * as jwt from "jsonwebtoken";

// const SECRET = "Sen@c2026";

// @Injectable()
// export class LoginService {
    
//     constructor(
//         @InjectRepository(Usuarios)
//         private readonly repository: Repository<Usuarios>
//     ) {}

//     async verificarLogin(email: string, senha: string): Promise<string> {
//         // Busca o usuário no banco pelo e-mail
//         const usuario = await this.repository.findOneBy({ email: email });

//         // Verifica se o usuário existe e se a senha coincide
//         if (usuario && usuario.senha === senha) {
//             // Gera o token assinado
//             const token = jwt.sign(
//                 {
//                     usuarioId: usuario.id,
//                     usuarioEmail: usuario.email
//                 }, 
//                 SECRET, 
//                 { expiresIn: '1h' }
//             );
            
//             return token;
//         }

//         // Se chegar aqui, as credenciais estão erradas
//         throw { id: 401, msg: "Usuario ou senha invalidos" };
//     }

//     async validarToken(token: string): Promise<void> {
//         try {
//             console.log("Validando Token:", token);

//             // Tenta verificar a assinatura do token
//             const payload = jwt.verify(token, SECRET);            
            
//             if (!payload) {
//                 throw { id: 401, msg: "Token inválido" };
//             }
            
//             return;
//         } catch (err) {
//             // Se o JWT estiver expirado ou alterado, cai aqui
//             throw { id: 401, msg: "Token inválido ou expirado" };
//         }
//     }
// }
@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly repository: Repository<Usuarios>
    ) {}

    async verificarLogin(email: string, senha: string): Promise<string> {
        // Busca direto da variável de ambiente
        const SECRET = process.env.JTW_SENHA;

        const usuario = await this.repository.findOneBy({ email: email });

        if (usuario && usuario.senha === senha) {
            const token = jwt.sign(
                {
                    usuarioId: usuario.id,
                    usuarioEmail: usuario.email
                }, 
                SECRET as string, // Usamos 'as string' para o TS não reclamar
                { expiresIn: '1h' }
            );
            
            return token;
        }
        throw { id: 401, msg: "Usuario ou senha invalidos" };
    }

    async validarToken(token: string): Promise<void> {
        try {
            const SECRET = process.env.JTW_SENHA;
            jwt.verify(token, SECRET as string);            
            return;
        } catch (err) {
            throw { id: 401, msg: "Token inválido ou expirado" };
        }
    }
}