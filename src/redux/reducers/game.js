const INICIAL_STATE = {
  questions: {},
};

const game = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return { ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default game;
