import { Routes } from '@angular/router';
import { HomePage } from './features/Home/home-page/home-page';
import { CoursesSection } from './features/courses/courses';
import { AboutUs } from './features/about-us/about-us';
// import { AssignmentsSection } from './features/assignments/assignments';
import { AssignmentList } from './features/assignments/assignments';
import { ContactUs } from './features/contact-us/contact-us';
// import { CourseDetails } from './features/courses/course-details/course-details';
import { CoursePageComponent } from './features/courses/courseDetails/courseDetails/course-details';
// import { AssignmentDetails } from './features/assignments/assignmentDetails/assignment-details/assignment-details';
import { App } from './app';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AssignmentQuestions } from './features/assignments/assignmentDetails/assignment-questions/assignment-questions';
import { Faqs } from './features/faqs/faqs';
import { SignIn } from './signin-page/signin-page'
import { SignupPage } from './signup-page/signup-page';
import { NavBar } from './nav-bar/nav-bar';
import { ForgetPassword } from './forget-password/forget-password';
import { AuthGuard } from './guards/auth-guard';
import { CourseEnrollment } from './features/courses/courseDetails/course-enrollment/course-enrollment';
import { ProfileDashboard } from './features/profile-dashboard/profile-dashboard';
import { AssignmentScoreCard } from './features/assignments/assignmentDetails/assignment-score-card/assignment-score-card';
import { ValidateOtp } from './forget-password/validate-otp/validate-otp';


export const routes: Routes = [


  { path: '', component: SignIn },

  { path: 'signup', component: SignupPage },
  { path: 'signin', component: SignIn },
  { path: 'forgetpassword', component: ForgetPassword },
  { path: 'validate-otp', component: ValidateOtp},

  { path: 'profile', component: ProfileDashboard, canActivate: [AuthGuard]},
  { path: 'homepage', component: HomePage, canActivate: [AuthGuard], },
  { path: 'Home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'About us', component: AboutUs, canActivate: [AuthGuard] },
  { path: 'Courses', component: CoursesSection, canActivate: [AuthGuard] },
  // { path: 'course-details', component: CoursePageComponent, canActivate: [AuthGuard]},
  { path: 'course-enrollment', component: CourseEnrollment, canActivate: [AuthGuard] },
  { path: 'course-details/:title', component: CoursePageComponent, canActivate: [AuthGuard] },
  { path: 'course-enrollment/:title', component: CourseEnrollment, canActivate: [AuthGuard] },
  // { path: 'courses/:title', component: CoursePageComponent },
  { path: 'Assignments', component: AssignmentList, canActivate: [AuthGuard] },
  //{ path: 'assignments/:title', component: AssignmentQuestions, canActivate: [AuthGuard] },
  { path: 'assignments/:title/:level', component: AssignmentQuestions, canActivate: [AuthGuard] },
  { path: 'FAQs', component: Faqs, canActivate: [AuthGuard] },
  { path: 'scorecard', component: AssignmentScoreCard, canActivate: [AuthGuard] },
  // { path: ':title', component: AssignmentQuestions },
  { path: '**', redirectTo: 'signin' }

];


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});