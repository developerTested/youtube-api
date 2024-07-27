export default function playListParser(data, channel = undefined) {
    const json = data.gridPlaylistRenderer;

    return {
        id: json.playlistId,
        type: "playlist",
        thumbnail: json?.thumbnail?.thumbnails?.pop(),
        title: json.title.runs[0].text,
        label: json?.shortBylineText?.runs?.map((x) => x.text)?.join(''),
        channel,
        publishedAt: json.publishedTimeText?.simpleText,
        length: json.videoCountText?.runs?.map((x) => x.text)?.join(''),
        videos: json.videoCountText?.runs?.map((x) => x.text)?.join(''),
        videoCount: json?.videoCountShortText?.simpleText,
        isLive: false
    }

}