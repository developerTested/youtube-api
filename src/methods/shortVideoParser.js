export default function shortVideoParser(json) {

    if(!json?.videoId) {
        return {};
    }

    return {
        id: json.videoId,
        type: "reel",
        thumbnail: json.thumbnail.thumbnails[0],
        title: json.headline.simpleText,
    }
}
