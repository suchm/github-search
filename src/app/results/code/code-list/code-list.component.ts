import { Component, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatAnchor } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-code-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatAnchor,
    CommonModule,
    RouterModule
  ],
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.scss'
})
export class CodeListComponent {
  @Input() results: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
  @Input() limit!: number;
}
