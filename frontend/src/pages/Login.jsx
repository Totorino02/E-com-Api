import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import '../style/login.scss';
import Register from './Register';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
	const [formData, setFormDate] = useState({
		email: null,
		password: null,
	})
    const {isError, isSuccess, isLoading, message, user} = useSelector((state) => state.auth)
	const dispatch = useDispatch();

	const {email, password} = formData;
	
	const handleSubmit = async(e)=>{
		e.preventDefault();
		if(password && email){
            const user = {email, password}
            dispatch(login(user));
		}
	};
	

	const onChange = (e)=>{
		setFormDate((prevState)=> ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	};

    useEffect(()=>{
        if(user){
            console.log(user);
        }
        if(isError){
            console.log(isError)
        }
    }, [isError, isSuccess, isLoading, message, user])

  return (
	<div className='bloc-parent'>
	    <form action="" method='POST' onSubmit={(e) => handleSubmit(e)} >
			<div className="row center-bloc">
				<p className="text-center login">LOGIN</p>
				<div className="">
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Email</label>
						<input type="email" name='email' onChange={(e)=> onChange(e)} placeholder='johnDoe@uui.io' className="form-control" />
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Password</label>
						<input type="password" name='password' onChange={(e)=> onChange(e)} placeholder='********' className="form-control" />
					</div>
					<div className="form-group mt-3">
						<button type='submit' className=" mt-4 form-control btn btn-success">Envoyer</button>
					</div>
                    <div className="mt-3 d-flex">
                        <p className="ml-3">Vous avez un compte?</p>
                        <NavLink to="/register" >Inscription</NavLink>
                    </div>
				</div>
			</div>
		</form>
	</div>
  )
}

export default Login