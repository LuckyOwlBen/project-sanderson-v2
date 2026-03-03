import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ALL_TALENT_PATHS, TalentPath } from '@project-sanderson/shared/character/talents';

@Component({
  selector: 'app-talent-view',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './talent-view.html',
  styleUrl: './talent-view.css',
})
export class TalentView implements OnInit {
  warrior: TalentPath = ALL_TALENT_PATHS.warrior;
  ngOnInit(): void {
    this.warrior.paths.forEach((path) => {
      console.log(path.pathName);
    });
  }
}
