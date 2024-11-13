# GitHub Search

The GitHub Search tool is built with Angular 18, Angular Material 3 and uses the GitHub REST API to search GitHub for issues, code, commits, repos, topics and users. Just select the search option you want to use and enter a search query to search the GitHub database.

## Installation

Pre-requisites:

- Ensure Node.js is installed - https://nodejs.org/en/download/package-manager
- Ensure Angular is installed:

```bash
npm install -g @angular/cli
```

Clone the repo from https://github.com/suchm/github-search to a local repository.

cd into the repository.

Generate a `personal access token` (https://github.com/settings/tokens)

Add the token to the `githubToken` variable in `src\environments\environment.development.ts` (this token is required for the code requests).

Run the following command to build dependancies and serve the app:

```bash
npm start
```

Navigate to http://localhost:4200/ in your browser to view the app.



