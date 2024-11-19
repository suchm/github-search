import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {GithubApiService} from '../../../github-api.service';
import {MatAnchor, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatChip, MatChipGrid} from '@angular/material/chips';
import {MatDivider} from '@angular/material/divider';
import {MatList, MatListItem} from '@angular/material/list';
import {SearchComponent} from '../../../search/search.component';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    CommonModule,
    MatChip,
    MatCardContent,
    MatDivider,
    MatList,
    MatListItem,
    MatChipGrid,
    SearchComponent,
    MatAnchor,
    MatFabButton
  ],
  templateUrl: './issue-detail.component.html',
  styleUrl: './issue-detail.component.scss'
})
export class IssueDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  issueDetail: any = {};

  ngOnInit(): void {
    const issueId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(issueId).subscribe((data) => {
      this.issueDetail = data ?? [];
    });
  }

  goBack() {
    this.router.navigate(['/']); // Adjust route as needed
  }
}
