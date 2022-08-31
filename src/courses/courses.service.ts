import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entity/course.entity';
import { Tag } from './entity/tag.entity';

@Injectable()
export class CoursesService {
  @Inject('COURSES_REPOSITORY')
  private courseRepository: Repository<Course>;

  @Inject('TAGS_REPOSITORY')
  private tagRepository: Repository<Tag>;

  async index() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async show(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course ID#${id} not found`);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name))
    );

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name))
      ));

    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDTO,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course ID#${id} not found`);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course ID#${id} not found`);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
