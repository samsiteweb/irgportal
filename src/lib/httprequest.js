import axios from "axios";
import UrlLib from "./urlLib";

const ImageUpload = fb => {
  axios
    .post(UrlLib, fb)
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export default ImageUpload;
