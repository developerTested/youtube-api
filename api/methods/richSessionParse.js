import { parseVideoRender } from "../parser.js";
import shortVideoParser from "./shortVideoParser.js";

export default function richSessionParse(json) {
    let list = []

    if (json.richSectionRenderer) {


        const richSectionRenderer = json.richSectionRenderer.content;

        if (richSectionRenderer.brandVideoShelfRenderer) {

            const brand = richSectionRenderer.brandVideoShelfRenderer

            list = {
                title: 'Recommenced',
                items: brand.content.map((x) => parseVideoRender(x.videoRenderer)),
            }
        }

        if (richSectionRenderer.richShelfRenderer) {
            const title = richSectionRenderer.richShelfRenderer?.title?.runs.map((x) => x.text).join('') ?? null;
            const content = json.richSectionRenderer.content.richShelfRenderer.contents;

            const subList = []

            content.forEach(item => {
                const reelItemRenderer = item?.richItemRenderer?.content?.reelItemRenderer;
                const videoRenderer = item?.richItemRenderer?.content?.videoRenderer;

                let reel = [];

                if (reelItemRenderer) {
                    reel = shortVideoParser(reelItemRenderer);
                } else if (videoRenderer) {
                    reel = parseVideoRender(videoRenderer)
                }

                subList.push(reel);
            });

            list = {
                title,
                items: subList,
            }
        }
    }

    else if (json.richItemRenderer) {
        const videoRenderer = json.richItemRenderer.content.videoRenderer;
        list = parseVideoRender(videoRenderer)
    }
    else {
        list = json;
    }

    const newList = Array.isArray(list) ? list.filter((a) => a) : list;

    return newList;
}
