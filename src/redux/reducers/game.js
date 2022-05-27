const INICIAL_STATE = {
  questions: {},
  settings: {},
};

const game = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return { ...state,
      questions: action.payload,
    };
  case 'UPDATE_SETTINGS':
    console.log(action.payload);
    return { ...state,
      settings: { ...action.payload },
    };
  default:
    return state;
  }
};

export default game;
