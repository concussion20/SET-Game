import Card, {COLORS, NUMBERS, SHADINGS, SHAPES} from './Card';


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadGame(difficulty) {
  let count = 1;
  let leftCards = [];
  let shownCards = [];

  if (difficulty === 'easy') {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            let card = <Card key={count} id={count++} shape={SHAPES[i]} shading={SHADINGS[j]} color={COLORS[k]} number='1'/>;
            leftCards.push(card);
        }
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            let card = <Card key={count} id={count++} shape={SHAPES[i]} shading={SHADINGS[j]} color={COLORS[k]} number={NUMBERS[l]}/>;
            leftCards.push(card);
          }
        }
      }
    }
  }
  shuffleArray(leftCards);
  shownCards = shownCards.concat(leftCards.splice(0, 12));

  // if medium level, open 3 automatically when no match on board
  while (difficulty === 'medium' && leftCards.length >= 3 && findSet(shownCards, difficulty).length === 0) {
    let obj = open3Cards(shownCards, leftCards);
    shownCards = obj.shownCards;
    leftCards = obj.leftCards;
  }
  return {leftCards: leftCards, shownCards: shownCards};
}

function checkMatch(cards, difficulty) {
  let card1 = cards[0];
  let card2 = cards[1];
  let card3 = cards[2];
  // console.log(card1)
  // console.log(card2)
  // console.log(card3)

  return difficulty === 'easy' ? 
    ((card1.props.color === card2.props.color && card2.props.color === card3.props.color) || (card1.props.color !== card2.props.color && card2.props.color !== card3.props.color && card1.props.color !== card3.props.color))
    && ((card1.props.shape === card2.props.shape && card2.props.shape === card3.props.shape) || (card1.props.shape !== card2.props.shape && card2.props.shape !== card3.props.shape && card1.props.shape !== card3.props.shape))
    && ((card1.props.shading === card2.props.shading && card2.props.shading === card3.props.shading) || (card1.props.shading !== card2.props.shading && card2.props.shading !== card3.props.shading && card1.props.shading !== card3.props.shading)) 
    :
    ((card1.props.number === card2.props.number && card2.props.number === card3.props.number) || (card1.props.number !== card2.props.number && card2.props.number !== card3.props.number && card1.props.number !== card3.props.number))
    && ((card1.props.color === card2.props.color && card2.props.color === card3.props.color) || (card1.props.color !== card2.props.color && card2.props.color !== card3.props.color && card1.props.color !== card3.props.color))
    && ((card1.props.shape === card2.props.shape && card2.props.shape === card3.props.shape) || (card1.props.shape !== card2.props.shape && card2.props.shape !== card3.props.shape && card1.props.shape !== card3.props.shape))
    && ((card1.props.shading === card2.props.shading && card2.props.shading === card3.props.shading) || (card1.props.shading !== card2.props.shading && card2.props.shading !== card3.props.shading && card1.props.shading !== card3.props.shading)) 
    ;
}

function selectCard(id, difficulty, selected, shownCards, leftCards) {
  let card;
  for (let j = 0; j < shownCards.length; j++) {
    if (shownCards[j].props.id === id) {
      card = shownCards[j];
      break;
    }
  }

  // console.log(card)
  // card = {
  //   ...card
  // };
  // console.log(card)
  // card.props.isSelected = 'true';
  let newSelected = selected.concat(card);
  let newShownCards;
  let newLeftCards;
  let isMatch;
  if (newSelected.length === 3 && checkMatch(newSelected, difficulty)) {
    newShownCards = shownCards.filter(item => item.props.id !== newSelected[0].props.id && item.props.id !== newSelected[1].props.id && item.props.id !== newSelected[2].props.id);
    if (newShownCards.length < 12) {
      newShownCards = newShownCards.concat(leftCards.slice(0, 3));
      newLeftCards = leftCards.slice(3);
    } else {
      newLeftCards = leftCards;
    }
    isMatch = 'yes';

    // if medium level, open 3 automatically when no match on board
    while (difficulty === 'medium' && newLeftCards.length >= 3 && findSet(newShownCards, difficulty).length === 0) {
      let obj = open3Cards(newShownCards, newLeftCards);
      newShownCards = obj.shownCards;
      newLeftCards = obj.leftCards;
    }
  } else {
    newShownCards = shownCards;
    newLeftCards = leftCards;
    isMatch = newSelected.length === 3 ? 'no' : 'empty';
  }

  if (newSelected.length === 3) {
    // newSelected[0].props.isSelected = newSelected[1].props.isSelected = newSelected[2].props.isSelected = 'false';
    newSelected = [];
  }

  return {isMatch: isMatch, leftCards: newLeftCards, selected: newSelected, shownCards: newShownCards, findedSet: []};
}

function open3Cards(shownCards, leftCards) {
  let newShownCards = shownCards.concat(leftCards.slice(0, 3));
  let newLeftCards = leftCards.slice(3);
  return {leftCards: newLeftCards, shownCards: newShownCards};
}

function findSet(shownCards, difficulty) {
  let len = shownCards.length;
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = i + 2; k < len; k++) {
        let cards = [shownCards[i], shownCards[j], shownCards[k]]
        if (checkMatch(cards, difficulty)) {
          return cards;
        }
      }
    }
  }
  return [];
}

export default function gameReducer(state = {
  difficulty: '',
  isMatch: 'empty',
  leftCards: [],
  selected: [],
  shownCards: [],
  findedSet: []
}, action) {
  console.log(action.type)
  if (action.type === "LOAD_GAME") {
    let gameData = loadGame(action.difficulty);
    return {
      difficulty: action.difficulty,
      isMatch: 'empty',
      leftCards: gameData.leftCards,
      selected: [],
      shownCards: gameData.shownCards,
      findedSet: []
    };
  } else if (action.type === "SELECT_CARD") {
    let obj = selectCard(action.id, state.difficulty, state.selected, state.shownCards, state.leftCards);
    return {
      difficulty: state.difficulty,
      ...obj,
    };
  } else if (action.type === "DESELECT_CARD") {
    return {
      ...state,
      selected: state.selected.filter(item => item.props.id !== action.id)
    }
  } else if (action.type === "OPEN_3_CARDS") {
    let obj = open3Cards(state.shownCards, state.leftCards);
    return {
      ...state,
      ...obj,
      isMatch: 'empty'
    };
  } else if (action.type === "FIND_SET") {
    return {
      ...state,
      selected: [],
      findedSet: findSet(state.shownCards, state.difficulty),
      isMatch: 'empty'
    };
  }
  return state;
}
