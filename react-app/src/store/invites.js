const LOAD = 'invites/LOAD';
const ADD = 'invites/ADD';
const RESPOND = 'invites/RESPOND';

const load = list => ({
  type: LOAD,
  list
})

const add = invite => ({
  type: ADD,
  invite
})

const respond = invite => ({
  type: RESPOND,
  invite
})


export const loadUserInvites = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/invites-received`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

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
    const invite = await res.json();
    dispatch(respond(invite));
    return invite;
  }
}

export const rejectInvite = inviteId => async dispatch => {
  const res = await fetch(`/api/games/invites/${inviteId}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const invite = await res.json();
    dispatch(respond(invite));
    return invite;
  }
}

let newState;
export default function invitesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      if (action.list['invites_sent']) {
        if (!newState['invites-sent']) newState['invites-sent'] = {};
        const invitesSent = action.list['invites_sent'];
        invitesSent.forEach(invite => {
          newState['invites-sent'][invite.id] = invite;
        })
      } else if (action.list['invites_received']) {
        newState['invites-received'] = {};
        const invitesReceived = action.list['invites_received'];
        invitesReceived.forEach(invite => {
          newState['invites-received'][invite.id] = invite;
        })
      }
      return newState;
    case ADD:
      newState = { ...state };
      if (!newState['invites-sent']) newState['invites-sent'] = {};
      newState['invites-sent'][action.invite.id] = action.invite;
      return newState;
    case RESPOND:
      newState = { ...state };
      delete newState['invites-received'][action.invite.id];
      return newState;
    default:
      return state;
  }
}
