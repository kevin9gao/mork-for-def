const LOAD = 'users/LOAD';
const UPDATE = 'users/UPDATE';

const load = list => ({
  type: LOAD,
  list
});

export const loadAllUsers = () => async dispatch => {
  const response = await fetch('/api/users/');

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

export const loadFriendsList = (user_id) => async dispatch => {
  const response = await fetch(`/api/users/${user_id}/friends`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

export const befriendUser = (befriender_id, befriended_id) => async dispatch => {
  const response = await fetch(`/api/users/${befriender_id}/befriend/${befriended_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

export const unfriendUser = (unfriender_id, unfriended_id) => async dispatch => {
  const response = await fetch(`/api/users/${unfriender_id}/unfriend/${unfriended_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
}

let newState;

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = { ...state };

      if (action.list.friends) {
        newState['friends'] = {};
        const friends = action.list.friends;
        friends.forEach(friend => {
          newState['friends'][friend.id] = friend;
        })
      }

      if (action.list.users) {
        newState = { ...state };
        action.list.users.forEach(user => {
          newState[user.id] = user;
        })
      }

      return newState;
    default:
      return state;
  }
}
