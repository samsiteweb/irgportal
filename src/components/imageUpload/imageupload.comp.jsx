import React, { Component } from "react";
import { Input, Placeholder, Button, Progress } from "semantic-ui-react";
import CardContainer from "../../components/card-container/card_container";
import axios from "axios";
import UrlLib from "../../lib/urlLib";
import MessageLabel from "../message-label/messagelabel";
import CompletedMessage from "../completedMessage";

class ImageUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      showProgress: false,
      enableUpload: true,
      showMsg: false,
      msg: "",
      msgColor: "",
      msgIcon: "",
      file: "",
      successUpload: false,
      selectedFile: {
        name: ""
      }
    };
  }
  handleSelect = e => {
    let fileUpload = e.target.files[0];
    console.log(fileUpload);

    try {
      if (
        fileUpload.type === "image/jpeg" ||
        fileUpload.type === "image/png" ||
        fileUpload === "image/jpg"
      ) {
        this.setState({
          enableUpload: false,
          file: URL.createObjectURL(fileUpload),
          selectedFile: fileUpload
        });
      } else {
        this.setState({
          showMsg: true,
          msg: "Invalid file type selected. Please select a .jpg or .png file",
          msgColor: "orange",
          msgIcon: "cancel"
        });
        setTimeout(() => {
          this.setState({
            showMsg: false
          });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fileUpload = () => {
    this.setState({
      percent: 0,
      enableUpload: true,
      showProgress: true,
      progressMsg: "Image upload started ..."
    });
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post(
        `${UrlLib}/Image?type=Logo&id=9ad2c984-a927-4065-a19f-51b20b063278`,
        fd,
        {
          onUploadProgress: ProgressEvent => {
            console.log(ProgressEvent.loaded, "loaded");
            console.log(ProgressEvent.total, "remain");
            let percentnew = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );
            console.log(percentnew);
            this.setState(prevState => ({
              percent: percentnew - 2,
              progressMsg: "uploading Image, please wait ..."
            }));
          }
        }
      )
      .then(res => {
        console.log(res.config.url);
        this.setState({
          percent: 100,
          file: `${UrlLib}/Image/Default/Logo/9ad2c984-a927-4065-a19f-51b20b063278/32`,
          progressMsg: "Image upload Suceessfull",
          successUpload: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          msgColor: "orange",
          msgIcon: "cancel",
          msg: err.response
            ? err.response.data.Message
            : "check internet connection"
        });
      });
  };

  render() {
    const {
      showMsg,
      showProgress,
      msg,
      enableUpload,
      msgColor,
      msgIcon,
      progressMsg,
      successUpload
    } = this.state;
    return (
      <CardContainer
        header='Upload Organization Logo '
        description='We are almost done ...'
      >
        {showMsg ? (
          <MessageLabel message={msg} icon={msgIcon} color={msgColor} />
        ) : null}
        {successUpload ? (
          <CompletedMessage
            handlepush={() => {
              this.props.history.push("/adminReg");
            }}
            btnMsg='to Admin Registration'
            message='Uploaded your Organizations Logo'
          />
        ) : (
          <div
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {this.state.file ? (
                <img
                  src={this.state.file}
                  alt=''
                  height='100px'
                  width='100px'
                />
              ) : (
                <Placeholder style={{ height: 80, width: 80 }}>
                  <Placeholder.Image />
                </Placeholder>
              )}
            </div>
            <div>
              <Button
                content='Choose Image'
                size='mini'
                color='teal'
                onClick={() => this.fileInput.click()}
              />
              <Input size='mini'>
                <input
                  placeholder='select image'
                  type='file'
                  onChange={this.handleSelect}
                  style={{ display: "none" }}
                  ref={fileInput => (this.fileInput = fileInput)}
                />
                <input
                  placeholder='select image'
                  type='text'
                  value={this.state.selectedFile.name}
                  onChange={this.handleSelect}
                />
              </Input>
            </div>

            <div style={{ paddingLeft: "5px", paddingTop: "10px" }}>
              {showProgress ? (
                <Progress percent={this.state.percent} indicating progress>
                  {progressMsg}
                </Progress>
              ) : null}

              <Button
                content='Upload Image'
                color='violet'
                size='tiny'
                disabled={enableUpload}
                onClick={this.fileUpload}
              />
              <Button
                content='Skip to Admin Registration'
                color='vk'
                size='tiny'
                onClick={() => this.fileInput.click()}
              />
            </div>
          </div>
        )}
      </CardContainer>
    );
  }
}

export default ImageUploadInput;
