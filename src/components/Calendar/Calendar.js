import React from "react";
import Accordion from "./Accordian/Accordian";

export default function Calendar(props) {
	return (
		<div className="calendar-wrapper">
			<h1>SEASONAL CALENDAR</h1>
			<p>Keep up with the season! As you add plants to your Adventures, they’ll automatically show up here, sorted 
			by harvest date, so you know exactly when your favorite species will be ripe, and where you can harvest them. </p>
			<Accordion>
				<div label="Spring">
					<p>Spring plants</p>
				</div>
				<div label="Summer">
					<p>Summer plants</p>
				</div>
				<div label="Fall">
					<p>Fall plants</p>
				</div>
				<div label="Winter">
					<p>Winter plants</p>
				</div>
			</Accordion>
		</div>
	);
}