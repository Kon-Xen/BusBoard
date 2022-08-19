Hi there! I took a look at your bus board code;
 it's really good, I think separating the code into different files was a really good move.
  I've got a few notes- I've tried to give as much detail as I could given you'd specially asked for feedback,
  so don't worry, it's definitely not stuff I would have expected you to pick up on 😄.

**Busboard.js**
 - I’d probably keep all code in a file inside functions- so for your BusBoard.js file,
 - leave just the imports at the top,
 - put everything else on lines 4-43 into a function,
 - and then call that function at the very bottom of the file

 - “Option” could be more descriptive as a name- without going to look at the UserInterface file, I’m not sure what “option” means or is used for. 
 - We could also make the options descriptive strings instead of numbers (though I think you used numbers to keep user input simple, which is a good consideration)
 - Good use of a switch here, with the “break” included to keep it clean etc!
 - I’d say it’s best to keep any logic more than one or two lines out of a switch, as otherwise it gets quite long- 
 - here I’d extract the logic inside case 1, 2 and 3 into separate functions

- I’m not sure what your findClosest function was aiming to do- it looks like it will only add a stop if it’s closer than the stop immediately before it in the array, is that right?

**StopPointClient.js**
 - Great to keep this in its own file, it keeps structure tidy- ***“separation of concerns”***! 
We often call classes dedicated to calling APIs a “Client”, so this could be eg our *StopPointClient*.
 - The sendRequest function is great, nice bit of de-duplication
 - Good descriptive function names
 - Could use string interpolation on line 29


***UserInterface.js***

I’m not sure the renderJourney, renderDisruptions etc methods add much efficiency as they’re only one line- it would be okay to call that console.log directly in the code