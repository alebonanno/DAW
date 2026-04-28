import { Module } from "@nestjs/common";
import { ClientesController } from "./controller/clientes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProyectosController } from "./controller/proyectos.controller";
import { TareasController } from "./controller/tareas.controllers";
import { TareasService } from "./services/tarea.service";
import { AuthModule } from "../auth/auth.module";
import { ClientesService } from "./services/clientes.service";
import { ProyectosService } from "./services/proyectos.service";
import { Tarea } from "./entities/tarea.entity";
import { Proyecto } from "./entities/proyecto.entity";
import { Cliente } from "./entities/cliente.entity";


// Módulo de gestión del sistema
// Agrupa la lógica relacionada con:
// - Clientes
// - Proyectos
// - Tareas
// Registra controladores, servicios y entidades necesarias para el funcionamiento del módulo.
@Module({
    // Controladores responsables de las rutas HTTP del módulo.
    controllers:[ClientesController, ProyectosController, TareasController],
    // Servicios utilizados por el módulo.
    providers:[TareasService, ClientesService, ProyectosService],
    // Entidades registradas en TypeORM para este módulo.
    // Permite realizar operaciones con la base de datos.
    imports:[
        TypeOrmModule.forFeature([Tarea, Proyecto, Cliente]),
        AuthModule
    ],
    // Exportaciones del módulo (vacío en este caso).
    exports:[]
})
export class GestionModule {
    
}