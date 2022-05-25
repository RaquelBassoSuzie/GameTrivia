export const changePlayer = (payload) => ({ type: 'CHANGE_PLAYER', payload });

/* export const getGravatar = (name, email) => {
  const hash = md5(email).toString();
  const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;
  return async (dispatch) => {
    dispatch(changePlayer(name));
    dispatch(changeGravatar(urlGravatar));
  };
};
*/

export default { changePlayer };
