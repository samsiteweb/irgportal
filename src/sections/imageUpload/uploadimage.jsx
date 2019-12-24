import React from "react";
import ImageUploadInput from "../../components/imageUpload/imageupload.comp";
import CardContainer from "../../components/card-container/card_container";
import "./uploadimage.css";

const UploadImage = () => {
  return (
    <div className=''>
      <CardContainer
        header='Upload Organization Logo '
        description='We are almost done ...'
      >
        <ImageUploadInput />
      </CardContainer>
    </div>
  );
};

export default UploadImage;
