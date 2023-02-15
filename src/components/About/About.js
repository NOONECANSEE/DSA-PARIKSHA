import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";

export default function About({ resetData, exportData, importData }) {
	const inputFile = useRef(null);
	let history = useHistory();
	const [importSpinnerState, setImportSpinnerState] = useState(false);
	const [exportSpinnerState, setExportSpinnerState] = useState(false);
	// About component takes resetData() from App <Component> to trigger DB data reset
	function handleChange(e) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			const JSONData = JSON.parse(e.target.result);
			importData(JSONData, () => {
				setImportSpinnerState(false);
				history.push("/");
			});
		};
	}
	return (
		<>
			<div className="container-custom">
				<Fade duration={500}>
					<div className="container my-5">
						<Alert variant="success">
							<Alert.Heading className="text-center">About</Alert.Heading>
							<hr />
							<h4 className="text-center">
								DSA Pariksha helps in solving various kind of DSA Questions<br />and helps you
								in getting your Dream Job{" "}
								
							</h4>
						</Alert>
					</div>
					<div className="container my-5">
						<h2 className="text-center">
							<a>DSA Pariksha</a> is personal web-based DSA progress tracker<br></br>
							
							
						</h2>
						<h4 className="text-center my-5">
							Project by{" "}
							<a>
								Phoenix
							</a>
						</h4>
						<h5 className="text-center">
							<Badge
								variant="danger"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									if (window.confirm("Are you sure you want to reset the progress !")) {
										setExportSpinnerState(true);
										resetData();
									}
								}}
							>
								Reset Your Progress
								<Spinner animation="border" variant="light" size="sm" style={exportSpinnerState ? {} : { display: "none" }} />
							</Badge>{" "}
							</h5>
					</div>
				</Fade>
			</div>
		</>
	);
}
