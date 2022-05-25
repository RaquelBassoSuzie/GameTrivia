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
  default:
    return state;
  }
};

export default player;
