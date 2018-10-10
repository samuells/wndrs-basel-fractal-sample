If you want to configure MMENU widget, than use CUSTOM build from the widget.
- more info -> http://mmenu.frebsite.nl/documentation/custom-build.html

## Step by step to build mmenu js and css
* go into the : `$ {project-root}/node_modules/jquery.mmenu`
* first time - install node modules : `$ npm install`
* build custom widget : `$ gulp --custom ../../web/themes/custom/wndrs/components/03-functional-patterns/menus/top-navigation`
* you are done

## Configuration
You can change the widget configuration in these two files
* `_build.json`
* `_variables.scss`
