import React, { useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { message, Layout, Row } from 'antd'
import './index.css';


import NavMenu from './components/NavMenu';

import RouteArray from './components/config';

class App extends React.Component {
    state = {
        show: false
    }
    componentDidMount() {
        message.success('load completed');
    }

    jump = path => {
        this.setState({ show: false }, () =>
            this.props.history.push(path));
    }

    render() {
      
        return (
            <Layout>
                <Row className={'app-header'}>
                    <h2>Componay Name</h2>
                </Row>
                <Row className={'app-menu-border'}>
                    <NavMenu />
                </Row>

                {
                    RouteArray.map((x, inx) => {
                        const { path, component } = x;
                        return <Route exact path={path} component={component} key={inx} />
                    })
                }
            
            </Layout >
        );
    }
}

const AppWrapper = withRouter(App);


ReactDOM.render(<BrowserRouter><AppWrapper /></BrowserRouter>, document.getElementById('app'));