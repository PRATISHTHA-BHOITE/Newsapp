import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state =
        {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstletter(this.props.category)}- newsapp`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=
        ${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(Url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
           
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews()

    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()

    }
    fetchMoreData=async()=>{
        this.setState({page: this.state.page+ 1})
        let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=
        ${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(Url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
           
        })
    }
    /* async componentDidMount() {
         
         let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=103fc475666d423d8303bba76fa2d52a&page=1&pageSize=
         ${this.props.pageSize}`;
        this.setState({loading:true})
         let data = await fetch(Url);
         let parsedData = await data.json()
         console.log(parsedData);
         this.setState({
             articles: parsedData.articles,
             totalResults: parsedData.totalResults,
             loading: false
         })*/


    /*
    handlePreviousClick = async () => {
        console.log("Previous");
        let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}
        &category=${this.props.category}&apiKey=103fc475666d423d8303bba76fa2d52a&
        page=${this.state.page - 1}
        &pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(Url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=103fc475666d423d8303bba76fa2d52a&page=
        ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
            let data = await fetch(Url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
               
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            })

    }*/

    render() {
        return (
          <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>News app - Top {this.capitalizeFirstletter(this.props.category)}  headlines</h1>
                {/*{this.state.loading && <Spinner />}*/}
                
                    {/*{!this.state.loading && this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : "null"} description={element.description ? element.description : "null"}
                                imageUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author} date={element.publishedAt} source={element.source.name}
                            />
                        </div>
                    })}*/}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        
                        hasMore={this.state.articles.length !==this.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">

                        
                        <div className="row">
                    {this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : "null"} description={element.description ? element.description : "null"}
                                imageUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author} date={element.publishedAt} source={element.source.name}
                            />
                        </div>
                    })}

                </div>
                </div>
                </InfiniteScroll>
                {/*<div className="container d-flex justify-content-between">
                   <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&rarr; Next</button>
                </div>*/}
                
            </>
        )
    }
}

export default News
