import React, { Component } from 'react'
import axios from '../../../lib/axios'

class Try extends Component {

  componentDidMount() {
    	console.log("get Try");
	axios.get('/article/1')
	.then(function (response) {
	    console.log("then");
	    console.log(response.data);
	})
	.catch(function (error) {
	    console.log("catch");
	    console.log(error);
	});
  }

  render() {
    return (
         <div>i am Try !!!!!</div>
    )
  }
}

export default Try

