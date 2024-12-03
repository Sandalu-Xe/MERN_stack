import { useState } from "react";

function imageuploader() {
  const [image, setImage] = useState();

  const submitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
  };

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

export default imageuploader;
