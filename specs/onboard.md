# Onboarding Information

## Meeting Notes Instructions
Whenever meeting to discuss project-related issues, one should make meeting notes that notes when the meeting took place, who was present, who was absent (and should have been there), and agenda, and all relevant discussion notes.
These meeting notes belong in the ```main``` branch in ~/admin/meeting/ and should have the form ```MM-DD-YYYY_XXXX_XXXX.md```.
If a video is recorded of a meeting the video file may be added to ~/admin/videos/, but a YouTube link must be added to [video_links.md](https://github.com/Max-Edelson/cse110-sp21-group16/blob/main/admin/videos/video_links.md).

## Pull Requests and Issues
Pull requests and issues should be assigned to any and all involved parties, given concise titles, and be given good descriptions. Both the titles and the descriptions should be in present tense and start with a capital letter. If they are on a general theme, then the title should follow: ```THEME: ......```
Example: ```BUG FIX: Fixing Item objects not saving.``` When merging to the ```main``` branch, two approvals are needed to merge as a form of code quality control.

## Commits
Commits should be in present tense and start with a capital letter.

## Branches
There should never be any redundant branches and branches created with the sole purpose of merging into the main branch should be swiftly deleted after the pull request has been merged. As soon as a branch is no longer relevant, it should be merged (if necessary) and then deleted from the remote repository.
Branche names should be all lowercase and words should be seperated with hyphens (-).

## Common Coding Style
Coding style rules can found [here](https://github.com/Max-Edelson/cse110-sp21-group16/blob/main/specs/house_styles/backend_house_style.md).
The rules that the autolinter abides by can be found [here](https://github.com/Max-Edelson/cse110-sp21-group16/blob/collection_team/specs/house_styles/auto_linting_rules.md).

## Documentation
Automatically produced code documentation via JSdoc can be found in cse110-sp21-group16/source/documentation/. The JSdoc tags that we are using in our javascript can be found [here](https://github.com/Max-Edelson/cse110-sp21-group16/blob/collection_team/specs/house_styles/block_tags_for_jsdoc.md).

## App Building
In the root of the ```main``` branch, there is an index.html file which is loaded as the default GitHub pages page for the website. This index.html page simply redirects the the page to the [rapid log](https://github.com/Max-Edelson/cse110-sp21-group16/tree/main/source/rapid_log).

## Clone the repo
To clone the repo, simply fork it in the top right of this window, or you can create a new branch if you're part of the team.

## Label Usage
* bug
    * Used when describing a behavior or visual aspect that is not as expected.
* documentation
    * Used when discussing issues with code documentation.
* duplicate
    * Used when there is repetitive code, repetitive files, or there is simply made more of something than there should be.
* enhancement
    * Used when there is a new feature request.
* help wanted
    * Used when someone is working on a project and needs additional support.
* invalid
    * Used when something doesn't seem right.
* linting
    * Used when there is an issue with the way the repository is auto-listing code.
* question
    * Used when someone has a question.
* support
    * Used mainly by an outside party that is having issues with the application.
* unit testing
    * Used when there is a problem in the unit testing code or the general strategy of the application's unit tests.
* wontfix
    * Used to indicate that something will not be worked on.
