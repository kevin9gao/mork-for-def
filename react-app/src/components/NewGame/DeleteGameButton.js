import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGame } from "../../store/games";
import { Modal } from '../../context/Modal';

export default function DeleteGameButton({ game }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteGame(game.id));
    setShowModal(false);
    navigate('/home');
  }

  return (
    <>
      <button
        className="delete-btn m-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        id="delete-game-btn"
        onClick={() => setShowModal(true)}>
        Cancel Campaign Setup.
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Are you sure?</h3>
          <h4>This will delete your game.</h4>
          <button
            className="delete-btn bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            onClick={handleDelete}>
            Yes, delete my game.
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </>
  );
}
