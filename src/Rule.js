import React from 'react';

export default function Rule() {
  return (
    <div className='content col-start-2 col-span-4'>
      <h2>Rules</h2>
      <br />
      <p>
        The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a variation of the following four features:
      </p>
      <ol className='list-decimal'>
        <li>
          COLOR: Each card is red, green, or blue.
        </li>
        <li>
          SYMBOL: Each card contains ovals, squiggles, or diamonds.
        </li>
        <li>
          NUMBER: Each card has one, two, or three symbols.
        </li>
        <li>
          SHADING: Each card is solid, open, or striped.
        </li>
      </ol>
      <p>
        A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card. That is to say, any feature in the 'Set' of three cards is either common to all three cards or is different on each card.
      </p>
      <br />
      <img src='/images/rules_examples.jpg' alt='' />
    </div>
  );
}