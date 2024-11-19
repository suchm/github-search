import {Component, inject} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {SearchComponent} from "../search/search.component";
import {Router} from '@angular/router';
import {GithubApiService} from '../github-api.service';
import {IssueDetailComponent} from '../results/issues/issue-detail/issue-detail.component';
import {CodeDetailComponent} from '../results/code/code-detail/code-detail.component';
import {CommitsDetailComponent} from '../results/commits/commits-detail/commits-detail.component';
import {ReposDetailComponent} from '../results/repos/repos-detail/repos-detail.component';
import {TopicsDetailComponent} from '../results/topics/topics-detail/topics-detail.component';
import {UsersDetailComponent} from '../results/users/users-detail/users-detail.component';

@Component({
  selector: 'app-detail',
  standalone: true,
    imports: [
        MatPaginator,
        MatProgressSpinner,
        NgComponentOutlet,
        NgIf,
        SearchComponent
    ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  router: Router = inject(Router)
  githubApiService: GithubApiService = inject(GithubApiService);
  selectedOption: string = this.githubApiService.getStoredSearchOption();

  onSearchResult(searchParams: { query: string, type: string, pageSize: number, currentPage: number }) {
    this.router.navigate(['/']);
  }

  getListComponent() {
    const componentMappings: { [key: string]: any } = {
      issues: IssueDetailComponent,
      code: CodeDetailComponent,
      commits: CommitsDetailComponent,
      repositories: ReposDetailComponent,
      topics: TopicsDetailComponent,
      users: UsersDetailComponent,
    };
    return componentMappings[this.selectedOption] || null;
  }
}
