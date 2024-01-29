**CDISC Wrapper**, an open source desktop application, aiming to empower users in managing validation rules effortlessly and therefore prepare clinical studies for submission to regulatory agencies seamlessly and with confidence. 

It provides a user-friendly interface to open source [CDISC Conformance Rules](https://www.cdisc.org/core) therefore following the industry best practices in all data exchange scenarios.

It supports macOS and Windows operating systems. 

![Slide1](https://github.com/epam/cdisc_validator/assets/94456277/e043cdca-7624-439e-a57b-07615d47a6c4)

**Learn more about CDISC Wrapper** by reading [our product sheet](https://github.com/epam/cdisc_validator/files/14088067/CDISC_Wrapper_Brochure.pdf) or watching this [recording](https://epam.sharepoint.com/:v:/r/sites/EPAMCDISCMicrosoft-CORE/Shared%20Documents/General/For%20DEMO/Demo_video.mp4?csf=1&web=1&e=JaSh7z&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D).

## Project Overview

**Product Name:** epam-cdisc-electron

**Version:** 0.6.0

**CDISC Rules Engine:** 0.5.1

**Phase:** preMVP

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [CDISC Rules Engine](#cdisc-rules-engine)
  - [Development](#development)
  - [Production](#production)
- [Technologies](#technologies)
- [Application architecture](#application-architecture)
  - [Application structure](#application-structure)
   - [Modules overview](#modules-overview)
   - [Folder structure](#folder-structure)
- [Modules](#modules)
   - [Common](#common)
   - [Renderer](#renderer)
   - [Main](#main)
   - [Resources](#resources)
- [Application's files and logs](#applications-files-and-logs)
- [Packaging and distributions](#packaging-and-distributions)
    - [Packaging](#packaging)
    - [Distributions](#distributions)
- [Code sign and notarizing](#code-sign-and-notarizing)
    - [Windows](#windows)
    - [MacOS](#macos)

## Getting started

Require [npm](https://www.npmjs.com/) and [node.js v14.18.1](https://nodejs.org/download/release/v14.18.1/). The easiest way to deal with node.js install [nvm](https://github.com/nvm-sh/nvm) and after installing just run `nvm use`. This command will pick up the version which is used in this project and specified in .nvmrc file. It may throws error, this is totally ok behavior, just follow instructions in terminal and install missing version

### Installation

```text
npm install
```

### CDISC Rules Engine

You need to setup CDISC engine locally, follow [the link](https://github.com/cdisc-org/cdisc-rules-engine/releases) and download required version according to your OS. Unzipped engine should be in the **resources** folder

### Development

```text
npm run dev
```

### Production

```text
npm run build
npm run start
```

## Technologies

| Type       | Technologies                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| Core       | [ElectronJS](electronjs.org)                                                                               |
| Backend    | [Node.js](https://nodejs.org)                                                                              |
| Frontend   | [React](https://reactjs.org/) + [TS](https://www.typescriptlang.org/) + [Webpack](https://webpack.js.org/) |
| UI Library | [Material UI](https://mui.com/material-ui/getting-started/overview/)                                       |
| Styling    | [Styled Components](https://styled-components.com/)                                                        |
| Building   | [Electron Forge](https://www.electronforge.io/)                                                            |


## Application architecture

![Electron Architecture - Frame 2.jpg](./docs/electron%20architecture%20-%20frame%202.jpg)

## Application structure

### Modules overview

-   **Common** includes types, constants, and utilities used by both the main and the renderer modules
-   **Renderer** is the react app that is responsible for UI inside app window
-   **Resources** includes CDISC Rule Engine(executable) and support files
-   **Main** is a core part of the app. That part is entry point to app and is responsible for core functional, management of app lifecycle, communication with OS and CDISC Rule Engine

### Folder structure

![Electron Architecture - Frame 3.jpg](./docs/electron%20architecture%20-%20frame%203.jpg)

## Modules

### Common

-   **constants** - constants used by both the main and the renderer modules
-   **types** - types used by both the main and the renderer modules
-   **utils** - utils used by both the main and the renderer modules

### Renderer

-   **constants** - constants used by the renderer module
-   **connectors** - connectors introduced as intermediate level between main module and UI. If sometime in the future we will want to change the way we communicate with backend, we will only need to change such connectors
-   **components** - UI components
-   **types** - types used by the renderer module
-   **hooks** - hooks used by the renderer module
-   **pages** - pages of the application
-   **redux** - store and actions
-   **ui-kut** - elementary components such as buttons, inputs, and others
-   **style** - contain global styles and style variables
-   **utils** - utils used by the renderer module
-   **init scripts** - entry point of react app, initializing, html template, and others

### Main

-   **constants** - constants used by the main module
-   **store** - permanent store(using config.json) and actions
-   **core** - core functional which presented as managers
-   **types** - types used by the main module
-   **utils** - utils used by the main module
-   **init scripts** - entry point of entire app, initializing, ipc handlers, preload script, and others

### Resources

-   **core-win** - CDISC engine for Windows
-   **core-mac** - CDISC engine for MacOS
-   **support files** - report template

## Application's files and logs

 - **MacOS** - `~/Library/Application Support/epam-cdisc-electron`
 - **Windows** - `%USERPROFILE%\AppData\Roaming\epam-cdisc-electron`

## Packaging and distributions

### Packaging

After running commands you can find packaged application in **out** folder

```text
npm run build
npm run package
```

### Distributions

After running commands you can find distributed application in **out -> make** folder.

_For macOS this take a time, because we are signing and notarizing application by Apple's services_

```text
npm run build
npm run make
```

## Code sign and notarizing

### Windows

We do not have a flow because there is not a big issue with running the application

### MacOS

For macOS we have to use Apple's services which means we have to be a part of Apple Developer Program. For detailed information follow to [documentation](https://www.electronforge.io/guides/code-signing/code-signing-macos)
