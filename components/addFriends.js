import React from 'react';
import FriendsList from './friendsList';

const AddFriends = ({
    handleChange,
    username,
    platform,
    addFriend,
    friends,
    removeFriend,
    selectFriend
}) => {
    return (
        <div className="form__container">
            <h1 className="form__header">Friends</h1>
            <img className="form__image" src='./static/images/loader-ballon.png' alt=""/>
            <div className="form__fieldset">
                <label className="form__label" htmlFor="username">
                    Username
                </label>
                <input
                    className="form__input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}/>
            </div>
            <div className="form__fieldset">
                <label className="form__label" htmlFor="platform">
                    Platform
                </label>
                <select
                    value={platform}
                    className="form__input"
                    name="platform"
                    onChange={handleChange}>
                    <option value="pc">PC</option>
                    <option value="psn">Play Station</option>
                    <option value="xbl">Xbox</option>
                </select>
            </div>
            <button disabled={!username} className="form__button" onClick={addFriend}>Add Friend</button>
            <hr className="mt-2 mb-2"/>
            <FriendsList
                friends={friends}
                removeFriend={removeFriend}
                selectFriend={selectFriend}/>
        </div>
    )
}

export default AddFriends;