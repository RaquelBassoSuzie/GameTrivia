const INICIAL_STATE = {
  questions: {},
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
};

const game = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return { ...state,
      questions: action.payload,
    };
  case 'UPDATE_SETTINGS':
    return { ...state,
      settings: { ...action.payload },
    };
  default:
    return state;
  }
};

export default game;
