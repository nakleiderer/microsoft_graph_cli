# microsoft-graph-cli

[![Deno CI](https://github.com/nakleiderer/microsoft-graph-cli/workflows/Deno%20CI/badge.svg)](https://github.com/nakleiderer/microsoft-graph-cli/actions)
[![GitHub](https://img.shields.io/github/license/nakleiderer/microsoft-graph-cli)](https://github.com/nakleiderer/microsoft-graph-cli/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/nakleiderer/microsoft-graph-cli)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

**An unofficial command line utility for accessing the [Microsoft Graph](https://developer.microsoft.com/en-us/graph), written with Deno and Typescript**

## Installation

### Before You Get Started

Ensure Deno 1.5.4 installed. If you don't have Deno installed yet, follow the [Deno installation guide](https://deno.land/manual@v1.5.4/getting_started/installation).

This CLI _should_ work on Mac OS, Linux, and Windows operating systems. However, it has only been tested on macOS Catalina v.10.15.7. If you run into any problems, please [open an issue](https://github.com/nakleiderer/microsoft-graph-cli/issues/new).

### Use Deno Install (Preferred)

If you'd like to install this project as an executable in your path, run:

`deno install --unstable [permissions] -n mgraph https://deno.land/x/microsoft_graph_cli@v0.0.0-development/cli.ts`

- Replace `[permissions]` in this command with any permissions you wish to grant to the CLI. See [Permissions](#Permissions) for all optional and required permissions and their rationale. Example: `--allow-net --allow-read --allow-write`
- (Optional) If you would like to grant all permissions to this CLI, you may replace `[permissions]` with `--allow-all`. This will prevent errors if future versions require new permissions, but is considered less secure.
- (Optional) You may install this cli with a different executable name by replace `mgraph` with a name of your choice. If you do so, make sure to replace `mgraph` with your selected name in all usage examples.
- (Optional) You may install any [released version](https://github.com/nakleiderer/microsoft-graph-cli/releases) of this CLI by changing `v0.0.0-development` to the desired version.

### Use Deno Run

If you don't wish to [use deno install](#use-deno-install-preferred), replace any instances of `mgraph` in the usage examples with:

`deno run --unstable [permissions] https://deno.land/x/microsoft_graph_cli@v0.0.0-development/cli.ts`

- Replace `[permissions]` in this command with any permissions you wish to grant to the CLI. See [Permissions](#Permissions) for all optional and required permissions and their rationale. Example: `--allow-net --allow-read --allow-write`
- (Optional) If you would like to grant all permissions to this CLI, you may replace `[permissions]` with `--allow-all`. This will prevent errors if future versions require new permissions, but is considered less secure.
- (Optional) You may use any [released version](https://github.com/nakleiderer/microsoft-graph-cli/releases) of this CLI by changing the `v0.0.0-development` to the desired version.

### Updating

If you've previously installed with [deno install](#use-deno-install-preferred), you may update by adding the `-f` flag to the command:

`deno install --unstable [permissions] -n mgraph -f https://deno.land/x/microsoft_graph_cli@v0.0.0-development/cli.ts`

- Replace `[permissions]` in this command with any permissions you wish to grant to the CLI. See [Permissions](#Permissions) for all optional and required permissions and their rationale. Example: `--allow-net --allow-read --allow-write`
- (Optional) If you would like to grant all permissions to this CLI, you may replace `[permissions]` with `--allow-all`. This will prevent errors if future versions require new permissions, but is considered less secure.
- (Optional) You may install this cli with a different executable name by replace `mgraph` with a name of your choice. If you do so, make sure to replace `mgraph` with your selected name in all usage examples.
- (Optional) You may install any [released version](https://github.com/nakleiderer/microsoft-graph-cli/releases) of this CLI by changing the `v0.0.0-development` to the desired version.

If you use the [deno run](#use-deno-install-preferred) installation option, simply change the `v0.0.0-development` to the [latest release](https://github.com/nakleiderer/microsoft-graph-cli/releases/latest) when you next run the program.

## Usage

Run `mgraph --help` for a full list of all commands and parameters.

## Permissions

The following permissions are used by this CLI for the following reasons:

| Name          | Reason                                                                        |
| ------------- | ----------------------------------------------------------------------------- |
| --allow-env   | Detect the cache directory to cache tokens and maintain login state.          |
| --allow-net   | Make API calls to the Microsoft Graph.                                        |
|               | Host a local server for interactive authentication.                           |
| --allow-read  | Read cached tokens and maintain login state.                                  |
|               | Read configuration files.                                                     |
|               | Output results to files.                                                      |
| --allow-run   | Automatically open the user's default browser for interactive authentication. |
| --allow-write | Cache tokens and maintain login state.                                        |
|               | Output results to files.                                                      |

## Acknowledgements

The following projects and resources made this project possible (alphabetical order):

- [all-contributors](https://github.com/all-contributors/all-contributors): Generates the Contributors badge and lists contributors in the readme.
- [Cliffy](https://github.com/c4spar/deno-cliffy): Command line framework for deno
- [Deno](https://deno.land/): The runtime and a dependency host for this project.
- [deno_cache_dir](https://github.com/justjavac/deno_cache_dir): Returns the path to the user's cache directory.
- [deno_free_port](https://github.com/axetroy/deno_free_port): Gets an available port.
- [Microsoft Graph JavaScript Client Library](https://github.com/microsoftgraph/msgraph-sdk-javascript)
- [Microsoft Graph TypeScript Types](https://github.com/microsoftgraph/msgraph-typescript-typings): Provides TypeScript definitions for Microsoft Graph objects.
- [oak](https://github.com/oakserver/oak): A middleware framework for Deno.
- [OAuth2 Client for Deno](https://github.com/cmd-johnson/deno-oauth2-client): A minimalist OAuth 2.0 client for Deno.
- [opener](https://github.com/TanishShinde/opener): Opens URLs in the user's default browsers.
- [Skypack](https://www.skypack.dev/): Hosts NPM packages compiled as ES Modules enabling the use of some NPM packages in Deno.
- [TypeScript](https://www.typescriptlang.org/): The primary programming language for this project.

_(If you feel an acknowledgement is missing, please [open an issue](https://github.com/nakleiderer/microsoft-graph-cli/issues/new) explaining the missing project or resource and we'll update the list.)_

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! If you would like to contribute to this project, please see the [contributing documentation](CONTRIBUTING.md).

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kleiderer.com/"><img src="https://avatars0.githubusercontent.com/u/4278631?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Kleiderer</b></sub></a><br /><a href="https://github.com/nakleiderer/microsoft-graph-cli/commits?author=nakleiderer" title="Code">💻</a> <a href="https://github.com/nakleiderer/microsoft-graph-cli/commits?author=nakleiderer" title="Documentation">📖</a> <a href="#ideas-nakleiderer" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/nakleiderer/microsoft-graph-cli/pulls?q=is%3Apr+reviewed-by%3Anakleiderer" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

_(If you have contributed anything to this project and your name is missing, please [open an issue](https://github.com/nakleiderer/microsoft-graph-cli/issues/new) referencing your contributions and we'll update the list.)_

## Notice of Non-Affiliation and Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Microsoft, or any of its subsidiaries or its affiliates. The official Microsoft Graph CLI may be found at https://github.com/microsoftgraph/msgraph-cli

The name Microsoft as well as related names, marks, emblems and images are registered trademarks of their respective owners.

## License

This project is available under the MIT license. See [LICENSE](LICENSE) for the full license.
