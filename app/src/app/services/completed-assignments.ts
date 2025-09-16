import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompletedAssignments {
  private completed: string[] = [];

  constructor() {
    // Load from localStorage at start
    this.completed = JSON.parse(localStorage.getItem('completedAssignments') || '[]');
  }

  //  Get all completed assignments
  getAll(): string[] {
    return this.completed;
  }

  //  Check if a specific assignment is completed
  isCompleted(title: string): boolean {
    return this.completed.includes(title);
  }

  //  Add assignment as completed
  markCompleted(title: string): void {
    if (!this.completed.includes(title)) {
      this.completed.push(title);
      this.save();
    }
  }

  //  Remove assignment (if needed)
  unmarkCompleted(title: string): void {
    this.completed = this.completed.filter(t => t !== title);
    this.save();
  }

  private save(): void {
    localStorage.setItem('completedAssignments', JSON.stringify(this.completed));
  }
}
