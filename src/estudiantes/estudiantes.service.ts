import { Injectable, NotFoundException } from '@nestjs/common';
import { Estudiante } from './estudiante.model';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  private estudiantes: Estudiante[] = [];
  private idCounter = 1;

  findAll(): Estudiante[] {
    return this.estudiantes;
  }

  findOne(id: number): Estudiante {
    const estudiante = this.estudiantes.find((e) => e.id === id);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  create(createEstudianteDto: CreateEstudianteDto): Estudiante {
    const estudiante: Estudiante = {
      id: this.idCounter++,
      ...createEstudianteDto,
    };
    this.estudiantes.push(estudiante);
    return estudiante;
  }

  update(id: number, createEstudianteDto: CreateEstudianteDto): Estudiante {
    const index = this.estudiantes.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    this.estudiantes[index] = { id, ...createEstudianteDto };
    return this.estudiantes[index];
  }

  partialUpdate(id: number, updateEstudianteDto: UpdateEstudianteDto): Estudiante {
    const estudiante = this.findOne(id);
    const updated = { ...estudiante, ...updateEstudianteDto };
    const index = this.estudiantes.findIndex((e) => e.id === id);
    this.estudiantes[index] = updated;
    return updated;
  }

  remove(id: number): { message: string } {
    const index = this.estudiantes.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    this.estudiantes.splice(index, 1);
    return { message: `Estudiante con ID ${id} eliminado correctamente` };
  }
}
