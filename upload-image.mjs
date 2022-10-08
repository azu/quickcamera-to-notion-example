import activeWindow from "active-win";
import util from "util";
import { execFile } from "child_process";
import { Client } from "@notionhq/client";
import robot from "robotjs";

const execFilePromise = util.promisify(execFile);

const NOTION_API_KEY = "secret_ NotionのAPI Key"; // https://www.notion.so/my-integrations
const NOTION_DATABASE_ID = '追記したいNotionのDatabaseのID';
const NOTION_USER_ID = 'NotionのユーザーID'; // https://www.notion.so/<id>
const notion = new Client({ auth: NOTION_API_KEY });
const formatYYYYMMDD = (date) => {
    return date.getFullYear() + "/" +
        String(date.getMonth() + 1).padStart(2, "0",)
        + "/" +
        String(date.getDate()).padStart(2, "0")
}
const waitForOpen = async (retryCount = 0, maxRetryCount = 5) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const activeWin = activeWindow.sync();
    if (activeWin.owner.bundleId?.toLowerCase()?.includes("notion") || activeWin.owner.name?.toLowerCase()?.includes("notion")) {
        return true;
    }
    if (retryCount < maxRetryCount) {
        return waitForOpen(retryCount + 1, maxRetryCount);
    }
    return false;
}
const captureScreenToClipboard = async () => {
    return execFilePromise("screencapture", ["-c"]);
}
// find today(YYYY/MM/DDの部屋) and return it as URL
const fetchNotionURL = async () => {
    const QUERY_TITLE = formatYYYYMMDD(new Date()) + "の部屋";
    const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
            property: 'Name',
            "title": {
                "equals": QUERY_TITLE
            }
        }
    });
    return response.results.find(item => {
        return item.url
    });
}
(async () => {
    await execFilePromise("open", ["-a", "Quick Camera.app"])
    const [_, todayURL] = await Promise.all([captureScreenToClipboard(), fetchNotionURL()]);
    const notionUrl = todayURL.url.replace("https://www.notion.so/", `notion://${NOTION_USER_ID}/`)
    await execFilePromise("open", ["--url", notionUrl]);
    const result = await waitForOpen();
    if (result) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        robot.keyTap("v", "command");
        await new Promise((resolve) => setTimeout(resolve, 500))
        robot.keyTap("end");
    }
})();
