import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import App from './App';

const domNode = document.getElementById('root');
//const root = createRoot(domNode);

render(<App />, domNode);

if (module.hot) {
    console.log('Module hot enabled');
    module.hot.accept('.', function () {
        console.log('Hot updates received');
        if (domNode) domNode.innerHTML = '';
        //root.replaceChildren();
        //root.unmount();
        render(<App />, domNode);
    });
}

if (import.meta.webpackHot) {
    console.log('Module hot enabled.');
    import.meta.webpackHot.accept('./App.tsx', function () {
        console.log('Hot updates import.meta.webpackHot');
        if (domNode) domNode.innerHTML = '';
        //root.replaceChildren();
        //root.unmount();
        render(<App />, domNode);
    });
}
