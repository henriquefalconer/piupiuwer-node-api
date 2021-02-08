interface IDateProvider {
    parseDate(date: string): Date | undefined;
    stringifyDate(date: Date): string;
}

export default IDateProvider;
