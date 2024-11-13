import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function SendPdf() {

    const [title, setTitle] = useState("");
    const [file, saveFile] = useState("");
    const [allPdf, setAllPdf] = useState("");
  
    useEffect(() => {
      getpdf();
    }, []);
  
    const getpdf = async () => {
      const result = await axios.get("http://localhost:5000/getFile");
      console.log(result.data.data);
      setAllPdf(result.data.data);
    }

    const submitPdf =async (e)=>{
      e.preventDefault();

      const formData = new FormData();
      formData.append("title",title);
      formData.append("file",file);
      console.log(title,file);

    }

    try {
      const result =
       axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      console.log(result);
    
      if (result.data.status === 200) {
        alert("Upload Success");
        getpdf();
      }
    } catch (error) {
      console.error("Error uploading file:", + error.messege);
      alert('error Uploading')
    }


  return (
    <Container className="mt-5">

      <h1>Send PDF</h1>
      <Form onSubmit={submitPdf}>
        <Form.Group controlId="formPdfTitle">
          <Form.Label>PDF Title</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter PDF title"
          onChange={(e)=> setTitle(e.target.value)}
          required />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Select PDF File</Form.Label>
          <Form.Control 
          type="file"
          accept="application/pdf" 
          onChange={(e)=>saveFile(e.target.files[0])}
          required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SendPdf;
