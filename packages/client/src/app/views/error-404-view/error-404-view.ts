import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api-service/api-service';

@Component({
  selector: 'app-error-404-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './error-404-view.html',
  styleUrl: './error-404-view.scss',
})
export class Error404View implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Auto-navigate to landing page after 5 seconds on refresh/direct navigation
    // But allow user to navigate back within that time
    this.apiService.isServerAvailable().subscribe((available) => {
      if (available) {
        this.navigateHome();
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
