import { useState } from "react";
import axios from 'axios';


async function Imageuploader() {
  const [image, setImage] = useState();

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
  };

  const response =  await axios.post('http://localhost:3001/upload',formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
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

export default Imageuploader;
