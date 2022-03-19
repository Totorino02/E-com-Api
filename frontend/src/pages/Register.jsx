import React from 'react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import '../style/register.scss';
import { NavLink } from 'react-router-dom';
const Register = () => {
    const [formData, setFormDate] = useState({
		name: null,
		username: null,
		email: null,
        sexe: null,
        phoneNumber: null,
		dateOfBirth: null,
		password: null,
		confirmPassword: null,
	})
	
	const {name, sexe, phoneNumber, username, email, dateOfBirth, password, confirmPassword} = formData;
	
	const handleSubmit = async(e)=>{
		e.preventDefault();
		if(password === confirmPassword && sexe){
			const user = {
                name,
                username,
                email,
                password,
                sexe,
                phoneNumber,
                dateOfBirth
            }
            console.log(user)
		}
	};
	

	const onChange = (e)=>{
		setFormDate((prevState)=> ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	};

  return (
	<div className='bloc-parent'>
	    <form action="" method='POST' onSubmit={(e) => handleSubmit(e)} >
			<div className="row center-bloc">
				<p className="text-center login">REGISTER</p>
				<div className="col-md-6">
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Name</label>
						<input type="text" name='name' onChange={(e)=> onChange(e)} placeholder='Doe' className="form-control" />
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Email</label>
						<input type="email" name='email' onChange={(e)=> onChange(e)} placeholder='johnDoe@uui.io' className="form-control" />
					</div>
                    <div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Sexe</label>
                        <select name="sexe" className='form-control' onChange={(e)=> onChange(e)}>
                            <option value=""></option>
                            <option value="1">Masculin</option>
                            <option value="0">Feminin</option>
                        </select>
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Password</label>
						<input type="password" name='password' onChange={(e)=> onChange(e)} placeholder='*********' className="form-control" />
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Profile</label>
						<input type="file" name='profile' onChange={(e)=> onChange(e)} placeholder='your profile image' className="form-control" />
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Username</label>
						<input type="text" name='username' onChange={(e)=> onChange(e)} placeholder='john' className="form-control" />
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Date of birth</label>
						<input type="date" name='dateOfBirth' onChange={(e)=> onChange(e)} className="form-control" />
					</div>
                    <div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Phone number</label>
						<input type="number" name='phoneNumber' placeholder='(+228)90909090' onChange={(e)=> onChange(e)} className="form-control" />
					</div>
					<div className="form-group mt-2">
						<label className='mt-2' htmlFor="">Conf. Password</label>
						<input type="password" name='confirmPassword' onChange={(e)=> onChange(e)} placeholder='*********' className="form-control" />
					</div>
					<div className="form-group mt-3">
						<button type='submit' className=" mt-4 form-control btn btn-success">Envoyer</button>
					</div>
				</div>
			</div>
            <div className=" d-flex mt-3 ">
                <p>Vous avez un compte?</p>
                <NavLink to='/login'>Connection</NavLink>
            </div>
		</form>
	</div>
  )
}

export default Register