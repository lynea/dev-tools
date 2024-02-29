import { google, sheets_v4 } from 'googleapis'

async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            token_url: process.env.TOKEN_URL,
            client_id: process.env.CLIENT_ID,
            client_email: process.env.CLIENT_EMAIL,
            type: 'service_account',
            private_key: process?.env?.PRIVATE_KEY?.split(String.raw`\n`).join(
                '\n'
            ),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const authClient = await auth.getClient()
    // return google.sheets({
    //     version: 'v4',
    //     auth: authClient,
    // })
}

async function _readGoogleSheet(
    googleSheetClient: sheets_v4.Sheets,
    sheetId: string,
    tabName: string,
    range: string
) {
    try {
        const res = await googleSheetClient.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${tabName}!${range}`,
        })

        return res.data.values
    } catch (error) {
        console.error(error)
    }
}

async function _readGoogleSpreadsheet(
    googleSheetClient: sheets_v4.Sheets,
    sheetId: string
) {
    try {
        const res = await googleSheetClient.spreadsheets.get({
            spreadsheetId: sheetId,
        })

        return res.data.sheets
    } catch (error) {
        console.error(error)
    }
}

export { _getGoogleSheetClient, _readGoogleSheet, _readGoogleSpreadsheet }
