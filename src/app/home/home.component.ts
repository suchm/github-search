import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IssueListComponent } from "../results/issues/issue-list/issue-list.component";
import { CodeListComponent } from '../results/code/code-list/code-list.component';
import { CommitsListComponent } from '../results/commits/commits-list/commits-list.component';
import { ReposListComponent } from '../results/repos/repos-list/repos-list.component';
import { TopicsListComponent } from '../results/topics/topics-list/topics-list.component';
import { UsersListComponent } from '../results/users/users-list/users-list.component';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IssueListComponent,
    CodeListComponent,
    CommitsListComponent,
    ReposListComponent,
    TopicsListComponent,
    UsersListComponent,
    SearchComponent,
    CommonModule,
    MatPaginator
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  githubApiService: GithubApiService = inject(GithubApiService);
  results: any = []; // Add this property to store the search results
  query: string | null = '';
  selectedOption: string = 'issues';
  totalResults: number = 0;
  pageSize: number = this.githubApiService.DEFAULT_PAGE_SIZE;
  currentPage: number = this.githubApiService.DEFAULT_PAGE;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.pageSize = this.githubApiService.getStoredPageSize();
    this.currentPage = this.githubApiService.getStoredPage();
  }

  onSearchResult(result: {
    data: any[],
    type: string,
    currentPage: number,
    pageSize: number,
    totalResults: number,
    query: string
  }) {
    this.results = result.data;
    this.selectedOption = result.type;
    this.currentPage = result.currentPage;
    this.pageSize = result.pageSize;
    this.totalResults = result.totalResults;
    this.query = result.query;

    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.paginator.length = this.totalResults;
    }
  }

  searchRequest() {
    if (this.query && this.query.trim().length > 0) {
      this.loading = true;

      this.githubApiService.searchRequest(
        this.query,
        this.selectedOption,
        this.currentPage,
        this.pageSize
      ).subscribe({
        next: (data: any): void => {
          this.results = data.items;
          this.totalResults = data.total_count;
          this.loading = false;
        },
        error: (error): void => {
          this.loading = false;
        }
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1; // GitHub API pages start at 1
    this.searchRequest(); // Call search with the new pagination settings
  }
}
