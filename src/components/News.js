import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "sports",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstletter(
      this.props.category
    )}-NewsMonkey`;
  }

  async updatePage(pageNo) {
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=6cb2a394435d46deb88ab02871eb49c0&page=${this.state.page}&pageSize=10`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults,
    });
  }

  async componentDidMount() {
    this.updatePage();
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=6cb2a394435d46deb88ab02871eb49c0&page=${this.state.page}&pageSize=10`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parseData.articles),
      loading: false,
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="my-4 d-flex justify-content-center">
          NewsMonkey - Top HeadLines{" "}
          {this.capitalizeFirstletter(this.props.category)}
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((article) => {
                return (
                  <div className="col-md-3" key={article.url}>
                    <NewsItem
                      title={!article.title ? "" : article.title}
                      description={!article.description  ? " " : article.description.slice(0, 70)
                      }
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
