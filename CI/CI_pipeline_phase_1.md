# Phase 1 of the CI/CD pipeline

## Linting and code style enforcement
- There is currently an action built for the collection\_team branch that automatically parses through javascript files and ensures that they are agreeing to the backend house style for javascript that is located in [Backend House Style](/specs/house_styles/backend_house_style.md).
	- This action is called everytime someone pushes to the collection\_team branch.
- There will be probably another action built for html and perhaps css, but that might change.

## Code quality via tool
- We are using Codeclimate to review the code quality using a tool.
	- The link to the Codeclimate page for the repo is: https://codeclimate.com/github/Max-Edelson/cse110-sp21-group16

## Code Quality via human review
- We have not progressed far enough as of yet to begin to forsee the usage of pull requests for our repo, however, we will likely decide on a code of usage for pull requests in the near future.

## Unit tests via automation
- We are currently planning on integrating Jest to unit test via automatic actions in the near future.

## Documentation generation via automation
- We are going to try to figure out how to get JSDocs to automatically generate documentation for our code through the use of an action.
