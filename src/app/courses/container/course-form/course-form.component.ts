import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [''],
      categoria: [''],
    });
  }

  ngOnInit(): void {
    const course = this.route.snapshot.data['course'] as Course | undefined;
    if (course) {
      this.form.setValue({
        _id: course._id,
        name: course.name,
        categoria: course.categoria,
      });
    }
  }

  private onError() {
    this.snackBar.open('Erro salvar curso', '', { duration: 5000 });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (data) => this.onSucess(),
      error: () => {
        this.onError();
      },
    });
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso', '', { duration: 5000 });
    this.onCancel();
  }

  onCancel() {
    this.location.back();
  }
}
