import React, { Component } from 'react'
import { Router, Route, Link, Switch } from 'react-router';
import './index.less'
//import PropTypes from 'prop-types'

import { Layout, Icon, Row, Col, BackTop } from 'antd'
import Header from '../Header'
import Sider from "../Sider";
import Home from '../../containers/web/Home'
import Article from '../../containers/web/Article'
import List from "../../containers/web/List";
//import BolgSider from '../sider'




//const { Content, Footer, Sider } = Layout

class WebLayout extends Component {
    /*static propTypes = {
        children: PropTypes.node
    }*/

  render() {
    console.log(this.props);
    const { match } = this.props;
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
      <Layout className="app-container">
        <Header />
        <Row className="main-wrapper">
          <Col {...siderLayout}>
            <Sider />
          </Col>
          <Col {...contentLayout}>
            <div className="content-wrapper">
              
                
                <Route exact path="/article/:id" component={Article}/>
                <Route exact path="/tags/:name" component={List}/>
                <Route exact path="/" component={Home} />
            </div>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default WebLayout
/*
<Layout className="app-container">
                <Header />
		<Route exact path={match.path} component={Home}/>
		<Route path={`${match.path}/try`} component={Try}/>
		<Route path={`${match.path}/article/:id`} component={Article}/>
            </Layout >
*/
/*

<Layout className="app-container">
                <Header />
                <Row className="main-wrapper">
                    <Col {...siderLayout}>
                        <BolgSider />
                    </Col>
                    <Col {...contentLayout}>
                        <div className="content-wrapper">

{ this.props.children }

                        </div >
                    </Col >
                </Row >
    <BackTop target={() => document.querySelector('.content-wrapper')} />
            </Layout >
*/

