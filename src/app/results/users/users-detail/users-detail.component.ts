import {Component, inject, OnInit} from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SearchComponent} from '../../../search/search.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GithubApiService} from '../../../github-api.service';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    SearchComponent
  ],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss'
})
export class UsersDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  issueDetail: any = {};

  ngOnInit(): void {
    const usersId = Number(this.route.snapshot.params['id']);
    this.githubApiService.getSearchItemById(usersId).subscribe((data) => {
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
