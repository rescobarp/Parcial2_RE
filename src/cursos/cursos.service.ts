import { Injectable, NotFoundException } from '@nestjs/common';
import { Curso } from './curso.model';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [];
  private idCounter = 1;

  findAll(): Curso[] {
    return this.cursos;
  }

  findOne(id: number): Curso {
    const curso = this.cursos.find((c) => c.id === id);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  create(createCursoDto: CreateCursoDto): Curso {
    const curso: Curso = {
      id: this.idCounter++,
      ...createCursoDto,
    };
    this.cursos.push(curso);
    return curso;
  }

  update(id: number, createCursoDto: CreateCursoDto): Curso {
    const index = this.cursos.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    this.cursos[index] = { id, ...createCursoDto };
    return this.cursos[index];
  }

  partialUpdate(id: number, updateCursoDto: UpdateCursoDto): Curso {
    const curso = this.findOne(id);
    const updated = { ...curso, ...updateCursoDto };
    const index = this.cursos.findIndex((c) => c.id === id);
    this.cursos[index] = updated;
    return updated;
  }

  remove(id: number): { message: string } {
    const index = this.cursos.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    this.cursos.splice(index, 1);
    return { message: `Curso con ID ${id} eliminado correctamente` };
  }
}
