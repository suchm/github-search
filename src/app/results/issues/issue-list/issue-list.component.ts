import {Component, Input, OnInit} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatAnchor } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    MatCardTitle,
    MatCardSubtitle,
    CommonModule,
    RouterModule
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss'
})
export class IssueListComponent implements OnInit{
  @Input() issues: any[] = [];
  @Input() page!: number;
  @Input() perPage!: number;
  @Input() limit!: number;

  ngOnInit() {
    // console.log(this.issues);
  }
}
