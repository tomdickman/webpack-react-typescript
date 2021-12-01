# Setting up a React/TypeScript project using Webpack and Yarn

Last Updated: 2021-12-01

This is a basic setup repository designed to outline what is required to set up a basic React and Typescript project using Yarn (specifically Yarn 2) for package management and WebPack for bundling.

## Install Yarn

First things first, you need `yarn` installed (you need `npm` installed to carry this out):
```bash
npm -g install yarn
mkdir <project-name>
cd <project-name>
yarn init
yarn set version berry # Upgrade to Yarn2
yarn set version stable # Upgrade to the latest release of Yarn2
```

Yarn 2 has a lot of things we do and a lot of things we don't want to commit to our Git history, so let's add all of the config to out `.gitignore` and ignore the paths we don't want:
```yml
# Yarn 2
.yarn/*
!.yarn/cache/
!.yarn/releases/
!.yarn/plugins/
!.yarn/versions/
!.yarn/sdks/
```

This we leave us with the main thing we do want, `build-state.yml` which keeps track of our build hash, for caching.

## Install React, TypeScript and Webpack

Now we need the modules for React, TypeScript and Webpack, so install these via:
```bash
yarn add react react-dom
yarn add ts-loader css-loader style-loader html-webpack-plugin source-map-loader typescript webpack webpack-cli clean-webpack-plugin --dev
```
__Note__: We aren't installing any typescript type definitions, we won't need these with Yarn 2

What do all of these modules do?:
`ts-loader`: Webpack plugin for bundling typescript
`css-loader`: Webpack plugin for bundling CSS
`style-loader`: Webpack plugin for bundling `<style>` tags
`html-webpack-plugin`: Webpack plugin generating HTML with bundled JS in `<script>` tags
`source-map-loader`: Webpack plugin for extracting source maps
`typescript`: Adds types to javascript
`webpack`: Our bundler, for bundling all of you code into a distributable minified JS file
`clean-webpack-plugin`: Cleans up webpack output
`pnp-webpack-plugin`: Used to tell webpack where to find modules, as we use Yarn 2 and they aren't in the _node\_modules_ directory
