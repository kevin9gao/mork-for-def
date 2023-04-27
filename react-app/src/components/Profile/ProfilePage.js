
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Profile.css';
import { updateUser } from "../../store/session";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.users[userId]);
  const sessionUser = useSelector(state => state.session.user);
  const [profilePic, setProfilePic] = useState(user?.profile_pic_url);
  // const [changeProfPic, setChangeProfPic] = useState(profilePic);
  const [previewPic, setPreviewPic] = useState(profilePic);
  const [username, setUsername] = useState(user?.username);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!profilePic) setPreviewPic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU');
    if (profilePic) setPreviewPic(profilePic);
  }, [profilePic]);

  useEffect(() => {
    if (updated) setUpdated(false);
  }, []);

  console.log('updated', updated);

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

  if (Number(userId) === sessionUser?.id) return (
    <div className="profile-page-wrapper">
      <div className="left">
        <div className="preview-avatar-wrapper">
          <img src={previewPic} />
        </div>
      </div>
      <div className="right">
        <div className="form-wrapper">
          <form
            className="bg-slate-600 shadow-md rounded p-8"
            onSubmit={handleSubmit}
            id="profile-form">
            <div
              className={`flex justify-center ${!updated ? 'hidden' : ''}`}>
              <h3>Changes saved.</h3>
            </div>
            <div className="m-4">
              <label className="mx-4">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="m-4">
              <label className="mx-4">Profile Picture URL</label>
              <input
                type="text"
                value={profilePic}
                onChange={e => setProfilePic(e.target.value)} />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-page-wrapper">
      <div className="left">
        <div className="preview-avatar-wrapper">
          <img src={previewPic} />
        </div>
      </div>
      <div className="right">
        <div className="form-wrapper">
          <div className="flex flex-row items-end">
            <h3 className="mx-4">Username</h3>
            <span>{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
