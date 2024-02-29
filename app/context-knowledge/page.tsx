import { AllTeamsOverview } from '@/components/AllTeamsOverview/AllTeamsOverview'
import { Title } from '@/components/Title/Title'

import {
    _getGoogleSheetClient,
    _readGoogleSheet,
    _readGoogleSpreadsheet,
} from '@/utils/requests/sheets'

export default async function Page() {
    // const sheetId = process.env.SHEET_ID
    // const range = 'A:D'

    // const getAllTeamData = async () => {
    //     const googleSheetClient = await _getGoogleSheetClient()

    //     const spreadSheetInfo = await _readGoogleSpreadsheet(
    //         // googleSheetClient,
    //         sheetId as string
    //     )

    //     const scoreSheets = spreadSheetInfo
    //         ?.filter((sheet) => sheet.properties?.title?.includes('scores'))
    //         .map((scoreSheet) => scoreSheet.properties?.title)

    //     const ordered = scoreSheets?.reverse()

    //     const last = ordered?.at(0) ?? ''
    //     const secondLast = ordered?.at(1) ?? ''

    //     const result = []

    //     const lastData = await _readGoogleSheet(
    //         googleSheetClient,
    //         sheetId as string,
    //         last,
    //         range
    //     )

    //     result.push({ name: last, data: lastData })

    //     if (secondLast) {
    //         const secondLastData = await _readGoogleSheet(
    //             googleSheetClient,
    //             sheetId as string,
    //             secondLast,
    //             range
    //         )

    //         result.push({ name: secondLast, data: secondLastData })
    //     }

    //     return result
    // }

    // const result = await getAllTeamData()

    // return (
    //     <section className="w-full">
    //         <Title> Knowledge overview</Title>
    //         <h2 className="my-10 text-3xl font-bold text-white">
    //             Teams per context
    //         </h2>

    //         <AllTeamsOverview scoreResult={result}></AllTeamsOverview>
    //     </section>
    // )

    return <></>
}
