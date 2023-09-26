# Contributing to Superb Data Kraken Frontend

Thank you for your interest in contributing to Superb Data Kraken Frontend! We value the contributions of our  
community members, and your help is essential to making this project even better.

## Table of Contents

- [Getting Started](#getting-started)
- [Reporting Bugs and Requesting Features](#reporting-bugs-and-requesting-features)
- [Contributing Code](#contributing-code)
- [Review Process](#review-process)
- [Coding Guide](#coding-guide)
- [License](#license)

## Getting Started

To contribute to Superb Data Kraken Frontend, follow these steps:

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine.

3. Install project dependencies using

    ```bash
    npm install
    ```

    in your project's root folder.

4. Create a new branch for your changes.

    ```bash
    git branch feat/your-new-feature-branch
    ```

    Checkout to your new branch.

    ```bash
    git checkout feat/your-new-feature-branch
    ```

    Or use the shorter version to create a new branch and switch to it at the same time

    ```bash
    git checkout -b fix/your-bugfix
    ```

5. Make your changes and commit them. Write clear and concise commit messages. If you are using VS Code, you  
    may want to use a template like the following:

    ```bash
    <type>: <description>
    #-------------- 50 characters ------------------|
    
    ADDED:
    -
    
    CHANGED:
    -
    
    REMOVED:
    -
    
    
    REFS: #issue number
    
    
    #--------------- 72 characters ---------------------------------------|
    
    # DESCRIPTION
    #
    # <type>:
    #
    # feat:     (new feature for the user, not a new feature for build script)
    # fix:      (bug fix for the user, not a fix to a build script)
    # docs:     (changes to the documentation)
    # refactor: (refactoring production code, eg. renaming a variable)
    # test:     (adding missing tests, refactoring tests; no production code change)
    ```

    To use this as a default in your Source Control navigation tab, just create a .gitmessage text file and copy paste the above.  
    On Windows, put this file into C:\Users\YourUserName\\.gitmessage  
    On Linux, put this file into \home\YourUserName\\.gitmessage

6. Push your changes to your fork on GitHub.

7. Create a pull request (PR) to submit your changes for review.

## Reporting Bugs and Requesting Features

If you encounter a bug or would like to request a new feature, please open an issue on our [Issue Tracker](https://github.com/EFS-OpenSource/superb-data-kraken-frontend/issues) and follow the provided template.

## Contributing Code

When contributing code, please follow these guidelines:

- Create a descriptive branch name (e.g., `feature/add-new-feature`).
- Write clear and concise commit messages.
- Keep your code style consistent with the project's coding standards (link to your style guide if available).
- Ensure all tests pass before submitting a PR.
- Submit your changes as a PR to the `develop` branch of this repository.



## Review Process

Our team will review your contributions promptly. We look for:

- Code quality and adherence to project standards.
- Clear and concise documentation (if applicable).
- Passing tests and no regressions.
- Compatibility with existing features.

Please be patient during the review process, and be prepared to make any necessary changes to address feedback.

## Coding Guide

To maintain consistency in our codebase, please refer to our [CODING_GUIDE](CODING_GUIDE.md) for coding standards and best practices.

## License

By contributing to Superb Data Kraken Frontend, you agree to license your contributions under the [project's license](LICENSE).

## Conclusion

Thank you for considering contributing to Superb Data Kraken Frontend! Your contributions are greatly appreciated, and they help make this project better for everyone. Get started today and be part of our open-source community!
