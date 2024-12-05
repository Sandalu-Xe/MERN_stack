import { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
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
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImageUploader;
