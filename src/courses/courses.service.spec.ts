import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = 'd056adaa-9a44-48d1-92e6-4ca0017030ab';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should creates a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    const mockTagRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      create: jest.fn(),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['bestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        created_at: date,
        tags: expectOutputTags,
      },
    ];

    const mockCourseRepository = {
      index: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.index();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(courses);
  });

  it('should get a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      show: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.show(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should get a course NotFoundException', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      show: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.show(id);
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Courses ID#${id} not found`);
    }
  });

  it('should update a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    const mockTagRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      create: jest.fn(),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should update a course NotFoundException', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    const mockTagRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      create: jest.fn(),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };

    try {
      await service.update(id, updateCourseDTO);
      expect(mockCourseRepository.preload).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Courses ID#${id} not found`);
    }
  });

  it('should delete a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      delete: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.delete(id);

    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(course);
  });

  it('should delete a course NotFoundException', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];

    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      delete: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.delete(id);
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(`Courses ID#${id} not found`);
    }
  });

  // describe('findOne', () => {
  //   describe('Buscar curso pelo ID', () => {
  //     it('Deve retornar o objeto course', async () => {
  //       const courseId = '1';
  //       const expectedCourse = {};

  //       courseRepository.findOne.mockReturnValue(expectedCourse);
  //       const course = await service.show(courseId);
  //       expect(course).toEqual(expectedCourse);
  //     });

  //     it('Deve retornar um NotFoundException', async () => {
  //       const courseId = '1';
  //       courseRepository.findOne.mockReturnValue(undefined);

  //       try {
  //         await service.show(courseId);
  //       } catch (error) {
  //         expect(error).toBeInstanceOf(NotFoundException);
  //         expect(error.message).toEqual(`Courses ID#${courseId} not found`);
  //       }
  //     });
  //   });
  // });
});
