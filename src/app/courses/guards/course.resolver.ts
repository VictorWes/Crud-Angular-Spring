import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Course> = (route) => {
  const service = inject(CoursesService);
  const id = route.paramMap.get('id') as string;
  return service.loadById(id);
};
