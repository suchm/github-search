import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GithubApiService} from '../../../github-api.service';
import {SearchComponent} from '../../../search/search.component';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-repos-detail',
  standalone: true,
  imports: [
    SearchComponent,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './repos-detail.component.html',
  styleUrl: './repos-detail.component.scss'
})
export class ReposDetailComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  issueDetail: any = {};

  ngOnInit(): void {
    const reposId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(reposId).subscribe((data) => {
      this.issueDetail = data ?? [];
    });
  }

  onSearchResult(searchParams: { query: string, type: string, pageSize: number, currentPage: number }) {
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']); // Adjust route as needed
  }
}
