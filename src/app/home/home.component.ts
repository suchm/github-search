import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ListInputs } from '../list-inputs';

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
    MatPaginator,
    MatProgressSpinner
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  githubApiService: GithubApiService = inject(GithubApiService);

  // Search params
  results: any[] = [];
  searchQuery: string = '';
  selectedOption: string = this.githubApiService.getStoredSearchOption();
  pageSize: number = this.githubApiService.getStoredPageSize();
  currentPage: number = this.githubApiService.getStoredPage();
  totalResults: number = 0;

  wordLimit: number = this.githubApiService.getStoredWordLimit();
  loading: boolean = false;
  listComponent: any = null;
  waitingResults: boolean = true;

  listInputs: ListInputs = {
    results: this.results,
    page: this.currentPage,
    perPage: this.pageSize,
    limit: this.wordLimit
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.updatePaginator(); // Safe to use paginator here
  }

  onSliderValueChange(value: number): void {
    this.wordLimit = value; // Update sliderValue whenever it changes in the SearchComponent
    this.updateListComponent();
  }

  onSearchResult(result: {
    data: any[],
    type: string,
    currentPage: number,
    pageSize: number,
    totalResults: number,
    query: string
  }) {
    this.waitingResults = false;
    this.results = result.data;
    this.selectedOption = result.type;
    this.currentPage = result.currentPage;
    this.pageSize = result.pageSize;
    this.totalResults = result.totalResults;
    this.searchQuery = result.query;

    this.updatePaginator();
    this.updateListComponent();
  }

  searchRequest() {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      this.loading = true;

      this.githubApiService.searchRequest(
        this.searchQuery,
        this.selectedOption,
        this.currentPage,
        this.pageSize
      ).subscribe({
        next: (data: any): void => {
          this.results = data.items;
          this.totalResults = data.total_count;
          this.loading = false;

          this.updatePaginator();
          this.updateListComponent();
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

  getListComponent() {
    const componentMappings: { [key: string]: any } = {
      issues: IssueListComponent,
      code: CodeListComponent,
      commits: CommitsListComponent,
      repositories: ReposListComponent,
      topics: TopicsListComponent,
      users: UsersListComponent,
    };
    return componentMappings[this.selectedOption] || null;
  }

  updatePaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.paginator.length = this.totalResults;
    }
  }

  updateListComponent() {
    this.listInputs = {
      results: this.results,
      page: this.currentPage,
      perPage: this.pageSize,
      limit: this.wordLimit
    }
    this.listComponent = this.getListComponent();
  }
}
