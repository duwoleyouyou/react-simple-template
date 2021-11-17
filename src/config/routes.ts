import { Redirect } from 'react-router-dom'
import App from '@/pages/App/index'
import Questions from '@/pages/questions/index'

export default [
    {
        path:"/",
        component:App,
        exact: true,
    },
    {
        path:"/questions",
        component:Questions,
    },
]