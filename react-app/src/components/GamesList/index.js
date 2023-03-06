import React from "react";
import { useDispatch } from "react-redux";

export default function GamesList() {
  const dispatch = useDispatch();

  return (
    <div className="games-list-wrapper">
      <h2>My Games</h2>
    </div>
  );
}
