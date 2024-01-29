import { useState, useRef, useEffect } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [imageSelected, setImageSelected] = useState(null);
  const [image, setImages] = useState([]);

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
    formData.append("file", imageSelected);

    Axios.post("http://localhost:5000/upload-image", formData)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/cloudinary-resources"
      );

      setImages(response.data.resources);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload</button>
      {image.map((imge) => (
        <img key={imge.public_id} src={imge.url} />
      ))}
    </>
  );
}

export default App;
