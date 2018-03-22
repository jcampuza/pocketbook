# Pocketbook

A small chrome extension (other browsers pending investigation) to store handy scripts that you may want to run at the click of a button.

Pocketbook is built in Javascript with React, Styled Components, and Mobx.

# Motivation

Often times as a frontend developer we may write scripts to run in the console to enhance our workflows. Examples might be -> Enable feature flags, enable debug mode in some frameworks, automate a workflow (My initial motivation), add borders around elements, etc. Many times I find myself saving these scripts somewhere for later.

That's where pocketbook comes in. You can keep your scripts saved and not have to worry about copying and pasting them in the console, or even opening the console at all in some cases. Editor integration is built in, so you can write your scripts directly in the extension in a familiar environment. Give them a title, description, and the script definition and its ready to run at the click of a button.

# Installation

1.  Clone the repository.
2.  Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3.  Run `yarn`.
4.  Run `yarn start`
5.  Load your extension on Chrome following:
    1.  Access `chrome://extensions/`
    2.  Check `Developer mode`
    3.  Click on `Load unpacked extension`
    4.  Select the `build` folder.
