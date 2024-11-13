import {Component, Output, EventEmitter, OnInit, inject} from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatPaginator, } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    FormsModule,
    MatToolbar,
    MatRadioGroup,
    MatRadioButton,
    MatPaginator
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  route: ActivatedRoute  = inject(ActivatedRoute );
  searchQuery: string = '';
  selectedOption: string = 'issues'; // Set the default option here
  pageSize: number = 20;
  currentPage: number = 1;

  // Emit search results to parent component
  @Output() searchResult = new EventEmitter<{
    data: any[],
    type: string,
    currentPage: number,
    pageSize: number,
    totalResults: number,
    query: string
  }>();

  constructor(private githubApiService: GithubApiService) {}

  ngOnInit(): void {
    this.searchQuery = this.githubApiService.getStoredQuery() || '';
    this.pageSize = this.githubApiService.getStoredPageSize();
    this.currentPage = this.githubApiService.getStoredPage();
    this.selectedOption = this.githubApiService.getSelectedOption();

    const currentPath = this.route.snapshot.routeConfig?.path;

    if ( currentPath === '' ) {
      this.onSearch();
    }
  }

  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {

      this.githubApiService.searchRequest(
        this.searchQuery,
        this.selectedOption,
        this.currentPage,
        this.pageSize
      ).subscribe((data: any): void => {

        this.searchResult.emit({
          data: data.items,
          type: this.selectedOption,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          totalResults: data.total_count,
          query: this.searchQuery
        }); // Emit results to AppComponent

      });

    }
  }
}
