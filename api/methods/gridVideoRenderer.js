export default function gridVideoRenderer(json) {
    if (!json?.videoId) {
        return {};
    }

    let verified = false;
    if (
        json.ownerBadges &&
        json.ownerBadges.length > 0 &&
        json.ownerBadges[0].metadataBadgeRenderer &&
        json.ownerBadges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_VERIFIED"
    ) {
        verified = true;
    }

    let artist = false;
    if (
        json.ownerBadges &&
        json.ownerBadges.length > 0 &&
        json.ownerBadges[0].metadataBadgeRenderer &&
        json.ownerBadges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_VERIFIED_ARTIST"
    ) {
        artist = true;
    }

    const channelUrl = json.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url;

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: json.shortBylineText.runs?.map((x) => x.text).join(''),
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: json?.channelThumbnail?.thumbnails?.pop(),
        verified,
        artist,
    };

    return {
        id: json.videoId,
        type: "video",
        title: json.title?.simpleText,
        thumbnail: json.thumbnail?.thumbnails?.pop(),
        publishedAt: json?.publishedTimeText?.simpleText,
        views: json?.shortViewCountText?.simpleText,
        channel,
    };
}