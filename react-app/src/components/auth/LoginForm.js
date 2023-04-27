import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../store/session";
import './Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Email or password incorrect. Please try again.']);
      setHideErrors(false);
    } else {
      navigate('/home');
    }
  };

  if (user) {
    return navigate('/home');
  }

  return (
    <div className="login-wrapper">
      <div className="header">
        <div id="logo-wrapper">
          <NavLink to='/'>
            <h1>Marked For Death</h1>
          </NavLink>
        </div>
      </div>
      <div className="main flex justify-center items-start" id="login">
        <div className="form-wrapper">
          <form className="bg-slate-600 shadow-md rounded p-6 mt-6" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4">
              <h3>Log In</h3>
            </div>
            <div
              className="my-3 px-1"
              hidden={hideErrors}>
              {errors.map((error, ind) => (
                <div className="text-sm text-red-400" key={ind}>{`* ${error}`}</div>
              ))}
            </div>
            <div className="my-2">
              <input
                type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                name='email'
                placeholder='name@email.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2 mb-6">
              <input
                type='password'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                name='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center my-4">
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                type='submit'>Log In</button>
            </div>
            <div className='login-reroute flex flex-row justify-evenly' id='signup-reroute'>
              <div className="text-sm">Don't have an account?</div>
              <NavLink to='/signup' className='text-sm'>
                Sign Up.
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
