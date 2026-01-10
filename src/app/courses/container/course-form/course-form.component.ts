import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course = this.route.snapshot.data['course'] as Course;
    this.form = this.formBuilder.group({
      _id: [course?._id],
      name: [
        course?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      categoria: [course?.categoria, [Validators.required]],
      lessons: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required
      ),
    });
    console.log(this.form.value);
  }

  private onError() {
    this.snackBar.open('Erro salvar curso', '', { duration: 5000 });
  }

  private retrieveLessons(course: Course | undefined) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach((lesson) => {
        lessons.push(this.createLesson(lesson));
      });
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', nome: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id, Validators.required],
      nome: [lesson.nome, Validators.minLength(3)],
      youtubeUrl: [lesson.youtubeUrl, Validators.minLength(10)],
    });
  }

  getLeassonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: (data) => this.onSucess(),
        error: () => {
          this.onError();
        },
      });
    } else {
      alert('Formulário inválido');
    }
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso', '', { duration: 5000 });
    this.onCancel();
  }

  onCancel() {
    this.location.back();
  }

  onDelete() {
    this.service.remove(this.form.value._id).subscribe({
      next: (data) => this.onSucess(),
      error: () => {
        this.onError();
      },
    });
  }

  getErroMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Você deve informar um valor.';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `O valor deve ter no mínimo ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `O valor deve ter no máximo ${requiredLength} caracteres.`;
    }

    return 'Campo invalido';
  }

  isFormArrayRequired() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required');
  }
}
