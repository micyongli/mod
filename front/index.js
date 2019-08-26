import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { message, Layout } from 'antd'

function Test(props) {
    console.log(props)
    return <div>----------ok</div>
}

class App extends React.Component {
    componentDidMount() {
        message.success('load completed');
    }
    render() {
        return (
            <Route exact path='/' component={Test} />
        );
    }
}

const AppWrapper = withRouter(App);

ReactDOM.render(<BrowserRouter><AppWrapper /></BrowserRouter>, document.getElementById('app'));