Contributing guidelines
=======================

### Git workflow

* We use git-flow - create a feature branch from `develop`, e.g. `feature/new-feature`
* Pull requests must contain a succinct, clear summary of what the user need is driving this feature change
* Ensure your branch contains logical atomic commits before sending a pull request - follow the [alphagov Git styleguide](https://github.com/alphagov/styleguides/blob/master/git.md)
* You may rebase your branch after feedback if it's to include relevant updates from the develop branch. We prefer a rebase here to a merge commit as we prefer a clean and straight history on develop with discrete merge commits for features

### Javascript Style

* We use the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript)
* You can use eslint to lint your code using the `npm run-script lint` command
* To use linting as you write code, find the correct [ESLint add-on](http://eslint.org/docs/user-guide/integrations) for your editor

### Accessibility

* We use [react-a11y](https://github.com/reactjs/react-a11y) which throws warnings in the console if any accessibility issues are encountered.
* Look at the [Facebook documentation](https://facebook.github.io/react/docs/accessibility.html) for more information about accessibility and React.
