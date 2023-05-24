import './PatientDashboard.css'
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';

const MAX_COUNT = 5;

const PatientDashboard = () => {

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);


    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const handleFileClick = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle form submission
    // ...
    };


    return (
        <>

        {/* Header */}
            <header className="header">
                <Navbar expand="lg"  variant="dark" style={{background: "#03396c"}}>
                    <Container>
                        <Navbar.Brand>My Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                            <Nav className="ml-auto">
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="#PatientDashboard">Dashboard</Nav.Link>
                            <Nav.Link href="#post">Post</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            {/* Section-1 */}

                {/* Problem Text */}

            <div className="content">
                <label htmlFor="problem" className="problem-label">Describe your problem :</label>
                <textarea id="problem" placeholder="State your problem here..." className="problem-textarea" />
            </div>

                {/* File Upload */}

            <input className="file-upload" id='fileUpload' type='file' multiple
                accept='application/pdf, image/png'
                onChange={handleFileEvent}
                disabled={fileLimit}
                />

			<label htmlFor='fileUpload'>
				<a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } upload-btn`}>Upload Files</a>
			</label>

       
            <div className="uploaded-files-list">
                {uploadedFiles.map((file, index) => (
                <div key={index} onClick={() => handleFileClick(URL.createObjectURL(file))}>
                    {file.name}
                </div>
                ))}
            </div>

             {/* Dropdown */}

            <div className="dropdown-container drpdwn-container">
                <label htmlFor="dropdown" className="dropdown-label drpdwn-label">To Which Specialist : </label>
                <select id="dropdown" className="dropdown drpdwn">
                <option value="" disabled selected>Select an option</option>
                <option value="option1">Doctor 1</option>
                <option value="option2">Doctor 2</option>
                <option value="option3">Doctor 3</option>
                </select>
            </div>

            {/* Submit */}

            <button type="submit" className="btn btn-primary submit-btn" onClick={handleSubmit}>Submit</button>
            
        </>
    );
};

export default PatientDashboard