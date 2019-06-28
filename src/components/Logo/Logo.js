import React from "react";
import Tilt from "react-tilt";
import './Logo.css';
import bear from './bear.png'

const Logo = () => {
	return (
		<div className="w-third ph5 mt0">
			<Tilt
				className="h3 w3"
				options={{ max: 50 }}
			>
				<div className="Tilt-inner"><img alt = 'logo' src={bear}/></div>
			</Tilt>
		</div>
	);
};

export default Logo;
