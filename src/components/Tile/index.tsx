import React from 'react';

import './styles.css';

export function Tile({
    header,
    body,
}: {
    header: JSX.Element;
    body: JSX.Element | null;
}) {
    return (
        <div className="tileContainer">
            <div className="tileHeader">{header}</div>
            {body ? <div className="tileBody">{body}</div> : null}
        </div>
    );
}
