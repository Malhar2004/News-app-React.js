import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalresults: 0

    }
    document.title = `${this.props.category} -BespokeBulletin `
  }

  async updatenews(props) {
    this.props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setprogress(30);
    let parsedata = await data.json()
    this.props.setprogress(50);
    this.setState({
      articles: parsedata.articles,
      totalresults: parsedata.totalResults,
      loading: false,
    })
    this.props.setprogress(100);
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 })
    let data = await fetch(url);
    let parsedata = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalresults: parsedata.totalResults,
    })
  }

  async componentDidMount() {
    this.updatenews();

  }

  // handleNextClick = async() => {
  //     this.setState({ page:this.state.page+1});
  //     this.updatenews();
  // }

  // handlePerviousClick = async() => {
  //   this.setState({page: this.state.page-1,});
  //   this.updatenews();
  // }

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>BespokeBulletin - {this.props.category} Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalresults}
          loader={<Spinner/>}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {                                                                      //!this.state.loading &&
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title !== null ? element.title : "" } description={element.description !== null ? element.description.slice(0, 88): ""}
                      ImageUrl={element.urlToImage !== null ? element.urlToImage : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.thenounproject.com%2Fpng%2F944120-200.png&tbnid=HkW7NlhmxqE6tM&vet=12ahUKEwjC04it-b2CAxWEvGMGHYbkDjMQMygCegQIARBx..i&imgrefurl=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Funavailable%2F&docid=-pP6jKKH-FNbyM&w=200&h=200&q=unavailable%20image%20icon&ved=2ahUKEwjC04it-b2CAxWEvGMGHYbkDjMQMygCegQIARBx"}
                      newsUrl={element.url}
                      name={element.author !== null ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" onClick= {this.handlePerviousClick} className="btn btn-dark">
         &larr; Previous
        </button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalresults/20)} type="button" onClick={this.handleNextClick} className="btn btn-dark">
          Next &rarr;
        </button>
         </div> */}
      </>
    );
  }
}
