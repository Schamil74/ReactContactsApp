import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loader from './components/loader/loader'
import Edit from './pages/edit/edit'
import Login from './pages/login'
import Main from './pages/main'
import Register from './pages/register'
import { thunkIsAuth, thunkLogOut } from './store/actions/authActions'
import { AppThunkDispatch, RootState } from './store/types'

const App: FC = () => {
    const authReducer = (state: RootState) => state.authReducer
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const { isFetchingAuth } = useSelector(fetchErrorReducer)

    const { uid } = useSelector(authReducer)

    useEffect(() => {
        if (!uid) {
            thunkDispatch(thunkIsAuth())
        }
    }, [])

    const handleLogOut = () => {
        thunkDispatch(thunkLogOut())
    }

    const logged = (
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/record/:id/" component={Edit}></Route>
            <Redirect to="/" />
        </Switch>
    )

    const unlogged = (
        <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Redirect to="/login" />
        </Switch>
    )

    return (
        <>
            <header className="app__header app-header">
                <div className="app__container container">
                    <h1>ContactsApp</h1>
                    {uid && (
                        <button className="btn btn_wide" onClick={handleLogOut}>
                            Выйти
                        </button>
                    )}
                </div>
            </header>
            <div className="app__main app-main">
                <div className="app__container container">
                    {isFetchingAuth ? (
                        <Loader modificator="fixed" />
                    ) : uid ? (
                        logged
                    ) : (
                        unlogged
                    )}
                </div>
            </div>
            <footer className="app__footer app-footer">
                <div className="app__container container">
                    <address className="app__author">
                        <a
                            rel="author"
                            href="https://kot6eremot.tk/"
                            target="_blank"
                        >
                            React Developer Minibaev Shamil
                        </a>
                    </address>
                </div>
            </footer>
        </>
    )
}

export default App
