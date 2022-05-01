import { Amount, Status, DateType, DATE_COMPARATORS, COMPARATORS, DurationVal, DURATION } from '../models';

interface StatusOptions {
    value: boolean;
}

export function getStatus(options?: StatusOptions): Status {
    return {
        value: options ? options.value : false,
    };
}

interface AmountOptions {
    comparator: COMPARATORS;
    value: number | Array<number>;
}

export function getAmount(options?: AmountOptions): Amount {
    return {
        comparator: options ? options.comparator : COMPARATORS.IS_EQUAL,
        value: options ? options.value : 0,
    };
}


interface DateOptions {
    comparator: DATE_COMPARATORS;
    value: number;
    timezone: 'string';
}

export function getDate(options?: DateOptions): DateType {
    return {
        comparator: options ? options.comparator : DATE_COMPARATORS.IS_AFTER,
        value: options ? options.value : Date.now(),
        timezone: options ? options.timezone : 'utc'
    };
}

export function getDefaultAmountRange(): Array<number> {
    return [0, 0];
}

export function getDefaultAmount(): number {
    return 0;
}

export function getDefaultDuration(): DurationVal {
    return {
        value: 0,
        duration: DURATION.HOURS,
    };
}

export function getDefaultRange(): Array<number> {
    return [Date.now(), Date.now()];
}

export function getDefaultDate(): number {
    return Date.now();
}
