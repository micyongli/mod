import React from 'react'

import ReactDOM from 'react-dom'

function App() {
    return <div>react app</div>
}


class Test extends React.Component {
    render(){
        return <div>--ok--</div>
    }
}

ReactDOM.render(<Test />, document.getElementById('app'));