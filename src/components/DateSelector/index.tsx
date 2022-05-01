import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DateSelector({
    value,
    onChange,
}: {
    value: number;
    onChange: (val: number) => void;
}) {
    const dateVal = new Date(value);
    return (
        <DatePicker
            selected={dateVal}
            onChange={(date: Date) => {
                const timestampString = date.getTime();
                console.log(date.getTime());
                onChange(timestampString);
            }}
        />
    );
}
