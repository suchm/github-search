import {Component, inject, Input, OnInit} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import {MatAnchor, MatFabButton} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {GithubApiService} from '../../../github-api.service';
import {MatIcon} from '@angular/material/icon';
import {SearchComponent} from '../../../search/search.component';

@Component({
  selector: 'app-code-detail',
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
    MatFabButton,
    MatIcon,
    SearchComponent
  ],
  templateUrl: './code-detail.component.html',
  styleUrl: './code-detail.component.scss'
})
export class CodeDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  codeDetail: any = {};

  ngOnInit(): void {
    const codeId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(codeId).subscribe((data) => {
      this.codeDetail = data ?? [];
    });
  }

  onSearchResult(searchParams: { query: string, type: string, pageSize: number, currentPage: number }) {
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']); // Adjust route as needed
  }
}
