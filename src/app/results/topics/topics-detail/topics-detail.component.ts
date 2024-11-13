import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {GithubApiService} from '../../../github-api.service';
import {SearchComponent} from '../../../search/search.component';

@Component({
  selector: 'app-topics-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    SearchComponent
  ],
  templateUrl: './topics-detail.component.html',
  styleUrl: './topics-detail.component.scss'
})
export class TopicsDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  issueDetail: any = {};

  ngOnInit(): void {
    const topicsId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(topicsId).subscribe((data) => {
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
