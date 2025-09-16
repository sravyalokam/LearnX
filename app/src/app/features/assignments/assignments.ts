import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { Assignment, DetailedCourse } from '../../models/assignments.model';
import { Courses } from '../../models/courses.model';
import { ContactUs } from '../contact-us/contact-us';
import { CompletedAssignments } from '../../models/user.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.css'],
  imports: [CommonModule, TitleCasePipe, RouterModule, FormsModule],
})
export class AssignmentList implements OnInit {
  @Input() assignmentsInput?: Assignment[]=[];
  assignments: Assignment[] = [];
  detailedCourses: DetailedCourse[] = [];
  courses: Courses[] = [];
  
  completedAssignments: string[] = [];



  selectedCourse: string = 'all';
  selectedLevel: string = 'all';
  searchTerm: string = '';

  constructor(private api: Api, private router: Router) {}

 ngOnInit(): void {
  
  this.api.getAssignments().subscribe({
    next: (data: Assignment[]) => {
      this.assignments = data;
    },
    error: (err) => console.error('Error loading assignments:', err),
  });


  this.api.getCourses().subscribe({
    next: (courses: Courses[]) => (this.courses = courses),
    error: (err) => console.error('Error loading courses:', err),
  });

  
  this.api.getDetailedCourses().subscribe({
    next: (details: DetailedCourse[]) => (this.detailedCourses = details),
    error: (err) => console.error('Error loading course details:', err),
  });

  
  const stored = JSON.parse(localStorage.getItem('completedAssignments') || '[]');
  this.completedAssignments = stored;
}


  get filteredAssignments(): Assignment[] {
    return this.assignments.filter((a) => {
      const courseMatch = this.selectedCourse === 'all' || a.course === this.selectedCourse;
      const levelMatch = this.selectedLevel === 'all' || a.level.toLowerCase() === this.selectedLevel.toLowerCase();
      const searchMatch = this.searchTerm === '' || a.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return courseMatch && levelMatch && searchMatch;
    });
  }

  filterByCourse(courseId: string): void {
    this.selectedCourse = courseId;
  }

  filterByLevel(level: string): void {
    this.selectedLevel = level;
  }

  startAssignment(title: string, level: string): void {
    this.router.navigate(['/assignment-questions', title], {
      queryParams: { level },
    });
  }

  

  getCourseColor(courseName: string): string {
    const course = this.detailedCourses.find((c) => c.name === courseName);
    return course ? course.color : '#6c63ff';
  }

  getProgressPercentage(course: DetailedCourse): number {
    if (!course.totalAssignments) return 0;
    return Math.round((course.completedAssignments / course.totalAssignments) * 100);
  }
}
