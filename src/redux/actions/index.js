export const changePlayer = (payload) => ({ type: 'CHANGE_PLAYER', payload });

export const saveQuestions = (payload) => ({ type: 'SAVE_QUESTIONS', payload });

export const updateScoreAndAssertions = (payload) => ({ type: 'UPDATE_SCORE', payload });

export const updateSettings = (payload) => ({ type: 'UPDATE_SETTINGS', payload });

export default { changePlayer };
