const LOAD = 'invites/LOAD';
const ADD = 'invites/ADD';
const ACCEPT = 'invites/ACCEPT';
const REJECT = 'invites/REJECT';

const load = list => ({
  type: LOAD,
  list
})

const add = invite => ({
  type: ADD,
  invite
})

const accept = game => ({
  type: ACCEPT,
  game
})

const reject = game => ({
  type: REJECT,
  game
})

export const loadGameInvites = gameId => async dispatch => {
  const res = await fetch(`/api/games/${gameId}/invites`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const inviteUser = (payload, invitedId, gameId) => async dispatch => {
  const res = await fetch(`/api/games/${gameId}/invite/${invitedId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const invite = await res.json();
    dispatch(add(invite));
    return invite;
  }
}

export const acceptInvite = inviteId => async dispatch => {
  const res = await fetch(`/api/games/invites/${inviteId}/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const game = await res.json();
    dispatch(accept(game));
    return game;
  }
}

export const rejectInvite = inviteId => async dispatch => {
  const res = await fetch(`/api/games/invites/${inviteId}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const game = await res.json();
    dispatch(reject(game));
    return game;
  }
}

let newState;
export default function invitesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      if (action.list['invites_sent']) {
        newState['invites-sent'] = {};
        const invitesSent = action.list['invites_sent'];
        invitesSent.forEach(invite => {
          newState['invites-sent'][invite.id] = invite;
        })
      }
      return newState;
    default:
      return state;
  }
}

// TAKING DINDIN ON WALK WILL B BACK IN 20 OR SO
