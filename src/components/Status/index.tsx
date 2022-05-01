import React, { useState, useEffect } from 'react';

import { Status } from '../../models';

import { Tile } from '../Tile';
import { getStatus } from '../../utils/data';

export function StatusComp({
    config,
    onChange,
}: {
    config: Status | boolean | undefined;
    onChange: (status: Status, removeItem?: boolean) => void;
}) {
    const [selected, setSelected] = useState(!!config);

    useEffect(() => {
        setSelected(!!config);
    }, [config]);

    const header = (
        <div>
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => {
                    const defaultVal = getStatus();
                    if (e.target.checked) {
                        onChange(defaultVal);
                    } else {
                        onChange(defaultVal, true);
                    }
                    setSelected(e.target.checked);
                }}
            />
            <label>Status</label>
        </div>
    );

    let body: JSX.Element | null = null;

    if (selected) {
        body = (
            <div>
                <input
                    type="checkbox"
                    checked={
                        typeof config === 'boolean' ? false : !!config?.value
                    }
                    onChange={(e) => {
                        const newStatus = getStatus({
                            value: e.target.checked,
                        });
                        onChange(newStatus);
                    }}
                />
                <label>Enabled</label>
            </div>
        );
    }

    return <Tile header={header} body={body} />;
}
