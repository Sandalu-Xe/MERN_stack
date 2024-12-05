import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const onInputChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file to the state
  };

  const submitImage = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title); // Add the title to the form data

    try {
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h3>Upload an Image</h3>
        </div>
        <div className="card-body">
          <form onSubmit={submitImage}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter a title for the image"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Select Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
