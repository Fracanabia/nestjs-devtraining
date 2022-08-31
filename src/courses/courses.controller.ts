import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Get()
  index() {
    return this._coursesService.index();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this._coursesService.show(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this._coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this._coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._coursesService.delete(id);
  }
}
