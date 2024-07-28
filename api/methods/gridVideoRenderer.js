export default function gridVideoRenderer(json) {
    if (!json?.videoId) {
        return {};
    }

    let isLive = false;
    if (
        json.badges &&
        json.badges.length > 0 &&
        json.badges[0].metadataBadgeRenderer &&
        json.badges[0].metadataBadgeRenderer.style ===
        "BADGE_STYLE_TYPE_LIVE_NOW"
    ) {
        isLive = true;
    }

    if (json.thumbnailOverlays) {
        json.thumbnailOverlays.forEach((item) => {
            if (
                item.thumbnailOverlayTimeStatusRenderer &&
                item.thumbnailOverlayTimeStatusRenderer.style &&
                item.thumbnailOverlayTimeStatusRenderer.style === "LIVE"
            ) {
                isLive = true;
            }
        });
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

    const channelUrl = json.shortBylineText?.runs[0]?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;


    let viewCount = 0;

    if (isLive) {
        viewCount = json?.viewCountText?.runs?.map((x) => x.text)?.join('');
    } else if (isLive && json?.shortViewCountText?.runs) {
        viewCount = json?.shortViewCountText?.runs?.map((x) => x.text).join('')
    } else {
        viewCount = json?.shortViewCountText?.simpleText;
    }

    const channel = {
        id: channelUrl ? channelUrl?.replace('/@', '') : '',
        title: json.shortBylineText?.runs?.map((x) => x.text).join(''),
        url: channelUrl ? channelUrl?.replace('/@', '/channel/') : '',
        avatar: json?.channelThumbnail?.thumbnails?.pop(),
        verified,
        artist,
    };

    return {
        id: json.videoId,
        type: isLive ? "Live" : "video",
        title: json?.title?.simpleText,
        thumbnail: json?.thumbnail?.thumbnails?.pop(),
        publishedAt: json?.publishedTimeText?.simpleText,
        views: viewCount,
        channel,
        isLive,
    };
}