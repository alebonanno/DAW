import { Module } from "@nestjs/common";
import { ClientesController } from "./controller/clientes.controller";
import { ProyectosController } from "./controller/proyectos.controller";
import { TareasController } from "./controller/tareas.controllers";
import { TareasService } from "./services/tarea.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tarea } from "./entitites/tarea.entity";
import { Proyecto } from "./entitites/proyecto.entity";
import { Cliente } from "./entitites/cliente.entity";


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
    providers:[TareasService],
    // Entidades registradas en TypeORM para este módulo.
    // Permite realizar operaciones con la base de datos.
    imports:[
        TypeOrmModule.forFeature([Tarea, Proyecto, Cliente])
    ],
    // Exportaciones del módulo (vacío en este caso).
    exports:[]
})
export class GestionModule {
    
}