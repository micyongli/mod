
import SerialPage from './SerialPage';
import ChartPage from './ChartPage';
export default [
    { id: 'serialPage', icon: 'setting', desc: '设置', path: '/', component: SerialPage },
    { id: 'historyChart', icon: 'pie-chart', desc: '曲线', path: '/chart', component: ChartPage }
]