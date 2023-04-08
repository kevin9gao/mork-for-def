
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Profile.css';
import { updateUser } from "../../store/session";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [profilePic, setProfilePic] = useState(sessionUser?.profile_pic_url);
  // const [changeProfPic, setChangeProfPic] = useState(profilePic);
  const [previewPic, setPreviewPic] = useState(profilePic);
  const [username, setUsername] = useState(sessionUser?.username);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!profilePic) setPreviewPic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU');
    if (profilePic) setPreviewPic(profilePic);
  }, [profilePic]);

  // useEffect(() => {
  //   if (!changeProfPic) return;
  //   if (changeProfPic === profilePic) return;

  //   const previewUrl = URL.createObjectURL(changeProfPic);
  //   if (previewUrl) setPreviewPic(previewUrl);
  // }, [changeProfPic]);

  // const updateFile = e => {
  //   const file = e.target.files[0];
  //   if (file) setChangeProfPic(file);
  // }

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      username,
      email: sessionUser?.email,
      profile_pic_url: profilePic,
    };
    // console.log('ProfilePage payload', payload)

    dispatch(updateUser(payload, sessionUser?.id));
    setUpdated(true);
  }

  return (
    <div className="profile-page-wrapper">
      <div className="left">
        <div className="preview-avatar-wrapper">
          <img src={previewPic} />
        </div>
      </div>
      <div className="right">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} id="profile-form">
            <div hidden={!updated}>
              <h3>Changes saved.</h3>
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Profile Picture URL</label>
              <input
                type="text"
                value={profilePic}
                onChange={e => setProfilePic(e.target.value)} />
            </div>
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
