import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import App from "./App";
//marked with highlight
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atelier-dune-light.css'  //import 'highlight.js/styles/kimbie.light.css'
import './assets/index.less'

//iconfont
import './assets/iconfont/iconfont.css'
//import './assets/reset.less'
hljs.registerLanguage('javascript', javascript)

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
}
render(App)

//ReactDOM.render(<App/>, document.getElementById("root"));