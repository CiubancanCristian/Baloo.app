import React from "react";
import './Navigation.css'
const Navigation = ({onRouteChange}) => {
	return (
		<div className='w-70'>
		<nav className='Navigation'>
			<p className="white f5 link dim pa3 pointer">{'My Portfolio'}</p>
			<p className="white f5 link dim pa3 pointer">{'Project Git'}</p>
			<p onClick={() => onRouteChange('signin')} className="white f5 link dim pa3 pointer">{'Sign Out'}</p>
		</nav>
		</div>
	);
};

export default Navigation;
