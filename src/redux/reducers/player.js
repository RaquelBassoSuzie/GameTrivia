const INICIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_PLAYER':
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'UPDATE_SCORE':
    return { ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
