import React from 'react';
import { COMPARATORS, DATE_COMPARATORS } from '../../models';

const OptionLabels: { [key: string]: string } = {
    [COMPARATORS.IS_EQUAL]: 'Is equal',
    [COMPARATORS.IS_GREATER_THAN]: 'Is greater than',
    [COMPARATORS.IS_IN_BETWEEN]: 'Is in between',
    [COMPARATORS.IS_LESS_THAN]: 'Is less than',
    [DATE_COMPARATORS.IS_AFTER]: 'Is After',
    [DATE_COMPARATORS.IS_BEFORE]: 'Is Before',
    [DATE_COMPARATORS.IS_BEFORE_OR_ON]: 'Is Before Or On',
    [DATE_COMPARATORS.IS_BETWEEN]: 'Is Between',
    [DATE_COMPARATORS.IS_EQUAL]: 'Is Equal',
    [DATE_COMPARATORS.IS_IN_THE_LAST]: 'Is In The Last',
    [DATE_COMPARATORS.IS_ON_OR_AFTER]: 'Is On Or After',
};

export function Comparator({
    options,
    onSelect,
    value,
}: {
    options: Array<string>;
    onSelect: (option: string | undefined) => void;
    value: string;
}) {
    return (
        <select onChange={(e) => onSelect(e.target.value)} value={value}>
            {options.map((opt, idx) => {
                return (
                    <option key={`${opt}-${idx}`} value={opt}>
                        {OptionLabels[opt]}
                    </option>
                );
            })}
        </select>
    );
}
