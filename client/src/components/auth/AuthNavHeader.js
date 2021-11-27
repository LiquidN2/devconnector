import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthNavHeader = props => {
    return (
        <ul className="tab-group">
            <NavLink to="/login" className="tab-group__item" activeClassName="tab-group__item--active">
                <span className="tab-group__link">Login</span>
            </NavLink>
            <NavLink to="/register" className="tab-group__item" activeClassName="tab-group__item--active">
                <span className="tab-group__link">Register</span>
            </NavLink>
        </ul>
    );
};

export default AuthNavHeader;
