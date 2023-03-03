import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import './NewGame.css';

export default function NewGame() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="new-game-wrapper">
      <button onClick={() => setShowModal(true)}>New Game</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

        </Modal>
      )}
    </div>
  );
}
