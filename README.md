# Topics in Math eBook 

Topics in Math is an online-based textbook developed by Pima Community College. This ebook uses
Netlify to build and deploy the code for the website. 


## What's Included

### Dependencies 
- Git
- Node.js
- Gulp.js

## Npm Commands

`npm run dev`

This command will build and compile the code you have locally into the dist folder.

`npm run build`

This command will build the code, install the necessary npm dependencies, and build the navigation using buildNav.js.

## CSS

*styles.css*

Contains all the styles for the ebook including for the navigation, typography, and layout.

## JS

*scripts.js*

Contains all the JavaScript for the application. The logic for page switching, indexing the navigation, adjusting dark and light mode, as well as other functionality.

## Available styles

### Table Styles 

`.not-fixed`

Used for tables, this class will help with any tables where the cells cut off text and are set at a fixed width. This class will allow some auto-sizing for the cells and ensure that the text fits inside the cell.

`.small-text`

This will change the text size and help some tables with long text to fit better in the ebook

`.cell-hover`

This will change the selection for the table to be a <td> or table cell instead of a <tr> or table row, highlighting only the cell that the user hovers over.

### Button Styles

`.exmple-answer`

This class is used for example answers to have a border around them when expanded. (Add to div with the class .`js-to-expand` for correct usage)

### Text Styles 

`.math-small`

Changes the font size to 16px which should be small enough for the items to fit within the screen.

`.math-extra-small`

Changes the font size to 14px which can be used for extra long expressions.

## Authors

Center for Learning Technology at Pima Community College

## License

Code is released under the MIT license.