import cls from './App.module.css'
import { NavLink, Route, Switch } from 'react-router-dom'
import {AiFillSetting} from 'react-icons/ai'
import Site from './Pages/Site'
import Clothes from './Pages/Clothes'

const App = () => {
    return ( 
        <section className={cls.admin}>
            <div className={cls.admin_container}>
                <div className={cls.admin_title}>
                    <ul className={cls.admin_title_ulOne}>
                        <li>
                            <span>Market</span>
                        </li>
                    </ul>
                    <ul className={cls.admin_title_ulTwo}>
                        <NavLink activeClassName={cls.activeLink} to='/admin/clothes'>Clothes</NavLink>
                        <NavLink activeClassName={cls.activeLink} to='/admin/edit'>
                            Edit <AiFillSetting/>
                        </NavLink>
                    </ul>
                </div>
                <Switch>
                    <Route component={Site} path='/admin/edit'/>
                    <Route component={Clothes} path='/admin/clothes'/>
                </Switch>
            </div>
        </section>
    )
}

export default App