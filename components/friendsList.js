import React from 'react';

const FriendsList = ({friends, removeFriend, selectFriend}) => {
    return !friends.length
        ? null
        : <ul>
            {friends.map(friend => {
                return (
                    <li className="friends-list__item" key={friend.id}>
                        <span className="friends-list__name">{friend.username}</span>
                        <button
                            className="ml-2 mr-1 form__button form__button--small"
                            onClick={() => {
                            selectFriend(friend.id);
                        }}>
                            Compare
                        </button>
                        <button
                            className="form__button form__button--small form__button--red"
                            onClick={() => {
                            removeFriend(friend.id);
                        }}>
                            Remove
                        </button>
                    </li>
                );
            })}
        </ul>
};

export default FriendsList;