
This project is property of sioblog.com.
This project is intended for coding avaliation purposes only.
Code written by Hugo Magalhães <hugomn@gmail.com>.

## Getting Started

## Testing

Sioblog.com contains two kind of tests: Unit tests and End to End tests.

### Running Unit Tests

Unit tests are written in [Jasmine][jasmine], which we run with the
[Karma Test Runner][karma].

* the configuration is found at `karma.conf.js`
* the unit tests are found in /test/unit folder.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

### End to end testing

We also use end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  
It uses native events and has special features for Angular applications.

* the configuration is found at `protractor-conf.js`
* the end-to-end tests are found in `test/e2e/`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor can interact with it.

```
npm start
```

Once you have ensured that the development web server hosting our application is
up and running you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

## Development guidelines

### Commit message

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

Example: feat(11814): recently viewed carousel change
Any line of the commit message cannot be longer 100 characters!

#### Type

Must be one of the following:

feat: A new feature (usually a Mingle story)
fix: A bug fix (usually a Defect)
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug or adds a feature
perf: A code change that improves performance
test: Adding missing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope could be anything specifying place of the commit change. For example Trello card number, module: home, event, profile, etc...

#### Subject

The subject contains succinct description of the change. Use the imperative, present tense: "change" not "changed" nor "changes". Don't capitalize first letter an no dot (.) at the end.

#### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes" The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about breaking changes.
