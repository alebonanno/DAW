import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarea } from "../entities/tarea.entity";
import { Repository } from "typeorm";
import { EstadosTareasEnum } from "../enums/estados-tareas.enum";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto";


// Servicio encargado de la lógica de negocio de las tareas.
// Permite crear y actualizar tareas en la base de datos.
@Injectable()
export class TareasService {

    constructor(@InjectRepository(Tarea) private readonly tareasRepository: Repository<Tarea>) {

    }

    // Crea una nueva tarea asociada a un proyecto
    // @param dto => Datos de la tarea a crear.
    // @param idProyecto => ID del proyecto al que pertenece la tarea.
    // @returns ID de la tarea creada.

    async crearTarea(dto: CreateTareaDto, idProyecto: number): Promise<{ id: number }> {

        const tarea: Tarea = this.tareasRepository.create(dto);

        tarea.estado = EstadosTareasEnum.PENDIENTE;
        tarea.idProyecto = idProyecto;

        await this.tareasRepository.save(tarea);

        return { id: tarea.id };

    }


    // Actualiza una tarea existente.
    // @param dto => Datos a actualizar de la tarea.
    // @param idTarea => ID de la tarea a modificar.
    // @throws BadRequestException si la tarea no existe.
    async actualizarTarea(dto: UpdateTareaDto, idTarea: number): Promise<void> {
        const tarea: Tarea | null = await this.tareasRepository.findOne({ where: { id: idTarea } });

        if (!tarea) {
            throw new BadRequestException("La tarea indicada no existe");
        }

        this.tareasRepository.merge(tarea, dto);

        await this.tareasRepository.save(tarea);

    }

}