import * as Yup from "yup";

export const API_HOST = "https://bold-pheasant-84.deno.dev";

export const MONTHS = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};

export const BIRTHDAY_FORM_SCHEMA = Yup.object({
    firstName: Yup.string()
        .required("First name is required")
        .matches(
            /^[a-zA-Z@]+$/,
            "First name may only contain letters",
        ),
    lastName: Yup.string()
        .required("Last name is required")
        .matches(
            /^[a-zA-Z@]+$/,
            "Last name may only contain letters",
        ),
    date: Yup.string()
        .required("Date is required")
        .matches(
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            "Date must be in YYYY-MM-DD format",
        ),
});
