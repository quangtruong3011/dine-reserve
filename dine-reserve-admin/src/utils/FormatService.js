import moment from "moment";

export class FormatService {
    dateTimeFormat(dateTime) {
        return moment(dateTime).format("YYYY-MM-DD HH:mm");
    }

    formatToISO(dateTime) {
        return moment(dateTime).toISOString();
    }
}