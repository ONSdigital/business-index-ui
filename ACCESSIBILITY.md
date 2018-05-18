# Business Index User Interface Accessibility

This README will hold details of the steps that are taken to ensure that this user interface is accessible to all users.

## Using a Relevant `document.title`

As React uses a Single Page Application architecture, the one `index.html` page that contains the document title is used across all pages within the application. We use [react-document-title](https://github.com/gaearon/react-document-title) to make using a specific title per page easier, by doing the following:

```javascript
import React from 'react';
import DocumentTitle from 'react-document-title';

const NewPage = () => (
  <DocumentTitle title="Business Index - New Page">
    <h1>New Page</h1>
  </DocumentTitle>
);

export default NewPage;
```

## eslint-plugin-jsx-a11y

During development, it is recommended for developers to use ESLint, which will pick up on our ESLint configuration (see [.eslintrc.json](./.eslintrc.json)) and highlight any parts of the code that violate the rules specified in the config file. We specify some custom rules, but most rules come from extending the [AirBnB](https://github.com/airbnb/javascript/tree/master/react) linter configuration, which defines a useful set of defaults.

It includes `eslint-plugin-jsx-a11y`, which checks the code for accessibility issues. It helps to remind developers to use [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) labels, alt tags and other accessibility best practices.

## Lighthouse in Chrome DevTools

[Lighthouse](https://developers.google.com/web/tools/lighthouse/#devtools), which can be run from within the Chrome developer tools (in the Audit section), can be run during local development to see how the user interface functions under a variety of different scenarios, to check for best practices, accessibility, performance and other metrics.

Running Lighthouse will give tips on how to improve functionality of the user interface. To generate a HTML page report, you can download the [Lighthouse extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related).

Note: to get a representative view of how the user interface will perform in production, make sure to run Lighthouse using the production server (using `npm start`), rather than using the React developer server.

## Useful Resources

- [React Accessibility Docs](https://reactjs.org/docs/accessibility.html)
- [ARIA Labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)