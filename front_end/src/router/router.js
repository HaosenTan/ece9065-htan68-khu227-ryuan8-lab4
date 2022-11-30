import {
    createBrowserRouter
} from 'react-router-dom';
import Home from '../pages/home.js';
import SignIn from '../pages/signin.js';
import SignUp from '../pages/signup.js';
import TrackSearch from '../pages/trackSearch.js';
import Alter from '../pages/alter.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signin',
        element: <SignIn/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/search',
        element: <TrackSearch/>
    },
    {
        path: '/alter',
        element: <Alter/>
    }
]);

export default router;