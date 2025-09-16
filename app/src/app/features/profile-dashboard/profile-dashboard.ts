import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { User } from '../../models/user.model';
import { Courses } from '../../models/courses.model';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CoursesSection } from '../courses/courses';
import { CommonModule } from '@angular/common';
import { ContactUs } from '../contact-us/contact-us';
import { AssignmentList } from '../assignments/assignments';
import { Assignment } from '../../models/assignments.model';

@Component({
  imports: [CoursesSection, CommonModule, AssignmentList],
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.html',
  styleUrls: ['./profile-dashboard.css']
})
export class ProfileDashboard implements OnInit {
  user!: User;
  enrolledCourses: Courses[] = [];
  // coursesReady: boolean = false; 
  // hasCourses: boolean = false; 
  // hasNoCourses: boolean = false; 

   completedAssignmentsList: Assignment[] = []; 

  constructor(private api: Api, private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const session = this.auth.getSession();
    if (!session) {
      this.router.navigate(['/signin']);
      return;
    }


    this.api.getUserById(session.userId).subscribe(user => {
  this.user = user;

  //  now user is available
  this.api.getAssignments().subscribe(assignments => {
  console.log(" All assignments from API:", assignments);
  console.log("User completedAssignments:", this.user.completedAssignments);

  this.completedAssignmentsList = assignments.filter(a =>
    this.user.completedAssignments?.some(ca =>
      ca.title === a.title && ca.level === a.level
    )
  );

  console.log(" Filtered completed assignments:", this.completedAssignmentsList);
});

  if (this.user.enrolledCourses?.length) {
    this.api.getCourses().subscribe(allCourses => {
      this.enrolledCourses = allCourses.filter(course =>
        this.user.enrolledCourses?.includes(course.title)
      );

      // this.hasCourses = this.enrolledCourses.length > 0;
      // this.hasNoCourses = this.enrolledCourses.length === 0;
      // this.coursesReady = true;

      console.log('Enrolled courses:', this.enrolledCourses);
    });
  } 
  // else {
  //   this.enrolledCourses = [];
  //   this.hasCourses = false;
  //   this.hasNoCourses = true;
  //   this.coursesReady = true;
  // }
});



   
  }
}
