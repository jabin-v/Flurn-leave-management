import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const  Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Hook for login from authApiSlice

    const [login, { isLoading }] = useLoginMutation();

    //focus on name filed when component loads

//     useEffect(() => {
//       userRef.current.focus()
//   }, [])



  useEffect(() => {
    setErrMsg('');
}, [password,email])



  //submitting login with name,email and password

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const data = await login({ email, password}).unwrap();

          const access_token=data.access_token
        
        console.log(access_token)
          dispatch(setCredentials({ access_token }))
          setEmail('')
          setPassword('')
          

          navigate('/dash')
      } catch (err) {
          if (!err.status) {
              setErrMsg('No Server Response');
          } else if (err.status === 400) {
              setErrMsg('invalid credentials');
          } else if (err.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg(err.data?.message);
          }
          errRef.current.focus();
      }
  }


  //handling form-inputs

 
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleEmailInput = (e) => setEmail(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    const content = (
      <section className="public">
          <header>
              <h1>Employee Login</h1>
          </header>
          <main className="login">
              <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

              <form className="form" onSubmit={handleSubmit}>
                  <label htmlFor="password">Email</label>
                  <input
                      className="form__input"
                      type="email"
                      id="email"
                      onChange={handleEmailInput}
                      value={email}
                      required
                      ref={userRef}
                  />
                  <label htmlFor="email">Password:</label>
                  <input
                      className="form__input"
                      type="password"
                      id="password"
                      onChange={handlePwdInput}
                      value={password}
                      required
                  />
                  <button className="form__submit-button">Sign In</button>
              </form>
          </main>
          <footer>
              <Link to="/">Back to Home</Link>
          </footer>
      </section>
  )


    return content;








  
}

export default Login