import React from "react";

export default class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };
  componentDidCatch(error) {
    this.setState({
      error,
    });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="container  mt-10">
          <div className=" d-flex  flex-column align-content-baseline 	">
            <h2 className="text-danger">Something went wrong...</h2>
            <p className="text-danger">{error.toString()}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
