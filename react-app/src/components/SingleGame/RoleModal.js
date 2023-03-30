import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersGames } from "../../store/games";
import { Modal } from "../../context/Modal";
import './Game.css';
import RoleReveal from "../NewGame/RoleReveal";

export default function RoleModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  return (
    <div className="role-modal-wrapper">
      <button id="role-modal-btn" onClick={() => setShowModal(true)}>
        My Role
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div id="role-modal-reveal-wrapper">
            <RoleReveal modal={true} setShowModal={setShowModal} />
          </div>
        </Modal>
      )}
    </div>
  );
}
