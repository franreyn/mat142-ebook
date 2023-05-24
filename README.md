# Math 142 - eBook 


## Widgets

`.quarter-size .image-xxx`

Adding both the classes to a `side-by-side` container, quarter size and either `image-first` or `image-second` will create a side by side container that will adjust the spacing so that the image takes up a quarter of the total width.

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

`.math-normal`

Adds the default `font-size:114%` to the math jacks.

`.math-width-1`

Adds `1em` to the math jacks width to avoid scrolling. 

`.math-width-1-5`

Adds `1.5em` to the math jacks width to avoid scrolling.

`.math-width-1-75`

Adds `1.75em` to the math jacks width to avoid scrolling.

`.math-width-2`

Adds `2em` to the math jacks width to avoid scrolling.

`.disclaimer`

Text that is only visible when the screen is under `500px`

### Image Styles

`.width-xxx`

This places a max width on the image. You can select from `100` to `900` (increments of 100) to specify the width.