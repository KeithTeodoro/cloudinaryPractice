import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';

import './App.css';
import Header from './component/Header.jsx';
import Modal from './component/Modal.jsx';

function App() {
	const [imageSelected, setImageSelected] = useState(null);
	const [image, setImages] = useState([]);
	const [displayedImages, setDisplayedImages] = useState(10);

	// const uploadImage = () => {
	//   setImageUploaded(false);
	//   const formData = new FormData();
	//   formData.append("folder", "practice");
	//   formData.append("file", imageSelected);
	//   formData.append("upload_preset", "ihemijky");

	//   Axios.post(
	//     "https://api.cloudinary.com/v1_1/dasshdsy2/image/upload",
	//     formData
	//   ).then((res) => {
	//     console.log(res);
	//     setImageUploaded(true);
	//   });
	// };
	const handleImageChange = (e) => {
		const selectedFile = e.target.files[0];
		setImageSelected(selectedFile);
	};

	const uploadImage = () => {
		const formData = new FormData();
		formData.append('file', imageSelected);

		Axios.post('http://localhost:5000/upload-image', formData)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.error('Error uploading image:', error);
			});
	};

	const fetchData = async () => {
		try {
			const response = await Axios.get(
				'http://localhost:5000/cloudinary-resources'
			);

			setImages(response.data.resources);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const modal = useRef();

	function onButtonClick() {
		modal.current.open();
	}

	function cancelButtonClick() {
		modal.current.close();
	}

	const imagesList = image
		.slice(0, displayedImages)
		.map((imge) => <img key={imge.public_id} src={imge.url} />);

	const seeMoreImages = () => {
		setDisplayedImages((prevCount) => prevCount + 10);
	};

	const showSeeMoreButton = displayedImages < image.length;

	return (
		<>
			<div id="head">
				<Header />
				<button id="addBtn" onClick={onButtonClick}>
					Add Photo
				</button>
			</div>
			<Modal ref={modal}>
				<div id="body-modal">
					<h3>Choose a file to upload</h3>
					<input type="file" onChange={handleImageChange} />
				</div>
				<div id="footer-modal">
					<button onClick={uploadImage}>Upload</button>
					<button onClick={cancelButtonClick}>Cancel</button>
				</div>
			</Modal>
			<div id="container">
				<div id="images-container">
					<div id="images-box">{imagesList}</div>
				</div>
			</div>
			{showSeeMoreButton && (
				<div id="seeMore">
					<div id="btn">
						<a onClick={seeMoreImages}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							See More
						</a>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
