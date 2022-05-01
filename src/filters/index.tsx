import React, { ReactNode, useEffect, useState } from 'react';
import { Data, FILTER_TYPES, Status, DateType, Amount } from '../models';
import { SAMPLE_DATA } from '../data';

import { StatusComp } from '../components/Status';
import { AmountComp } from '../components/Amount';
import { DateTile } from '../components/DateTile';

import './styles.css';

function FilterHeader({
    onClear,
    onDone,
}: {
    onClear: () => void;
    onDone: () => void;
}) {
    return (
        <div className="filterHeader">
            <button onClick={onClear}>Clear</button>
            <button onClick={onDone}>Done</button>
        </div>
    );
}

export function Filters() {
    const [items, setItems] = useState<Data>(SAMPLE_DATA);
    let body = null;
    if (items) {
        body = (
            <div>
                <StatusComp
                    config={
                        items[FILTER_TYPES.STATUS] !== undefined
                            ? items[FILTER_TYPES.STATUS]
                            : false
                    }
                    onChange={(updatedVal: Status, removeItem?: boolean) => {
                        const newItems = Object.assign({}, items);
                        if (removeItem) {
                            delete newItems[FILTER_TYPES.STATUS];
                        } else {
                            newItems[FILTER_TYPES.STATUS] = updatedVal;
                        }
                        setItems(newItems);
                    }}
                />
                <AmountComp
                    config={
                        items[FILTER_TYPES.AMOUNT] !== undefined
                            ? items[FILTER_TYPES.AMOUNT]
                            : false
                    }
                    onChange={(
                        updatedVal: Amount | undefined,
                        removeItem?: boolean
                    ) => {
                        const newItems = Object.assign({}, items);
                        if (removeItem) {
                            delete newItems[FILTER_TYPES.AMOUNT];
                        } else if (updatedVal) {
                            newItems[FILTER_TYPES.AMOUNT] = updatedVal;
                        }
                        setItems(newItems);
                    }}
                />
                <DateTile
                    config={
                        items[FILTER_TYPES.DATE] !== undefined
                            ? items[FILTER_TYPES.DATE]
                            : false
                    }
                    onChange={(
                        updatedVal: DateType | undefined,
                        removeItem?: boolean
                    ) => {
                        const newItems = Object.assign({}, items);
                        if (removeItem) {
                            delete newItems[FILTER_TYPES.DATE];
                        } else if (updatedVal) {
                            newItems[FILTER_TYPES.DATE] = updatedVal;
                        }
                        setItems(newItems);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="filters">
            <FilterHeader
                onClear={() => {
                    setItems({});
                }}
                onDone={() => {
                    console.log(JSON.stringify(items));
                }}
            />
            {body}
        </div>
    );
}
