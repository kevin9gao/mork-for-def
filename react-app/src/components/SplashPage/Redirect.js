import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  // console.log('redirect')

  useEffect(() => {
    if (!sessionUser) navigate('/');
  }, []);

  return (
    <></>
  );
}
