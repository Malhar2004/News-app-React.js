import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, ImageUrl, newsUrl, name, date, source } = this.props;
    return (
      <div className="container my-3">
        <div className="card">
          <img src={ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"86%", zIndex:"1"}}>{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary"><b>By: {name} <br/>Date: {new Date(date).toGMTString()}</b></small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
