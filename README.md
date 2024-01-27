# T.O.P. - *Etch A Sketch*

This web page: **Reminiscent of the classic game of Etch a Sketch, you can play the game on this website! Change the sizes of the grid to your fitting and also change from regular gray to multi-color coloring!**

## Video Walkthrough

Here's a walkthrough of the webpage:

<img src='https://github.com/JuanHundred/etch-a-sketch/blob/main/etch_a_sketch.gif' title='Video Walkthrough' width='' alt='Video Walkthrough Of Webpage' />

GIF created with [CleanShotX]

## Notes

This was bit of a challenge as generating all the cells was done through JavaScript. Adding the cells inside the grid took more work than I initially thought it would, for example in order to append the multiple div's with the same property you have to first clone them. But then I encountered the issue where eventHandlers aren't cloned, so my initial thought was just to add an event listener for every cell added to every cloned row. While that did work as intended, I realized later on that while efficient for my use case, for other cases that required more items to be created via JavaScript that would not be case. That's when I realized that I should really try to understand event bubbling and event capturing. I researched more about those concepts and decided to update but code to incorporate event capturing.

I like to share my webpages with friends to get their opinions on what can be improved/changed and one of the feedback I received was to change the way you colored the grid. At first whenever the mouse entered and left the cell, the cell would be colored. This lead to some unnecessary effects, for example if you wanted to start to color in the middle, your mouse will color the cells you hovered over while getting to some cell in the middle. In order to fix this, I had to change the way the event handlers were functioning. Now in order to color, you have to press down the mouse button and it'll only color the cells while you have the mouse button pressed. 

## License

    Copyright [2024] [JuanHundred/Juan Quezada]