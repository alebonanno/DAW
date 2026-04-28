import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";

@Module({
    controllers:[AuthController],
    providers:[],
    imports:[],
    exports:[]
})
export class AuthModule {
    
}