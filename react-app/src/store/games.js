const LOAD = 'games/LOAD';
const ADD = 'games/ADD';
const UPDATE = 'games/UPDATE';
const REMOVE = 'games/REMOVE';
const ACCEPT = 'games/ACCEPT';
const MARK = 'games/MARK';

const load = list => ({
  type: LOAD,
  list
})

const add = game => ({
  type: ADD,
  game
})

const update = game => ({
  type: UPDATE,
  game
})

const remove = gameId => ({
  type: REMOVE,
  gameId
})

const accept = game => ({
  type: ACCEPT,
  game
})

const add_mark = mark => ({
  type: MARK,
  mark
})

export const loadAllGames = () => async dispatch => {
  const res = await fetch('/api/games/');

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const loadUsersGames = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/games`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const loadGame = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const createGame = payload => async dispatch => {
  const res = await fetch('/api/games/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const game = await res.json();
    dispatch(add(game));
    return game;
  }
}

export const updateGame = (gameId, payload) => async dispatch => {
  const res = await fetch(`/api/games/${gameId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // console.log('updateGame thunk payload', payload)

  if (res.ok) {
    const game = await res.json();
    // console.log('updateGame thunk game', game)
    dispatch(update(game));
    return game;
  }
}

export const deleteGame = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(remove(gameId));
  }
}

export const acceptGameInvite = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}`);

  if (res.ok) {
    const game = await res.json();
    dispatch(accept(game));
    return game;
  }
}

export const loadMarks = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}/marks`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const markPlayer = (gameId, gamePayload, markPayload) => async dispatch => {
  const gameRes = await fetch(`/api/games/${gameId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gamePayload)
  });

  const markRes = await fetch(`/api/games/${gameId}/mark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(markPayload)
  });

  if (gameRes.ok && markRes.ok) {
    const mark = await markRes.json();
    dispatch(add_mark(mark));
    return mark;
  }
}

let newState;
export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      if (action.list['games']) {
        newState = {};
        const games = action.list['games'];
        games.forEach(game => {
          newState[game.id] = game;
        })
      } else if (action.list['marks']) {
        newState['marks'] = {};
        const marks = action.list['marks'];
        marks.forEach(mark => {
          newState['marks'][mark.id] = mark;
        })
      } else {
        const game = action.list;
        newState[game.id] = game;
      }
      return newState;
    case ADD:
      newState = { ...state };
      newState[action.game.id] = action.game;
      return newState;
    case UPDATE:
      newState = { ...state };
      newState[action.game.id] = action.game;
      return newState;
    case REMOVE:
      newState = { ...state };
      delete newState[action.gameId];
      return newState;
    case ACCEPT:
      newState = { ...state };
      newState[action.game.id] = action.game;
      return newState;
    case MARK:
      newState = { ...state };
      if (!newState['marks']) newState['marks'] = {};
      newState['marks'][action.mark.id] = action.mark;
      return newState;
    default:
      return state;
  }
}
