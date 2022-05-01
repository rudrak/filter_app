import React, { useState, useEffect } from 'react';

import { Tile } from '../Tile';
import { Comparator } from '../Comparator';

import { Amount, COMPARATORS } from '../../models';
import {
    getAmount,
    getDefaultAmountRange,
    getDefaultAmount,
} from '../../utils/data';

function getValComponents(
    config: boolean | Amount | undefined,
    onChange: (config: Amount) => void
) {
    if (config && typeof config !== 'boolean') {
        if (config.comparator === COMPARATORS.IS_IN_BETWEEN) {
            const vals = config.value as Array<number>;
            return (
                <div>
                    <input
                        type="number"
                        value={vals[0]}
                        onChange={(e) => {
                            const val = config.value as Array<number>;
                            val[0] = parseInt(e.target.value, 10);
                            config.value = val;
                            onChange(config);
                        }}
                    />
                    and
                    <input
                        type="number"
                        value={vals[1]}
                        onChange={(e) => {
                            const val = config.value as Array<number>;
                            val[1] = parseInt(e.target.value, 10);
                            config.value = val;
                            onChange(config);
                        }}
                    />
                </div>
            );
        } else {
            const val = config.value as number;
            return (
                <div>
                    <input
                        type="number"
                        value={val}
                        onChange={(e) => {
                            config.value = parseInt(e.target.value, 10);
                            onChange(config);
                        }}
                    />
                </div>
            );
        }
    } else {
        return null;
    }
}

export function AmountComp({
    config,
    onChange,
}: {
    config: Amount | boolean | undefined;
    onChange: (status: Amount, removeItem?: boolean) => void;
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
                    const defaultVal = getAmount();
                    if (e.target.checked) {
                        onChange(defaultVal);
                    } else {
                        onChange(defaultVal, true);
                    }
                    setSelected(e.target.checked);
                }}
            />
            <label>Amount</label>
        </div>
    );

    let body: JSX.Element | null = null;
    if (selected) {
        body = (
            <div>
                <Comparator
                    options={Object.values(COMPARATORS) as Array<string>}
                    value={
                        typeof config !== 'boolean' && config?.comparator
                            ? config?.comparator
                            : COMPARATORS.IS_EQUAL
                    }
                    onSelect={(comp: string | undefined) => {
                        if (typeof config !== 'boolean') {
                            const newConfig = Object.assign({}, config);
                            newConfig.comparator = comp as COMPARATORS;
                            if (comp === COMPARATORS.IS_IN_BETWEEN) {
                                newConfig.value = getDefaultAmountRange();
                            } else {
                                newConfig.value = getDefaultAmount();
                            }
                            onChange(newConfig);
                        }
                    }}
                />
                {getValComponents(config, onChange)}
            </div>
        );
    }
    return <Tile header={header} body={body} />;
}
