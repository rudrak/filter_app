export enum COMPARATORS {
    IS_EQUAL = 'is_equal',
    IS_GREATER_THAN = 'is_greater_than',
    IS_IN_BETWEEN = 'is_in_between',
    IS_LESS_THAN = 'is_less_than',
}

export enum DATE_COMPARATORS {
    IS_AFTER = 'is_after',
    IS_BEFORE = 'is_before',
    IS_BEFORE_OR_ON = 'is_before_or_on',
    IS_BETWEEN = 'is_between',
    IS_EQUAL = 'is_equal',
    IS_IN_THE_LAST = 'is_in_the_last',
    IS_ON_OR_AFTER = 'is_on_or_after',
}

export enum DURATION {
    HOURS = 'hours',
    DAYS = 'days',
    MONTHS = 'months',
}

export enum FILTER_TYPES {
    STATUS = 'status',
    DATE = 'date',
    AMOUNT = 'amount',
}

export interface DurationVal {
    value: number;
    duration: DURATION;
}

export interface DateType {
    value: number | Array<number> | DurationVal;
    timezone: string;
    comparator: DATE_COMPARATORS;
}

export interface Amount {
    value: number | Array<number>;
    comparator: COMPARATORS;
}

export interface Status {
    value: boolean;
}

export interface Data {
    [FILTER_TYPES.DATE]?: DateType;
    [FILTER_TYPES.AMOUNT]?: Amount;
    [FILTER_TYPES.STATUS]?: Status;
}
