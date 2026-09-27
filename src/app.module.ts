import { Module } from '@nestjs/common';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [EstudiantesModule, CursosModule],
})
export class AppModule {}
