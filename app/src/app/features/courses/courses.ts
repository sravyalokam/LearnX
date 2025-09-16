import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { Courses } from '../../models/courses.model';
import { UpperCasePipe } from '@angular/common';
import { ContactUs } from '../contact-us/contact-us';
import { User } from '../../models/user.model';
import { Auth } from '../../services/auth';
import { Api } from '../../services/api';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterOutlet, RouterModule, UpperCasePipe],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesSection {

  @Input() courses: Courses[] = [];  
  @Input() title: string = 'Courses';

  user?: User;
  enrolledCourses: string[] = [];  

  constructor(private api: Api, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    const session = this.auth.getSession();
    if (!session) {
      alert('User not logged in!');
      this.router.navigate(['/signin']);
      return;
    }

  
    this.api.getUserById(session.userId).subscribe(user => {
      this.user = user;
      this.enrolledCourses = user.enrolledCourses || [];
      console.log("User Enrolled Courses:", this.enrolledCourses);
    });

     this.api.getCourses().subscribe((data) => {
      this.courses = data;
     });

    
  }


  handleEnrollment(isEnrolled: boolean, course: Courses) {
    if (isEnrolled) {
      this.router.navigate(['/course-details', course.title]);
    } else {
      this.router.navigate(['/course-enrollment', course.title]);
    }
  }
}
