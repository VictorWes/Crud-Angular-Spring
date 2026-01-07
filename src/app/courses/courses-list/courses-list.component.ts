import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  readonly displayedColumns = ['name', 'categoria', 'actions'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
