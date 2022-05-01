import { hot } from 'react-hot-loader/root';
import React, { ReactElement } from 'react';

import { Filters } from './filters'

export function AppComp() {
    return (
        <div>
            <Filters />
        </div>
    )
}

let App: () => JSX.Element = () => <div />;

if (process.env.NODE_ENV !== 'production') {
    console.log('this is a non prod build');
    App = hot(AppComp);
} else {
    App = AppComp;
}

export default App;
