# Masonry grid by Marcin Kalinowski
Plugin for fast and simple apply the masonry grid layouts

# How to use
Example configuration:
```
var masonry_grid = new MasonryGrid('.masonry-grid-element', {
   gridGap: 10,
   alignHeight: true,
   smoothPosition: true,
   smoothOpacity: true,
   breakpoints: {
      "1500": {
         columns: 5,
         gridGap: 20
      },
      "1000": {
         columns: 4,
         // gridGap: 15
      },
      "500": {
         columns: 3
      },
   },
});
```

# Options
| Option            | Type    | Default | Description                                                                                                                                                                           |
|-------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| columns           | integer | 1       | Number of columns when it is not defined in the responsiveness options                                                                                                                |
| gridGap           | integer | 0       | Space between grid elements in pixels when it is not defined in the responsiveness options                                                                                            |
| alignHeight       | boolean | false   | Aligns the height of all grid columns to the height of the highest one                                                                                                                |
| updateGridTimeout | integer | 100     | Time to update the grid layout after resizing the window given in milliseconds                                                                                                        |
| smoothPosition    | boolean | false   | Determines whether the position of grid elements should be changed smoothly                                                                                                           |
| smoothOpacity     | boolean | false   | Determines whether elements should be displayed smoothly when loading an element. for better effect, it is recommended to set the default opacity value on 0 in css for grid elements |
| breakpoints       | Object  | {}      | Here you can specify the appearance of the grid for specific screen width in a way `"1200": {options}`                                                                                |

# Breakpoint options
You can specify the following properties:
`columns`, `gridGap`, `alignHeight`
These properties will be applied to the screen width above the breakpoint value.

# Demo
https://demo.marcin-kalinowski.pl/masonry-grid/
