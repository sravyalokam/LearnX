import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../../../services/api';
import { TakeAssignment } from '../../../../models/take-assignment.model';
import { AssignmentScoreCard } from '../assignment-score-card/assignment-score-card';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-assignment-questions',
  standalone: true,
  templateUrl: './assignment-questions.html',
  styleUrls: ['./assignment-questions.css'],
  imports: [CommonModule, FormsModule],
})
export class AssignmentQuestions implements OnInit {
  takeAssignments: TakeAssignment[] = [];
  userAnswers = signal<{ [key: string]: any }>({});
  score: number | null = null;
  totalQuestions: number = 0;
  percentage: number = 0;
  showScoreCard: boolean = false;
  currentUser!: User;
  assignmentTitle = '';
  selectedLevel = 'all';

  constructor(
    private api: Api,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') || '{"id":0,"name":"Guest"}'
    );

    this.assignmentTitle = this.route.snapshot.paramMap.get('title') || '';
    this.selectedLevel = this.route.snapshot.paramMap.get('level') || 'all';

    if (this.assignmentTitle) {
      this.api.getTakeAssignment(this.assignmentTitle).subscribe((data) => {
        this.takeAssignments = data.map((a) => ({
          ...a,
          questions: Array.isArray(a.questions)
            ? a.questions
            : a.questions
            ? [a.questions]
            : [],
        }));

        this.takeAssignments.forEach((a) => {
          a.questions = a.questions.filter(
            (q) =>
              this.selectedLevel === 'all' ||
              q.level.toLowerCase() === this.selectedLevel.toLowerCase()
          );
        });

        
        const initialAnswers: { [key: string]: any } = {};
        this.takeAssignments.forEach((a) =>
          a.questions.forEach((_, i) => (initialAnswers[`${a.id}-${i}`] = ''))
        );
        this.userAnswers.set(initialAnswers);
      });
    }
  }

  onAnswerChange(assignmentId: string, questionIndex: number, value: any) {
    const currentAnswers = { ...this.userAnswers() };
    currentAnswers[`${assignmentId}-${questionIndex}`] = value;
    this.userAnswers.set(currentAnswers);
  }

  onSubmit(): void {
  let totalScore = 0;
  let total = 0;

  this.takeAssignments.forEach((a) =>
    a.questions.forEach((q, i) => {
      total++;
      const userAnswer = this.userAnswers()[`${a.id}-${i}`];
      const correctAnswer = q.options[q.correctAns]; 

      if (userAnswer === correctAnswer) {
        totalScore++;
      }
    })
  );

  this.score = totalScore;
  this.totalQuestions = total;
  this.percentage = total > 0 ? Math.round((totalScore / total) * 100) : 0;
  this.showScoreCard = true;

  console.log(' Evaluated:', {
    score: this.score,
    total: this.totalQuestions,
    percentage: this.percentage,
  });

   this.router.navigate(['/scorecard'], {
  queryParams: {
    assignmentId: this.firstAssignmentId,
    title: this.assignmentTitle,
    score: this.score ?? 0,
    total: this.totalQuestions ?? 0,
    percentage: this.percentage ?? 0,
  },
});
}


  retryAssignment(): void {
    this.showScoreCard = false;
    const resetAnswers: { [key: string]: any } = {};
    this.takeAssignments.forEach((a) =>
      a.questions.forEach((_, i) => (resetAnswers[`${a.id}-${i}`] = ''))
    );
    this.userAnswers.set(resetAnswers);
    this.score = null;
    this.totalQuestions = 0;
    this.percentage = 0;
  }

  reviewAnswers() {
    console.log('Review answers clicked');
  }

  goToNextAssignment() {
    console.log('Next assignment clicked');
  }

  goToAssignments(): void {
    this.router.navigate(['/Assignments']);
  }

  get firstAssignmentId(): number {
    const id = this.takeAssignments?.[0]?.id;
    return id !== undefined ? +id : 0;
  }
}
