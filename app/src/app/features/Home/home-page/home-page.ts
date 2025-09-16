import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Api } from '../../../services/api';
import { Courses } from '../../../models/courses.model';
import { CoursesSection } from '../../courses/courses';
import { ContactUs } from '../../contact-us/contact-us';
import { User, Feedback } from '../../../models/user.model';
import { FeedbackList } from '../../assignments/assignmentDetails/assignment-feedback-list/assignment-feedback-list';



@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, CoursesSection, FeedbackList, RouterModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {

  categories = [
    { name: 'Programming', icon: '💻', color: '#FEE2E2' },
    { name: 'Data Science', icon: '📊', color: '#DBEAFE' },
    { name: 'Design', icon: '🎨', color: '#F3E8FF' }
  ];

  featuredCourses: Courses[] = [];

  constructor(private api: Api) { }

  ngOnInit(): void {
    this.api.getCourses().subscribe((courses: Courses[]) => {
      // Sort by rating and pick top 3
      this.featuredCourses = courses
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    });
  }

  
}
