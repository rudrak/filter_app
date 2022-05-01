import React, { useEffect, useState } from 'react';

import { Tile } from '../Tile';
import { Comparator } from '../Comparator';
import { DateSelector } from '../DateSelector';

import {
    getDate,
    getDefaultDuration,
    getDefaultRange,
    getDefaultDate,
} from '../../utils/data';

import {
    DateType,
    DATE_COMPARATORS,
    DURATION,
    DurationVal,
} from '../../models';

function RangeFields({
    config,
    onChange,
}: {
    config: DateType;
    onChange: (config: DateType) => void;
}) {
    const vals = config.value as Array<number>;
    return (
        <div>
            <DateSelector
                value={vals[0]}
                onChange={(value) => {
                    const val = config.value as Array<number>;
                    val[0] = value;
                    config.value = val;
                    onChange(config);
                }}
            />
            and
            <DateSelector
                value={vals[1]}
                onChange={(value) => {
                    const val = config.value as Array<number>;
                    val[1] = value;
                    config.value = val;
                    onChange(config);
                }}
            />
        </div>
    );
}

function SimpleInput({
    config,
    onChange,
}: {
    config: DateType;
    onChange: (config: DateType) => void;
}) {
    const val = config.value as number;
    return (
        <div>
            <DateSelector
                value={val}
                onChange={(value) => {
                    config.value = value;
                    onChange(config);
                }}
            />
        </div>
    );
}

function DurationInput({
    config,
    onChange,
}: {
    config: DateType;
    onChange: (config: DateType) => void;
}) {
    const val = config.value as DurationVal;
    const dur = Object.values(DURATION);
    return (
        <div>
            <input
                type="text"
                value={val.value}
                onChange={(e) => {
                    const duration = config.value as DurationVal;
                    duration.value = parseInt(e.target.value, 10);
                    config.value = duration;
                    onChange(config);
                }}
            />
            <select
                onChange={(e) => {
                    const val = config.value as DurationVal;
                    val.duration = e.target.value as DURATION;
                    config.value = val;
                    onChange(config);
                }}
            >
                {dur.map((opt, idx) => {
                    return (
                        <option key={`${opt}-${idx}`} value={opt}>
                            {opt}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

const ComparatorFieldMap = {
    [DATE_COMPARATORS.IS_IN_THE_LAST]: DurationInput,
    [DATE_COMPARATORS.IS_EQUAL]: SimpleInput,
    [DATE_COMPARATORS.IS_BETWEEN]: RangeFields,
    [DATE_COMPARATORS.IS_AFTER]: SimpleInput,
    [DATE_COMPARATORS.IS_ON_OR_AFTER]: SimpleInput,
    [DATE_COMPARATORS.IS_BEFORE]: SimpleInput,
    [DATE_COMPARATORS.IS_BEFORE_OR_ON]: SimpleInput,
};

const ComparatorDefaultFnMap = {
    [DATE_COMPARATORS.IS_IN_THE_LAST]: getDefaultDuration,
    [DATE_COMPARATORS.IS_EQUAL]: getDefaultDate,
    [DATE_COMPARATORS.IS_BETWEEN]: getDefaultRange,
    [DATE_COMPARATORS.IS_AFTER]: getDefaultDate,
    [DATE_COMPARATORS.IS_ON_OR_AFTER]: getDefaultDate,
    [DATE_COMPARATORS.IS_BEFORE]: getDefaultDate,
    [DATE_COMPARATORS.IS_BEFORE_OR_ON]: getDefaultDate,
};

function getValComponents(
    config: boolean | DateType | undefined,
    onChange: (config: DateType) => void
) {
    if (config && typeof config !== 'boolean') {
        const Component = ComparatorFieldMap[config.comparator];

        return <Component config={config} onChange={onChange} />;
    } else {
        return null;
    }
}

export function DateTile({
    config,
    onChange,
}: {
    config: DateType | boolean | undefined;
    onChange: (status: DateType, removeItem?: boolean) => void;
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
                    const defaultVal = getDate();
                    if (e.target.checked) {
                        onChange(defaultVal);
                    } else {
                        onChange(defaultVal, true);
                    }
                    setSelected(e.target.checked);
                }}
            />
            <label>Date</label>
        </div>
    );
    let body: JSX.Element | null = null;
    if (selected) {
        body = (
            <div>
                <Comparator
                    options={Object.values(DATE_COMPARATORS) as Array<string>}
                    value={
                        typeof config !== 'boolean' && config?.comparator
                            ? config?.comparator
                            : DATE_COMPARATORS.IS_EQUAL
                    }
                    onSelect={(comp: string | undefined) => {
                        if (typeof config !== 'boolean') {
                            const newConfig = Object.assign({}, config);
                            const getVal =
                                ComparatorDefaultFnMap[
                                    comp as DATE_COMPARATORS
                                ];
                            newConfig.comparator = comp as DATE_COMPARATORS;
                            newConfig.value = getVal();
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
