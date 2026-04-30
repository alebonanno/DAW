import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "../entities/cliente.entity";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { FindOptionsWhere, Repository } from "typeorm";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto";
import { BadRequestException, forwardRef, Inject } from "@nestjs/common";
import { ProyectosService } from "./proyectos.service";

@Injectable()
export class ClientesService {

    constructor(@InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
        @Inject(forwardRef(() => ProyectosService)) private readonly proyectosService: ProyectosService) { }

    async crearCliente(dto: CreateClienteDto): Promise<{ id: number }> {

        const cliente: Cliente = this.repository.create(dto);
        cliente.estado = EstadosClientesEnum.ACTIVO;
        await this.repository.save(cliente);
        return { id: cliente.id };
    }

    async actualizarCliente(id: number, dto: UpdateClienteDto): Promise<void> {

        const cliente: Cliente | null = await this.repository.findOneBy({ id });

        if (!cliente) {
            throw new BadRequestException('Cliente no encontrado');
        }

        const relacionadoConProyectos: boolean = await this.proyectosService.existeProyectoPorIdCliente(id);

        if (relacionadoConProyectos && dto.estado === EstadosClientesEnum.BAJA) {
            throw new BadRequestException('No se puede dar de baja un cliente con proyectos relacionados');
        }

        this.repository.merge(cliente, dto);
        await this.repository.save(cliente);
    }

    async obtenerClientes(
        estado: EstadosClientesEnum,
        // Extra4.
        desde?: string,
        hasta?: string,

    ): Promise<ListClienteDTO[]> {

        const whereCondition: FindOptionsWhere<ListClienteDTO> = {}

        if (estado) {
            whereCondition.estado = estado
        }

        // Extra4.
        const query = this.repository.createQueryBuilder('cliente');

        query.select([
            'cliente.id',
            'cliente.nombre',
            'cliente.estado',
            'cliente.telefono',
            'cliente.email',
            // Extra4
            'cliente.createdAt'
        ]);

        if (estado) {
            query.andWhere('cliente.estado = :estado', { estado });
        }

        // Extra4
        // Función que “limpia” los valores que vienen de Swagger
        // si v tiene texto válido → lo deja igual.
        const clean = (v?: string) =>
            // si viene vacío " " o "" → lo convierte en undefined.
            v && v.trim() !== '' ? v : undefined;

        // Aplica 'limpieza' al parámetro "desde".
        // Ej: "2026-04-30" =>  se queda igual.
        // Ej: "" o " " =>  pasa a undefined.
        const desdeClean = clean(desde);
        // Igual para "hasta".
        const hastaClean = clean(hasta);

        // Si "desdeClean" tiene una fecha válida.
        if (desdeClean) {
            // Se agrega una condición al query:
            // "traer clientes cuya fecha de creación sea MAYOR O IGUAL a 'desde'".
            query.andWhere('cliente.createdAt >= :desde', {
                // Convierte string a Date real.
                desde: new Date(desdeClean)
            });
        }

        // Si "hastaClean" tiene una fecha válida.
        if (hastaClean) {
            // Cream una fecha a partir del string.
            const hastaDate = new Date(hastaClean);
            // Le pone hora final del día:
            // 23:59:59.999 => para incluir TODO el día completo.
            hastaDate.setHours(23, 59, 59, 999);

            // Se agrega condición:
            // "traer clientes cuya fecha de creación sea MENOR O IGUAL a 'hasta'".
            query.andWhere('cliente.createdAt <= :hasta', {
                hasta: hastaDate
            });
        }

        const clientes = await query.orderBy('cliente.id', 'ASC').getMany();

        const dtoList: ListClienteDTO[] = [];

        for (const c of clientes) {
            const dto = new ListClienteDTO();
            dto.id = c.id;
            dto.nombre = c.nombre;
            dto.estado = c.estado;
            // Extras.
            dto.telefono = c.telefono;
            dto.email = c.email;
            dto.createdAt = c.createdAt;
            dtoList.push(dto);
        }

        return dtoList;
    }

    async existeClienteActivoPorId(id: number): Promise<boolean> {

        const existe: boolean = await this.repository.exists({ where: { id, estado: EstadosClientesEnum.ACTIVO } });
        return existe;
    }


    // Extra2.
    async obtenerEstadisticas() {
        const total = await this.repository.count();

        const activos = await this.repository.count({
            where: { estado: EstadosClientesEnum.ACTIVO }
        });

        const baja = await this.repository.count({
            where: { estado: EstadosClientesEnum.BAJA }
        });

        return {
            total,
            activos,
            baja
        };
    }


    // Extra3:
    async contarProyectos(id: number) {

        const existe = await this.repository.exists({
            where: { id }
        });

        if (!existe) {
            throw new BadRequestException("Cliente no encontrado");
        }

        const total = await this.proyectosService.contarPorCliente(id);

        return {
            clienteId: id,
            totalProyectos: total
        };
    }
}