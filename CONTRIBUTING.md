# Contributing

## How Can I Contribute?

This project always welcomes the following contributions:

- [Opening issues](https://github.com/kleiderer/microsoft_graph_cli/issues/new) for any problems, bugs, or feature requests
- Finding and linking duplicate issues.
- Improved test coverage (especially on files with no coverage)
- Improved documentation (especially clarifications, tutorials, and examples)
- Improved error handling and messaging (especially when it improves the user experience)
- Performance improvements (with reasonable maintainability and readability tradeoffs)
- Minor refactoring (especially when it improves adherence to the [Deno Style Guide](https://deno.land/manual/contributing/style_guide))

The following contributions are encouraged, but should be discussed in an issue before starting work:

- Major refactoring
- Support of additional Microsoft Graph endpoints
- Implementing untriaged feature requests

After you contribute in any way, please add yourself as a contributor via the [@all-contributors bot](https://allcontributors.org/docs/en/bot/usage)!

## Helpful Resources

If you're new to Open Source, please read [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

If you're new to programming, please read [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

If you're a JavaScript developer and are new to TypeScript, please read [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

If you're new to Deno, please read the [Getting Started
](https://deno.land/manual@master/getting_started) guide and the [Deno Style Guide](https://deno.land/manual/contributing/style_guide).

## Developer Setup

1. Follow the [Remote Containers Getting Started Guide](https://code.visualstudio.com/docs/remote/containers#_getting-started). (You may use another code editor or IDE, but you're on your own. You can refer to the [Dockerfile](.devcontainer/Dockerfile) for environment information)
1. Fork [this repository](https://github.com/kleiderer/microsoft_graph_cli).
1. Clone your forked repository.
   - SSH: `git clone git@github.com:USERNAME/microsoft_graph_cli.git`
   - HTTPS: `git clone https://github.com/USERNAME/microsoft_graph_cli.git`
1. Open the your cloned repository in Visual Studio Code.
1. Wait for container to build
1. Ensure tests pass locally: `deno test`
1. Make your changes and commit with `npx cz` or manually specify a commit message following the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#summary).

If you experience problems with any of the above, please [open an issue](https://github.com/kleiderer/microsoft_graph_cli/issues/new). While we might not be able to help solve every problem, we should be able to help with problems caused by our own repository.

## Submitting a Pull Request (PR)

If you're not sure how to submit a pull request, please see [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

### Before Submitting a PR:

- Ensure all commit messages follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#summary).
- Ensure all tests pass by running `deno test`.
- Ensure you've read and followed the [Deno Style Guide](https://deno.land/manual/contributing/style_guide).
- Ensure you resolve any issues discovered by running `deno fmt` and `deno lint --unstable`.
- Ensure you've made a best effort attempt to add test coverage. Test coverage is highly encouraged. In some cases, it might not make sense or be feasible to add coverage.
- Ensure you've updated any relevant documentation in the [README](README.md).
  - Note that the [README](README.md) is generated from the template located in `.templates/README.md`.
  - If you've added or removed dependencies, please update the Acknowledgements section.
  - If you've used any additional resources or projects, please update the Acknowledgements section.
  - If you've made changes that require additional permissions or add use cases for existing permissions, please note the new reasons in the Permissions section.
- Ensure you've updated any examples requiring updates in light of your changes.

### What to Expect After Submitting a PR:

1. Please ensure your PR passes the checks listed at the bottom of the page.
1. A maintainer will review your PR at their earliest convenience.
1. If appropriate, the maintainer will leave comments to discuss your changes or to request updates.
1. If/when all checks pass and the maintainer is happy with your changes, they will merge your changes into the main branch.
1. After the merge, your changes will be included in the next release of this project.
1. Lastly, you will be added to the all-contributors list as an official contributor. **Congratulations!**

## Sync Your Fork

As this repository progresses, your fork may become outdated. To sync upstream changes into your fork, run:

```
git remote add upstream git@github.com:blitz-js/blitz.git
git fetch upstream
git merge upstream/main
```
