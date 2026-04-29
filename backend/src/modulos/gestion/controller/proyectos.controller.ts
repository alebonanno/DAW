import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto";
import { ProyectoDTO } from "../dtos/output/proyecto.dto";
import { ProyectosService } from "../services/proyectos.service";
import { AuthGuard } from "../../auth/guards/auth.guard";

// Define el controlador con ruta base 'proyectos'.
@Controller('proyectos')
export class ProyectosController {

    // Inyección del servicio de proyectos.
    constructor(private readonly proyectosService: ProyectosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Endpoint POST /proyectos.
    @Post()
    async crearProyecto(@Body() dto: CreateProyectoDto): Promise<{ id: number }> {

        // Llama al service para crear un proyecto.
       return await this.proyectosService.crearProyecto(dto);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Endpoint PUT '/proyectos/:id'.
    @Put(':id')
    // @Body() dto: UpdateProyectoDto => Body con datos a actualizar
    // @Param('id') => Parámetro de URL (id del proyecto).
    async actualizarProyecto(@Body() dto: UpdateProyectoDto, @Param('id') id: number): Promise<void> {

        // Revisar esto.
        // Aquí NO se está actualizando el proyecto.
        // Se está llamando a obtenerProyectos(), lo cual no tiene sentido.
        // await this.proyectosService.obtenerProyectos();
        await this.proyectosService.actualizarProyecto(id, dto);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListProyectoDTO, isArray: true })
    // Endpoint GET /proyectos.
    @Get()
    async obtenerProyectos(): Promise<ListProyectoDTO[]> {

        // Llama al service, y pide todos los proeyctos.
        return await this.proyectosService.obtenerProyectos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Endpoint GET '/proyectos/:id'.
    // @Param('id') id: number => Obtiene el id desde la URL.
    @Get(':id')
    async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {

        // Llama al service para obtener un proyecto específico.
        return await this.proyectosService.obtenerProyecto(id);
    }
}