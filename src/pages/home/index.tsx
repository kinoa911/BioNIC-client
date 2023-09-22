import React, { useState, useRef } from "react";
import { solveRegistrationChallenge, solveLoginChallenge } from '@webauthn/client';
import './index.css';

// https://github.com/passwordless-id/webauthn
// https://marmelab.com/blog/2019/06/24/web-authn-fido2-open-source-package.html

// https://github.com/pomerium/webauthn
// https://github.com/go-webauthn/webauthn
export const HomePage: React.FC = () => {
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [username, setUserName] = useState<string>("")

  const register = async() => {
    const challenge = await fetch('http://localhost:8000/request-register', {
      method: 'POST',
      headers: {
        'content-type': 'Application/Json'
      },
      body: JSON.stringify({ id: 'uuid', email: 'test@test'})
    })
    .then(response => response.json());

    const credentials = await solveRegistrationChallenge(challenge)

    const { loggedIn } = await fetch(
      'http://localhost:8000/register',
      {
        method: 'POST',
        headers: {
          'content-type': 'Application/Json'
        },
        body: JSON.stringify(credentials)
      }
    ).then(response => response.json());

    if (loggedIn) {
      console.log('registration successful');
      return;
    }

    console.log('registration failed')
  }

  const login = async () => {
    const challenge = await fetch('http://localhost:8000/login',
      {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: "ABC@test" })
      })
      .then(response => response.json())

      const credentials  = await solveLoginChallenge(challenge);
      const { loggedIn } = await fetch(
        'http://localhost:8000/login-challenge',
        {
          method: 'POST',
          headers: {
            'content-type': 'Application/Json'
          },
          body: JSON.stringify(credentials)
        }
      )
      .then(response => response.json());

      if (loggedIn) {
        console.log('You are logged in');
        return
      }

    console.log('Invalid credential')
}

  return <div className="form-signin w-100 m-auto">
    <a href="#"><img className="mb-4" src="./assets/logo.png" alt="" width="300" /></a>
    <i>TV or Shoppe or Checkout or whatever...</i>
    <hr />
    <h1 className="h4 mb-3 fw-normal">Please identify yourself</h1>

    <div>
      <label htmlFor="floatingInput">Username</label>
      <input type="email" id="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="name@example.com" />
    </div>
    <br />
    <div className="row">
      <button id="btn1" className="btn btn-bd-primary w-50" onClick={() => login()}>
        {/* {!disabled ? "Sign In" :
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            </div>
          </div>
        } */}
      </button>
      <button id="btn2" className="btn btn-bd-secondary w-50" onClick={() => register()}>Register</button>
    </div>
    <br />
    <p id="status" ref={statusRef} ></p>
  </div>
}