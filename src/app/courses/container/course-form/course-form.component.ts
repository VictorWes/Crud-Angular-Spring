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
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
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
      id: [lesson.id],
      nome: [lesson.nome, [Validators.required, Validators.minLength(3)]],
      youtubeUrl: [
        lesson.youtubeUrl,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  getLeassonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const formData = { ...this.form.value };
      // Limpar IDs vazios das lessons
      if (formData.lessons) {
        formData.lessons = formData.lessons.map((lesson: any) => {
          const cleanLesson = { ...lesson };
          if (!cleanLesson.id || cleanLesson.id === '') {
            delete cleanLesson.id;
          }
          return cleanLesson;
        });
      }
      console.log(
        'Dados sendo enviados para o backend:',
        JSON.stringify(formData, null, 2)
      );
      this.service.save(formData).subscribe({
        next: (data) => this.onSucess(),
        error: (error) => {
          console.error('Erro do servidor:', error);
          console.error('Mensagem de erro:', error.error?.message);
          console.error('Detalhes:', error.error);
          this.onError();
        },
      });
    } else {
      this.formUtils.valdiateAllFormFields(this.form);
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios',
        '',
        { duration: 5000 }
      );
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
}
