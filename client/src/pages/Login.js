import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../components/Login/style.css'

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section id="login-container">

      <h1 id="login-title" data-testid="h1tag">Login:</h1>
      <form id="login-form" onSubmit={handleFormSubmit}>
        <div className="login-section-divs">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="login-section-divs">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div id="error-div" className="login-section-divs">
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        
        <button id="login-btn" data-testid="button" type="submit">Submit</button>

      </form>
      <div className="login-signup-link-div">
        <Link className="login-signup-link" to="/signup">← Go to Signup</Link>
      </div>


    </section>
  );
}

export default Login;
