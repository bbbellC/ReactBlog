import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { getTags, getCategories } from './redux/modules/article'
import Home from "./containers/web/Home";
import Article from "./containers/web/Article";
import List from "./containers/web/List";
import Archives from "./containers/web/Archives";
import Categories from "./containers/web/Categories";
import About from "./containers/web/About";
import adminHome from "./containers/admin/Home";
//import Login from "./components/Login";
import WebLayout from "./components/Layout";
import Header from "./components/Header";
import Sider from "./components/Sider";
import { Layout, Row, Col } from 'antd'
import './app.less'

@connect(
  null,
  { getTags, getCategories }
)

class App extends Component {
  componentDidMount() {
    this.props.getTags()
    this.props.getCategories()
  }

  render() {
    console.log(this.props.tagList);
    console.log(this.props.categoryList);
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/admin" component={adminHome}></Route>
            <Layout className="app-container">
              <Header />
              <Row className="main-wrapper">
                <Col {...siderLayout}>
                  <Sider />
                </Col>
                <Col {...contentLayout}>
                  <div className="content-wrapper">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/article/:id" component={Article}/>
                      <Route exact path="/tags/:name" component={List}/>
                      <Route exact path="/archives" component={Archives}/>
                      <Route exact path="/categories" component={Categories}/>
                      <Route exact path="/categories/:name" component={List}/>
                      <Route exact path="/about" component={About}/>
		    </Switch>
                  </div>
                </Col>
              </Row>
            </Layout>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
//                      <Route exact path="/about" component={About}/>

