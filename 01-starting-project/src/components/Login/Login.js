import React, { useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLURR'){
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState('');

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  });

  useEffect(() => {
    console.log('effect_running');
    return (() => console.log('cleanup'));
  },[]);
  //useEffect(() => {
    //const handler = setTimeout(() => {
      //setFormIsValid(
        //enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 1
      //);
    //}, 500);
//
  //  return () => {
    //  clearTimeout(handler);
    //};

  //},[enteredEmail, enteredPassword,enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 1
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
    emailState.isValid && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 1
    );
  };

  const collegeHandler = event => {
    setEnteredCollege(event.target.value);
  };


  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLURR'});
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword, enteredCollege);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='college'>College</label>
          <input type='text' id='college' onChange={collegeHandler} onBlur={validateCollegeHandler}/>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
