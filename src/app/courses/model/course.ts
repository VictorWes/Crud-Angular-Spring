import { Lesson } from './lesson';

export interface Course {
  _id: string;
  name: string;
  categoria: string;
  lessons?: Lesson[];
}
