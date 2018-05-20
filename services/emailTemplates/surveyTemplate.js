const keys = require('../../config/keys')

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/webhooks/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/webhooks/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}