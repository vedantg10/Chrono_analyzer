import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

const API_ENDPOINT = "http://10.0.0.129:8000/";
const API_CLIENT = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000,
});

class App extends React.Component {
  state = {
    imgSrc: "",
  };
  _onDragOver(e) {
    e.preventDefault();
  }
  _onDragLeave(e) {
    e.preventDefault();
  }
  _onDrop(e) {
    e.preventDefault();
    console.log("File dropped");
    const targetFile = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = (e) => {
      this.setState({ imgSrc: reader.result });
    };
    if (targetFile) {
      console.log("File:", targetFile);
      this.uploadFile(targetFile);
    } else {
      console.log("No file detected");
    }
  }
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API_CLIENT.post("/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  render() {
    var ImagePreview;
    if (this.state.imgSrc) {
      ImagePreview = <img src={this.state.imgSrc} alt="image-of-a-watch" />;
    }
    return (
      <div className="App">
        {" "}
        <div
          className="file-dropzone"
          onDragOver={(e) => {
            this._onDragOver(e);
          }}
          onDragLeave={(e) => {
            this._onDragLeave(e);
          }}
          onDrop={(e) => {
            this._onDrop(e);
          }}
        >
          {ImagePreview}
        </div>
      </div>
    );
  }
}

export default App;
