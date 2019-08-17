# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this little video
[How to Contribute to an Open Source Projects](https://www.youtube.com/watch?v=0_u8OPQ4-NM)

## Project setup

1. Fork and clone the repo
2. `npm install` to install dependencies
3. `npm run test:watch` to validate you've got it working while working!
4. Create a branch for your PR

## Making changes

- All changes should have unit tests
- Any relevant documentation should be updated
- No linting warnings/errors should be introduced

### New Matchers

- Each matcher should be placed in it's own file inside of the `matchers` directory.
- A matcher should export an object with two properties `symmetric` and `asymmetric` which should contain the following:
  - `symmetric` should contain a function that returns [{pass, message} like the Jest API specifies](https://jestjs.io/docs/en/expect.html#custom-matchers-api) with the same name as the symmetric matcher
  - `asymmetric` - Should export a class that has same name as asymmetric matcher which:
    - has the property `$$typeof` === `Symbol.for("jest.asymmetricMatcher")`
    - its constructor must accept both `expected` and `inverse` (boolean).
    - Finally it needs to implement a `asymmetricMatch` method that receive `received` arguments and compares and inverses if necessary
    - Optional but highly recommended: `toAsymmetricMatcher` allows the matcher to customize the output that will be displayed
    - Sadly the above isn't really documented in Jest yet so hopefully this helps out, feel free to message me or open an issue with questions!
- [`jest-matchers-utils`](https://github.com/facebook/jest/tree/master/packages/jest-matcher-utils) is being used for syntax highlighting of error messages.
  - See the Jest docs for an [example usage](https://facebook.github.io/jest/docs/en/expect.html#thisutils)
- [`lodash`](https://npm.im/lodash) is being used for most comparison logic.

## Committing and Pushing changes

Once you are ready to commit the changes, please use the below commands

1. `git add <files to be committed>`
2. `git commit -m 'A meaningful message`
