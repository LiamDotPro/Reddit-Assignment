# turing-battle-ships

A simple battleships based application that does the following:

- Creates a 10x10 Board
- Assigns ships to cells (I also added the ability to Randomly assigns ships to the board as I had time left)
- Allows to click and hit or miss a ship
- Only shows ships when they are completely hit, otherwise the cell remains red
- Reset and play again
- Fully responsive tested down to 200px width.

The application itself was built with Typescript, React, Vite and SWC. Here's the considerations for the project:

1) State management

I choose not to use a state library such as redux or zustand mainly because the application is so simple, however
converting the project to use something like this would be trivial. This would also allow our data to flow in a single
direciton,
this is mostly the case, although state is being modified from a child in the controls which is an example that would be
fixed by action mapping in redux for example.

2) In component styling

I choose to use SCSS due to speed and wanting to finish the project within an hour, however I believe it would be neater
to have used something like styled components.

3) Linting

This project used the basic linting provided by Vite, in a real application I would of further configured eslint and
probably
choose to use an existing library of rules such as airbnb's.

4) Splitting logic off components

As this is an assignment I believe it's easier to read the assignment if everything can be found between two components.
It's debatable but I think ultimately if the project was larger we would want to split more of the logic out to make it
reusable in other
components. You can see we have split some of the board generation logic so it's testable in our `App.test.tsx`.

5) Styling

I've chosen not to include any images such as those of the ships as it was not in the requirements,
however I believe it simple provided with images of battleships. We can easily modify our generation algorithm to
also hold the pictures of each segment as they are placed into the matrix.

The styling overall is minimum, the responsiveness follows a grid while the main application just folds down nicely with
flex.

6) Typescript

It's a personal preference, just makes type hinting nicer and the application easier for me to understand. I don't think
it would make any difference to have done this in vanilla JS but would slow me down a little.

7) Error handling

There are times in the application where the errors are handled by being caught, I think in the case these are met we
can presume there is something wrong and not render the game and update UI state or reset. It's something to consider if
extending
the application.

8) Testing

I've included a simple unit test to ensure that the ships are being placed on the correct dummy squares.

I've included a test that covers the generation algorithm, it runs the function 100 times and can be changed
to run 20000 or more times without hitting the error. I'd like to mention that while this generation technique works,
it would be more robust if it was seed based with us generating a list of a million plus boards which are checked ahead
of time for generation defects, but it would be over-kill for such a small application.

## How to run the application

```bash
npm i && npm run dev
```

## How to run tests

```bash
npm i && npm test
```

Application uses Vite and SWC for fast development.