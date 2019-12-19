import React, { Component } from "react";
import { Input, Placeholder, Button } from "semantic-ui-react";
import axios from "axios";
import UrlLib from "../../lib/urlLib";

class ImageUploadInput extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      selectedFile: null
    };
  }
  handleSelect = e => {
    console.log(e.target.files[0]);
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      selectedFile: e.target.files[0]
    });
  };

  fileUpload = () => {
    // const fd = new FormData();
    // fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    // axios
    //   .post(
    //     `${UrlLib}/Image?type=Logo&id=9ad2c984-a927-4065-a19f-51b20b063278`,
    //     fd
    //   )
    //   .then(res => console.log(res));
  };

  render() {
    return (
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {this.state.file ? (
          <img src={this.state.file} alt='' />
        ) : (
          <Placeholder style={{ height: 80, width: 80 }}>
            <Placeholder.Image />
          </Placeholder>
        )}
        <div>
          <Input size='mini'>
            <input
              placeholder='select image'
              type='file'
              onChange={this.handleSelect}
            />
            <Button
              content='upload'
              color='teal'
              icon='copy'
              labelPosition='right'
              onClick={this.fileUpload}
            />
          </Input>
        </div>
      </div>
    );
  }
}

export default ImageUploadInput;
