import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { TareasService } from "../services/tarea.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ListTareaDTO } from "../dtos/output/list-tarea.dto";

@Controller('proyectos/:idProyecto/tareas')
export class TareasController {

    // Inyección del servicio de tareas.
    constructor(private readonly tareasService: TareasService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Endpoint POST /proyectos/:idProyecto/tareas.
    @Post()
    // @Body() dto: CreateTareaDto => Body con datos de la tarea.
    // @Param('idProyecto') idProyecto: number => ID del proyecto desde la URL.
    async crearTarea(@Body() dto: CreateTareaDto, @Param('idProyecto') idProyecto: number): Promise<{ id: number }> {

        // Llama al service para crear la tarea.
        return await this.tareasService.crearTarea(dto, idProyecto);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Endpoint PUT '/proyectos/:idProyecto/tareas/:id'.
    @Put(':id')
    // @Body() dto: UpdateTareaDto => Datos a actualizar.
    // @Param('id') id: number => ID de la tarea a modificar.
    // En SWAGGER, pide 'ID' de la tarea, para luego actualizarla.
    async actualizarTarea(@Body() dto: UpdateTareaDto, @Param('id') id: number): Promise<void> {
        // Llama al service para actualizar la tarea.
       await this.tareasService.actualizarTarea(dto, id);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Documenta respuesta como array de tareas.
    @ApiOkResponse({ type: ListTareaDTO, isArray: true })
    // Endpoint GET /proyectos/:idProyecto/tareas.
    @Get()
    async obtenerTareas(
        // ID del proyecto desde la URL.
        @Param('idProyecto') idProyecto: string
    ): Promise<ListTareaDTO[]> {

        // Convierte string a number y llama al service.
        return await this.tareasService.obtenerTareasPorProyecto(Number(idProyecto));
    }

}