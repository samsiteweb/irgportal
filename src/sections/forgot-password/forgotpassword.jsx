import React, { Component } from "react";
import RetrivePassword from "../../components/retrivepassword/retrivepassword";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retriveState: false
    };
  }

  handleSend = () => {
    this.setState({ retriveState: true });
    console.log(this.state.retriveState);
    this.props.history.push("/passReset");
  };

  render() {
    return (
      <div>
        <RetrivePassword handlesend={this.handleSend} />
      </div>
    );
  }
}

export default ForgotPassword;
