import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/web/Home";
import Try from "./containers/web/Try";
import Article from "./containers/web/Article";
import List from "./containers/web/List";
import adminHome from "./containers/admin/Home";
//import Login from "./components/Login";
import WebLayout from "./components/Layout";
import Header from "./components/Header";
import Sider from "./components/Sider";
import { Layout, Row, Col } from 'antd'
import './app.less'

class App extends Component {
  render() {
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/admin" component={adminHome}></Route>
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


/*

<Route exact path="/" component={WebLayout}></Route>
<Route exact path="/" component={Home} />
<Route exact path="/article/:id" component={Article}/>
<Route exact path="/tags/:name" component={List}/>

<Layout className="app-container">
  <Router>
    <Header />
    <Row className="main-wrapper">
      <Col {...siderLayout}>
        <Sider />
      </Col>
      <Col {...contentLayout}>
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/try" component={Try}/>
            <Route exact path="/article/:id" component={Article}/>
            <Route exact path="/tags/:name" component={List}/>
          </Switch>
        </div>
      </Col>
    </Row>
  </Router>
</Layout>

<div>
                <Router>
		    <Header />
                    <Switch>
                        <Route path="/" component={WebLayout} />

                    </Switch>
                </Router>
            </div>
*/

/*
<Route path="/login" component={Login} />
                    <Route path="/posts" component={Home} />
*/
/*

*/

/*
<Router>
                    <Switch>
                        <Route
			    path="/"
			    render={() => (
				<WebLayout>
				    <Route exact path='' component={Home}/>
				    <Route exact path='try' component={Try}/>
				    <Route exact path='article/:id' component={Article}/>
				</WebLayout>
			    )}
			/>
                    </Switch>
                </Router>
*/

