import React from 'react';
import { Menu, Icon } from 'antd';
import config from './config';
import { withRouter } from 'react-router';

import './NavMenu.css';

function findPath(key) {
    const r = config.filter(x => x['id'] === key);
    const { path } = r[0];
    return path;
}

class NavMenu extends React.Component {
    state = {
        sels: [config[0].id]
    }

    componentDidMount() {
        console.log(this.props)
    }

    click = s => {
        const { key } = s;
        this.setState({ sels: [key] }, () => {
            const path = findPath(key);
            this.props.history.push(path);
        });
    }

    render() {
        const { sels } = this.state;
        return (
            (<Menu
                onClick={this.click}
                selectedKeys={sels}
                mode='horizontal' >
                {
                    config.map(x => {
                        const { id, desc, icon } = x;
                        return (
                            <Menu.Item
                                style={{ fontSize: '18px' }}
                                key={id} >
                                {icon ? <Icon type={icon} /> : null}
                                {`${desc}`}
                            </Menu.Item>
                        );
                    })
                }

            </Menu>)
        );
    }
}

export default withRouter(NavMenu);