import { Body, Controller, Get, NotImplementedException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto";
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ClientesService } from "../services/clientes.service";

// Define este controlador con la ruta base "clientes".
@Controller('clientes')
export class ClientesController {

    // Inyección de dependencias: se inyecta el servicio de clientes.
    constructor(private readonly clientesService: ClientesService) { }

    // Indica que esta ruta usa autenticación tipo Bearer (JWT generalmente).
    @ApiBearerAuth()
    // Aplica el guard de autenticación para proteger la ruta.
    @UseGuards(AuthGuard)
    // Define un endpoint HTTP POST para crear un cliente.
    @Post()
    // Método que recibe el cuerpo (Body) con datos del cliente.
    async crearCliente(@Body() dto: CreateClienteDto): Promise<{ id: number }> {
        // Llama al servicio para crear el cliente y devuelve el ID generado.
        return await this.clientesService.crearCliente(dto);
    }

    // Indica autenticación Bearer.
    @ApiBearerAuth()
    // Aplica protección con guard.
    @UseGuards(AuthGuard)
    // Define un endpoint HTTP PUT con parámetro dinámico ':id'.
    @Put(":id")
    // Método para actualizar un cliente existente.
    // @Param => Obtiene el parámetro "id" de la URL.
    // @Body => Obtiene el cuerpo con los datos a actualizar.
    async actualizarCliente(@Param("id") id: number, @Body() dto: UpdateClienteDto): Promise<void> {
        // Llama al servicio para actualizar el cliente.
        await this.clientesService.actualizarCliente(id, dto);
    }

    // Indica autenticación Bearer.
    @ApiBearerAuth()
    // Documenta que la respuesta es un array de ListClienteDTO.
    @ApiOkResponse({ type: ListClienteDTO, isArray: true })
    // Documenta un parámetro de query llamado "estado".
    @ApiQuery({
        // nombre del query param.
        name: 'estado',
        // no es obligatorio.
        required: false,
        // valores permitidos.
        enum: EstadosClientesEnum
    })

    // Aplica protección con guard.
    @UseGuards(AuthGuard)
    // Para evitar que requiera filtro (desde - hasta).
    // Los examples hacen que se llene automatico en SWAGGER, si se borran en SWAGGER funciona sin filtros.
    @ApiQuery({ name: 'desde', required: false, type: String, example: '2026-04-01'})
    @ApiQuery({ name: 'hasta', required: false, type: String, example: '2026-04-30' })
    // Define un endpoint HTTP GET para obtener clientes.
    @Get()
    // @Query("estado") estado: EstadosClientesEnum) => Obtiene el parámetro de query "estado" (ej: ?estado=ACTIVO)
    async obtenerClientes(
        @Query("estado") estado: EstadosClientesEnum,
        // Extra4.
        @Query("desde") desde?: string,
        @Query("hasta") hasta?: string
    ): Promise<ListClienteDTO[]> {
        // Llama al servicio para obtener clientes filtrados (o todos si no se envía estado).
        return await this.clientesService.obtenerClientes(estado, desde, hasta);
    }

    // Extra2.
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("stats")
    async obtenerEstadisticas() {
        return this.clientesService.obtenerEstadisticas();
    }

    
    // Extra3.
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    // Pide 'id' del cliente en SWAGGER.
    @Get(":id/proyectos-count")
    async contarProyectos(@Param("id") id: number) {
        return this.clientesService.contarProyectos(id);
    }
}