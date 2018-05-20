const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (emails) => {
    const invalidEMails = emails.split(',').map((email) => email.trim()).filter((email) => {
        if(!email) return false;
        return !re.test(email)
    });
    if(invalidEMails.length > 0) {
        return `The emails are invalid: ${invalidEMails}`;
    }
    return;
}