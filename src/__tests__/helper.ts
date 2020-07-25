import * as kraken from "../types/kraken";

export const expectChannel = (channel: kraken.Channel): void => {
  expect(channel._id).toBeDefined();
  expect(channel.broadcaster_language).toBeDefined();
  expect(channel.created_at).toBeDefined();
  expect(channel.display_name).toBeDefined();
  expect(channel.followers).toBeDefined();
  expect(channel.game).toBeDefined();
  expect(channel.language).toBeDefined();
  expect(channel.logo).toBeDefined();
  expect(channel.mature).toBeDefined();
  expect(channel.name).toBeDefined();
  expect(channel.partner).toBeDefined();
  expect(channel.profile_banner).toBeDefined();
  expect(channel.profile_banner_background_color).toBeDefined();
  expect(channel.status).toBeDefined();
  expect(channel.updated_at).toBeDefined();
  expect(channel.url).toBeDefined();
  expect(channel.video_banner).toBeDefined();
  expect(channel.views).toBeDefined();
};

export const expectUser = (user: kraken.User): void => {
  expect(user._id).toBeDefined();
  expect(user.bio).toBeDefined();
  expect(user.created_at).toBeDefined();
  expect(user.display_name).toBeDefined();
  expect(user.logo).toBeDefined();
  expect(user.name).toBeDefined();
  expect(user.type).toBeDefined();
  expect(user.updated_at).toBeDefined();
};

export const expectThumbnail = (thumbnail: kraken.Thumbnails): void => {
  expect(thumbnail.large).toBeDefined();
  expect(thumbnail.medium).toBeDefined();
  expect(thumbnail.small).toBeDefined();
  expect(thumbnail.template).toBeDefined();
};

export const expectClipUser = (user: kraken.ClipUser): void => {
  expect(user.channel_url).toBeDefined();
  expect(user.display_name).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.logo).toBeDefined();
  expect(user.name).toBeDefined();
};

export const expectClip = (clip: kraken.Clip): void => {
  expect(clip.broadcaster).toBeDefined();
  expectClipUser(clip.broadcaster);
  expect(clip.created_at).toBeDefined();
  expect(clip.curator).toBeDefined();
  expectClipUser(clip.curator);
  expect(clip.duration).toBeDefined();
  expect(clip.embed_html).toBeDefined();
  expect(clip.embed_url).toBeDefined();
  expect(clip.game).toBeDefined();
  expect(clip.language).toBeDefined();
  expect(clip.slug).toBeDefined();
  expect(clip.thumbnails).toBeDefined();
  expect(clip.thumbnails.medium).toBeDefined();
  expect(clip.thumbnails.small).toBeDefined();
  expect(clip.thumbnails.tiny).toBeDefined();
  expect(clip.title).toBeDefined();
  expect(clip.tracking_id).toBeDefined();
  expect(clip.url).toBeDefined();
  expect(clip.views).toBeDefined();
  expect(clip.vod).toBeDefined();
  if (clip.vod) {
    expect(clip.vod.id).toBeDefined();
    expect(clip.vod.url).toBeDefined();
  }
};

export const expectCollectionMetadata = (
  collection: kraken.CollectionMetadata,
): void => {
  expect(collection._id).toBeDefined();
  expect(collection.created_at).toBeDefined();
  expect(collection.items_count).toBeDefined();
  expect(collection.owner).toBeDefined();
  expectUser(collection.owner);
  expect(collection.thumbnails).toBeDefined();
  expectThumbnail(collection.thumbnails);
  expect(collection.title).toBeDefined();
  expect(collection.total_duration).toBeDefined();
  expect(collection.updated_at).toBeDefined();
  expect(collection.views).toBeDefined();
};

export const expectCollectionItem = (item: kraken.CollectionItem): void => {
  expect(item._id).toBeDefined();
  expect(item.description_html).toBeDefined();
  expect(item.duration).toBeDefined();
  expect(item.game).toBeDefined();
  expect(item.item_id).toBeDefined();
  expect(item.item_type).toBeDefined();
  expect(item.owner).toBeDefined();
  expectUser(item.owner);
  expect(item.published_at).toBeDefined();
  expect(item.thumbnails).toBeDefined();
  expectThumbnail(item.thumbnails);
  expect(item.title).toBeDefined();
  expect(item.views).toBeDefined();
};

export const expectGame = (game: kraken.Game): void => {
  expect(game._id).toBeDefined();
  expect(game.box).toBeDefined();
  expectThumbnail(game.box);
  expect(game.giantbomb_id).toBeDefined();
  expect(game.logo).toBeDefined();
  expectThumbnail(game.logo);
  expect(game.name).toBeDefined();
};

export const expectStream = (stream: kraken.Stream): void => {
  expect(stream._id).toBeDefined();
  expect(stream.average_fps).toBeDefined();
  expect(stream.channel).toBeDefined();
  expectChannel(stream.channel);
  expect(stream.created_at).toBeDefined();
  expect(stream.delay).toBeDefined();
  expect(stream.game).toBeDefined();
  expect(stream.is_playlist).toBeDefined();
  expect(stream.preview).toBeDefined();
  expectThumbnail(stream.preview);
  expect(stream.video_height).toBeDefined();
  expect(stream.viewers).toBeDefined();
};

export const expectTeam = (team: kraken.Team): void => {
  expect(team._id).toBeDefined();
  expect(team.background).toBeDefined();
  expect(team.banner).toBeDefined();
  expect(team.created_at).toBeDefined();
  expect(team.display_name).toBeDefined();
  expect(team.info).toBeDefined();
  expect(team.logo).toBeDefined();
  expect(team.name).toBeDefined();
  expect(team.updated_at).toBeDefined();
  if (team.users) {
    team.users.forEach(expectChannel);
  }
};

export const expectEmoticonSets = (
  sets: kraken.map<kraken.SetEmoticon[]>,
): void => {
  Object.values(sets).forEach((set: kraken.SetEmoticon[]) => {
    set.forEach((emote) => {
      expect(emote.code).toBeDefined();
      expect(emote.id).toBeDefined();
    });
  });
};

export const expectSubscription = (
  sub: kraken.ChannelSubscription | kraken.UserSubscription,
): void => {
  const tiers = [
    kraken.SubscriptionTier["Tier 1"],
    kraken.SubscriptionTier["Tier 2"],
    kraken.SubscriptionTier["Tier 3"],
  ];
  const tierMatcher = new RegExp(`(${tiers.join("|")})`);
  expect(sub._id).toBeDefined();
  expect(sub.created_at).toBeDefined();
  expect(sub.sub_plan).toMatch(tierMatcher);
  expect(sub.sub_plan_name).toBeDefined();
};

export const expectVideo = (video: kraken.Video): void => {
  expect(video._id).toBeDefined();
  expect(video.broadcast_id).toBeDefined();
  expect(video.broadcast_type).toBeDefined();
  expect(video.channel).toBeDefined();
  expect(video.channel._id).toBeDefined();
  expect(video.channel.display_name).toBeDefined();
  expect(video.channel.name).toBeDefined();
  expect(video.created_at).toBeDefined();
  expect(video.description).toBeDefined();
  expect(video.description_html).toBeDefined();
  expect(video.fps).toBeDefined();
  Object.values(video.fps).forEach((fps) => {
    expect(fps).not.toBeNaN();
  });
  expect(video.game).toBeDefined();
  expect(video.language).toBeDefined();
  expect(video.length).toBeDefined();
  if (video.muted_segments) {
    video.muted_segments.forEach((segment) => {
      expect(segment.duration).toBeDefined();
      expect(segment.offset).toBeDefined();
    });
  }
  expect(video.preview).toBeDefined();
  expectThumbnail(video.preview);
  expect(video.published_at).toBeDefined();
  expect(video.resolutions).toBeDefined();
  Object.values(video.resolutions).forEach((res) => {
    expect(res).not.toBeNaN();
  });
  expect(video.status).toBeDefined();
  expect(video.tag_list).toBeDefined();
  expect(video.thumbnails).toBeDefined();
  expect(video.thumbnails.large).toBeDefined();
  expect(video.thumbnails.medium).toBeDefined();
  expect(video.thumbnails.small).toBeDefined();
  expect(video.thumbnails.template).toBeDefined();
  Object.values(video.thumbnails).forEach(
    (thumbnail: kraken.VideoThumbnailData[]) => {
      thumbnail.forEach((td) => {
        expect(td.type).toBeDefined();
        expect(td.url).toBeDefined();
      });
    },
  );
  expect(video.title).toBeDefined();
  expect(video.url).toBeDefined();
  expect(video.viewable).toBeDefined();
  expect(video.viewable_at).toBeDefined();
  expect(video.views).toBeDefined();
};
