const LOAD = 'games/LOAD';
const ADD = 'games/ADD';
const UPDATE = 'games/UPDATE';
const REMOVE = 'games/REMOVE';
const INVITE = 'games/INVITE';
const RESPOND = 'games/RESPOND';

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

const extendInvite = invite => ({
  type: INVITE,
  invite
})

const respond = game => ({
  type: RESPOND,
  game
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

  if (res.ok) {
    const game = await res.json();
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

export const inviteUserToGame = (payload, invitedId, gameId) => async dispatch => {
  const res = await fetch(`/api/games/${gameId}/invite/${invitedId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const invite = await res.json();
    dispatch(extendInvite(invite));
    return invite;
  }
}

export const respondToInvite = (inviteId, accepted) => async dispatch => {
  let res;

  if (accepted) {
    res = await fetch(`/api/games/invites/${inviteId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    res = await fetch(`/api/games/invites/${inviteId}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (res.ok) {
    const game = await res.json()
    dispatch(respond(game));
    return game;
  }
}

export const loadInvites = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}/invites`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

let newState;
export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      if (action.list['games']) {
        const games = action.list['games'];
        games.forEach(game => {
          newState[game.id] = game;
        })
      } else if (action.list['invites']) {
        if (!newState['invites-sent']) newState['invites-sent'] = {};
        const invites = action.list['invites'];
        invites.forEach(invite => {
          newState['invites-sent'][invite.id] = invite;
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
    case INVITE:
      newState = { ...state };
      if (!newState['invites-sent']) newState['invites-sent'] = {};
      newState['invites-sent'][action.invite.id] = action.invite;
      return newState;
    case RESPOND:
      newState = { ...state };
      if (action.game['games']) {
        const games = action.game['games'];
        games.forEach(game => {
          newState[game.id] = game;
        })
      }
      return newState;
    default:
      return state;
  }
}
