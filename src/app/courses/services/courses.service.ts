import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/api/courses';

  constructor(private httpCliente: HttpClient) {}

  list() {
    return this.httpCliente.get<Course[]>(this.API).pipe(
      first(),
      tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    if (record && record._id) {
      return this.update(record as Course);
    }
    return this.httpCliente.post<Course>(this.API, record).pipe(first());
  }

  update(record: Course) {
    return this.httpCliente
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  loadById(id: string) {
    return this.httpCliente.get<Course>(`${this.API}/${id}`);
  }

  delete(id: string) {
    return this.httpCliente.delete<void>(`${this.API}/${id}`).pipe(first());
  }
}
