import moment from 'moment';

const formatDateRange = (fromDate, toDate) => {
    let durationYears, durationMonths, duration, formattedToDate;

    const formattedFromDate = fromDate ? moment(fromDate).format('MMM YYYY') : null;
    // const formattedToDate = toDate ? moment(toDate).format('MMM YYYY') : 'present';
    
    if (fromDate && !toDate) {
        formattedToDate = 'present';
        durationYears = moment().diff(moment(fromDate), 'years');
        durationMonths = moment().diff(moment(fromDate), 'months') % 12;
    }

    if (fromDate && toDate) {
        formattedToDate = moment(toDate).format('MMM YYYY');
        durationYears = moment(toDate).diff(moment(fromDate), 'years');
        durationMonths = moment(toDate).diff(moment(fromDate), 'months') % 12;
    }

    if (durationMonths === 0 & durationYears === 0) {
        duration = '';
    } else if (durationMonths === 1 && durationYears === 0) {
        duration = '(1 month)';
    } else if (durationMonths > 1 && durationYears === 0) {
        duration = `(${durationMonths} months)`;
    } else if (durationMonths === 0 && durationYears === 1) {
        duration = `(1 year)`;
    } else if (durationMonths === 1 && durationYears === 1) {
        duration = `(1 year & 1 month)`;
    } else if (durationMonths > 1 && durationYears === 1) {
        duration = `(1 year & ${durationMonths} months)`;
    } else if (durationMonths === 0 && durationYears > 1) {
        duration = `(${durationYears} years)`;
    } else if (durationMonths === 1 && durationYears > 1) {
        duration = `(${durationYears} years & 1 month)`;
    } else if (durationMonths > 1 && durationYears > 1) {
        duration = `(${durationYears} years & ${durationMonths} months)`;
    }

    return {
        formattedFromDate,
        formattedToDate,
        duration
    }
}

export { formatDateRange };