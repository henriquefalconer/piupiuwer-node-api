import moment from 'moment';

import IDateProvider from './types';

class DateProvider implements IDateProvider {
    public parseDate(date: string): Date | undefined {
        const parsedMoment = moment(date, 'DD/MM/YYYY');

        if (!parsedMoment.isValid()) return;

        const parsedDate = parsedMoment.toDate();

        return parsedDate;
    }

    public stringifyDate(date: Date): string {
        const parsedMoment = moment(date)

        const stringifiedDate = parsedMoment.format('DD/MM/YYYY');

        return stringifiedDate;
    }
}

export default DateProvider;
