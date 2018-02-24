import validator from 'validator';

export const required = (value) => {
    console.log("value: ", value);
    if (!value.trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return 'required';
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`
    }
};

export const noDuplicate = (value) => {
    // Hardcoded for demo.  In real case, this should be fetched from the server
    if (value === "abc@test.com") {
        return `${value} is duplicate in the system.`
    }
};
