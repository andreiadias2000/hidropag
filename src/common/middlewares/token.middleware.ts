import { NextFunction, Request, Response } from "express";
import { LoginService } from "../../usuarios/login.service"; // 1. Certifique-se de importar o LoginService

export class TokenMiddleware {
    // 2. Mude de UsuariosService para LoginService aqui no construtor
    constructor (private service: LoginService) {}

    verificarAcesso = async (req: Request, res: Response, next: NextFunction) => {
        let token = req.get("Authorization");
        if(token) {
            try {
                // 3. Agora o TypeScript vai reconhecer o método!
                await this.service.validarToken(token);
                next();
            }
            catch(err: any) {
                res.status(err.id || 401).json({erro: err.msg});
            }
        } 
        else {
            res.status(401).json({error: "Nenhum Token informado!"});    
        }       
    }
}