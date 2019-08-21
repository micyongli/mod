import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'


import { message } from 'antd'
function App() {
    useEffect(() => {

    })
    return <div>react app</div>
}


class Test extends React.Component {
    componentDidMount() {
        message.success('ok')
    }
    render() {
        return <div>--ok--</div>
    }
}

ReactDOM.render(<Test />, document.getElementById('app'));