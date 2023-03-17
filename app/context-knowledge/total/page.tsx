import { AllTeamsOverview } from "@/components/AllTeamsOverview/AllTeamsOverview";
import { Badge } from "@/components/Badge/Badge";
import { Title } from "@/components/Title/Title";
import { TotalOverview } from "@/components/TotalOverview copy/TotalOverview";

import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "@/utils/requests/sheets";

export default async function Page() {
  const sheetId = process.env.SHEET_ID;
  const range = "A:F";

  const getAllTeamData = async () => {
    const googleSheetClient = await _getGoogleSheetClient();

    const spreadSheetInfo = await _readGoogleSpreadsheet(
      googleSheetClient,
      sheetId as string
    );

    const scoreSheets = spreadSheetInfo
      ?.filter((sheet) => sheet.properties?.title?.includes("total"))
      .map((scoreSheet) => scoreSheet.properties?.title);

    const ordered = scoreSheets?.reverse();

    const last = ordered?.at(0) ?? "";
    const secondLast = ordered?.at(1) ?? "";

    const result = [];

    const lastData = await _readGoogleSheet(
      googleSheetClient,
      sheetId as string,
      last,
      range
    );

    result.push({ name: last, data: lastData });

    if (secondLast) {
      const secondLastData = await _readGoogleSheet(
        googleSheetClient,
        sheetId as string,
        secondLast,
        range
      );

      result.push({ name: secondLast, data: secondLastData });
    }

    return result;
  };

  const result = await getAllTeamData();

  return (
    <>
      <div className="fixed  top-6 right-6 [&>*]:mt-7">
        <Badge
          imageUrl="https://ca.slack-edge.com/T0293DCA1-U02GTG9377G-a3830c0ad148-512"
          best
          text="Current best"
          label="Igor"
        />

        <Badge
          imageUrl="https://ca.slack-edge.com/T0293DCA1-URSS5EGQ7-9149da56002b-512"
          text="#2"
          label="Rene"
        />

        <Badge
          imageUrl="https://ca.slack-edge.com/T0293DCA1-U3971GJUA-gec99fed0ef3-512"
          text="#3"
          label="Nienke"
        />
      </div>
      <section className="w-full">
        <Title> Knowledge overview</Title>
        <h2 className="font-bold  mb-8 text-3xl text-white">
          Total score per team
        </h2>

        <TotalOverview scoreResult={result}></TotalOverview>
      </section>
    </>
  );
}
