import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {SearchComponent} from '../../../search/search.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GithubApiService} from '../../../github-api.service';

@Component({
  selector: 'app-commits-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    SearchComponent
  ],
  templateUrl: './commits-detail.component.html',
  styleUrl: './commits-detail.component.scss'
})
export class CommitsDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  issueDetail: any = {};

  ngOnInit(): void {
    const commitsId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(commitsId).subscribe((data) => {
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
