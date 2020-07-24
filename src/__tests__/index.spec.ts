/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jsKraken from "../index";
import * as kraken from "../types/kraken";

const TWITCH_CLIENT = process.env.TWITCH_CLIENT || "";
const TWITCH_TOKEN = process.env.TWITCH_TOKEN || "";

let TWITCH_USER: kraken.CurrentUser;
let TWITCH_CHANNEL: kraken.CurrentChannel;

describe("index", () => {
  beforeAll(async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    TWITCH_USER = (await kapi.getCurrentUser()).data!;
    TWITCH_CHANNEL = (await kapi.getCurrentChannel()).data!;
  });

  it("Calls jsKraken with clientId and token", () => {
    const kapi = jsKraken("clientId", "token");
    expect(kapi.url).toEqual("https://api.twitch.tv");
    expect(kapi.headers).toEqual({
      "Client-ID": "clientId",
      "Content-Type": "application/json",
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: "OAuth token",
    });
  });

  it("Calls jsKraken with only clientId", () => {
    const kapi = jsKraken("clientId");
    expect(kapi.url).toEqual("https://api.twitch.tv");
    expect(kapi.headers).toEqual({
      "Client-ID": "clientId",
      "Content-Type": "application/json",
      Accept: "application/vnd.twitchtv.v5+json",
    });
  });

  it("Calls getCheermotes with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getCheermotes({
      channel_id: TWITCH_CHANNEL._id,
    });
    expect(result.data).toBeDefined();
    expect(result.data!.actions).toBeDefined();
    result.data!.actions.forEach((action) => {
      expect(action.backgrounds).toBeDefined();
      expect(action.prefix).toBeDefined();
      expect(action.scales).toBeDefined();
      expect(action.states).toBeDefined();
      expect(action.tiers).toBeDefined();
      action.tiers.forEach((tier) => {
        expect(tier.color).toBeDefined();
        expect(tier.id).toBeDefined();
        expect(tier.images).toBeDefined();
        expect(tier.images.dark).toBeDefined();
        expect(tier.images.dark.animated).toBeDefined();
        expect(tier.images.dark.static).toBeDefined();
        expect(tier.images.light).toBeDefined();
        expect(tier.images.light.animated).toBeDefined();
        expect(tier.images.light.static).toBeDefined();
        expect(tier.min_bits).toBeDefined();
      });
    });
  });

  it("Calls getCurrentChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getCurrentChannel();
    expect(result.data).toBeDefined();
    expect(result.data!._id).toBeDefined();
    expect(result.data!.broadcaster_language).toBeDefined();
    expect(result.data!.broadcaster_type).toBeDefined();
    expect(result.data!.created_at).toBeDefined();
    expect(result.data!.display_name).toBeDefined();
    expect(result.data!.email).toBeDefined();
    expect(result.data!.followers).toBeDefined();
    expect(result.data!.game).toBeDefined();
    expect(result.data!.language).toBeDefined();
    expect(result.data!.logo).toBeDefined();
    expect(result.data!.mature).toBeDefined();
    expect(result.data!.name).toBeDefined();
    expect(result.data!.partner).toBeDefined();
    expect(result.data!.profile_banner).toBeDefined();
    expect(result.data!.profile_banner_background_color).toBeDefined();
    expect(result.data!.status).toBeDefined();
    expect(result.data!.stream_key).toBeDefined();
    expect(result.data!.updated_at).toBeDefined();
    expect(result.data!.url).toBeDefined();
    expect(result.data!.video_banner).toBeDefined();
    expect(result.data!.views).toBeDefined();
  });

  it("Calls getChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannel(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!._id).toBeDefined();
    expect(result.data!.broadcaster_language).toBeDefined();
    expect(result.data!.created_at).toBeDefined();
    expect(result.data!.display_name).toBeDefined();
    expect(result.data!.followers).toBeDefined();
    expect(result.data!.game).toBeDefined();
    expect(result.data!.language).toBeDefined();
    expect(result.data!.logo).toBeDefined();
    expect(result.data!.mature).toBeDefined();
    expect(result.data!.name).toBeDefined();
    expect(result.data!.partner).toBeDefined();
    expect(result.data!.profile_banner).toBeDefined();
    expect(result.data!.profile_banner_background_color).toBeDefined();
    expect(result.data!.status).toBeDefined();
    expect(result.data!.updated_at).toBeDefined();
    expect(result.data!.url).toBeDefined();
    expect(result.data!.video_banner).toBeDefined();
    expect(result.data!.views).toBeDefined();
  });

  it("Calls updateChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.updateChannel(TWITCH_CHANNEL._id, {
      channel: {
        delay: 0,
      },
    });
    expect(result.data).toBeDefined();
    expect(result.data!._id).toBeDefined();
    expect(result.data!.broadcaster_language).toBeDefined();
    expect(result.data!.created_at).toBeDefined();
    expect(result.data!.display_name).toBeDefined();
    expect(result.data!.followers).toBeDefined();
    expect(result.data!.game).toBeDefined();
    expect(result.data!.language).toBeDefined();
    expect(result.data!.logo).toBeDefined();
    expect(result.data!.mature).toBeDefined();
    expect(result.data!.name).toBeDefined();
    expect(result.data!.partner).toBeDefined();
    expect(result.data!.profile_banner).toBeDefined();
    expect(result.data!.profile_banner_background_color).toBeDefined();
    expect(result.data!.status).toBeDefined();
    expect(result.data!.updated_at).toBeDefined();
    expect(result.data!.url).toBeDefined();
    expect(result.data!.video_banner).toBeDefined();
    expect(result.data!.views).toBeDefined();
  });

  it("Calls getChannelEditors with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelEditors(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.users).toBeDefined();
    result.data!.users.forEach((user) => {
      expect(user._id).toBeDefined();
      expect(user.bio).toBeDefined();
      expect(user.created_at).toBeDefined();
      expect(user.display_name).toBeDefined();
      expect(user.logo).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.type).toBeDefined();
      expect(user.updated_at).toBeDefined();
    });
  });

  it("Calls getChannelFollowers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelFollowers(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!._cursor).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.follows).toBeDefined();
    result.data!.follows.forEach((follow) => {
      expect(follow.created_at).toBeDefined();
      expect(follow.notifications).toBeDefined();
      expect(follow.user).toBeDefined();
      expect(follow.user._id).toBeDefined();
      expect(follow.user.bio).toBeDefined();
      expect(follow.user.created_at).toBeDefined();
      expect(follow.user.display_name).toBeDefined();
      expect(follow.user.logo).toBeDefined();
      expect(follow.user.name).toBeDefined();
      expect(follow.user.type).toBeDefined();
      expect(follow.user.updated_at).toBeDefined();
    });
  });

  it("Calls getChannelTeams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelTeams(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.teams).toBeDefined();
    result.data!.teams.forEach((team) => {
      expect(team._id).toBeDefined();
      expect(team.background).toBeDefined();
      expect(team.banner).toBeDefined();
      expect(team.created_at).toBeDefined();
      expect(team.display_name).toBeDefined();
      expect(team.info).toBeDefined();
      expect(team.logo).toBeDefined();
      expect(team.name).toBeDefined();
      expect(team.updated_at).toBeDefined();
    });
  });

  it("Calls getChannelSubscribers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getChannelSubscriptions(TWITCH_CHANNEL._id);
      expect(result.data).toBeDefined();
      expect(result.data!._total).toBeDefined();
      expect(result.data!.subscriptions).toBeDefined();
      result.data!.subscriptions.forEach((sub) => {
        expect(sub._id).toBeDefined();
        expect(sub.created_at).toBeDefined();
        expect(sub.sub_plan).toBeDefined();
        expect(sub.sub_plan_name).toBeDefined();
        expect(sub.user).toBeDefined();
        expect(sub.user._id).toBeDefined();
        expect(sub.user.bio).toBeDefined();
        expect(sub.user.created_at).toBeDefined();
        expect(sub.user.display_name).toBeDefined();
        expect(sub.user.logo).toBeDefined();
        expect(sub.user.name).toBeDefined();
        expect(sub.user.type).toBeDefined();
        expect(sub.user.updated_at).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        `${TWITCH_CHANNEL.name} does not have a subscription program`,
      );
    }
  });

  it("Calls checkChannelSubsctiption with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.checkChannelSubsctiption(
        TWITCH_CHANNEL._id,
        TWITCH_USER._id,
      );
      expect(result.data).toBeDefined();
      expect(result.data!._id).toBeDefined();
      expect(result.data!.created_at).toBeDefined();
      expect(result.data!.sub_plan).toBeDefined();
      expect(result.data!.sub_plan_name).toBeDefined();
      expect(result.data!.user).toBeDefined();
      expect(result.data!.user._id).toBeDefined();
      expect(result.data!.user.bio).toBeDefined();
      expect(result.data!.user.created_at).toBeDefined();
      expect(result.data!.user.display_name).toBeDefined();
      expect(result.data!.user.logo).toBeDefined();
      expect(result.data!.user.name).toBeDefined();
      expect(result.data!.user.type).toBeDefined();
      expect(result.data!.user.updated_at).toBeDefined();
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        `${TWITCH_USER._id} has no subscriptions to ${TWITCH_CHANNEL._id}`,
      );
    }
  });

  it("Calls getChannelVideos with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelVideos(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.videos).toBeDefined();
    result.data!.videos.forEach((video) => {
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
        expect(fps).toBeDefined();
      });
      expect(video.game).toBeDefined();
      expect(video.language).toBeDefined();
      if (video.muted_segments) {
        video.muted_segments.forEach((mutedSegment) => {
          expect(mutedSegment.duration).toBeDefined();
          expect(mutedSegment.offset).toBeDefined();
        });
      }
      expect(video.preview).toBeDefined();
      expect(video.preview.large).toBeDefined();
      expect(video.preview.medium).toBeDefined();
      expect(video.preview.small).toBeDefined();
      expect(video.preview.template).toBeDefined();
      expect(video.published_at).toBeDefined();
      expect(video.resolutions).toBeDefined();
      Object.values(video.resolutions).forEach((res) => {
        expect(res).toBeDefined();
      });
      expect(video.status).toBeDefined();
      expect(video.tag_list).toBeDefined();
      expect(video.thumbnails).toBeDefined();
      expect(video.thumbnails.large).toBeDefined();
      expect(video.thumbnails.large[0].type).toBeDefined();
      expect(video.thumbnails.large[0].url).toBeDefined();
      expect(video.thumbnails.medium).toBeDefined();
      expect(video.thumbnails.medium[0].type).toBeDefined();
      expect(video.thumbnails.medium[0].url).toBeDefined();
      expect(video.thumbnails.small).toBeDefined();
      expect(video.thumbnails.small[0].type).toBeDefined();
      expect(video.thumbnails.small[0].url).toBeDefined();
      expect(video.thumbnails.template).toBeDefined();
      expect(video.thumbnails.template[0].type).toBeDefined();
      expect(video.thumbnails.template[0].url).toBeDefined();
      expect(video.title).toBeDefined();
      expect(video.url).toBeDefined();
      expect(video.viewable).toBeDefined();
      expect(video.viewable_at).toBeDefined();
      expect(video.views).toBeDefined();
    });
  });

  it("Calls checkChannelSubsctiption with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.startChannelCommercial(TWITCH_CHANNEL._id, {
        length: 30,
      });
      expect(result.data).toBeDefined();
      expect(result.data!.Length).toBeDefined();
      expect(result.data!.Message).toBeDefined();
      expect(result.data!.RetryAfter).toBeDefined();
    } catch (result) {
      expect(result.error).toEqual("Internal Server Error");
    }
  });

  it("Calls resetChannelStreamKey with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.resetChannelStreamKey(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!._id).toBeDefined();
    expect(result.data!.broadcaster_language).toBeDefined();
    expect(result.data!.broadcaster_type).toBeDefined();
    expect(result.data!.created_at).toBeDefined();
    expect(result.data!.display_name).toBeDefined();
    expect(result.data!.email).toBeDefined();
    expect(result.data!.followers).toBeDefined();
    expect(result.data!.game).toBeDefined();
    expect(result.data!.language).toBeDefined();
    expect(result.data!.logo).toBeDefined();
    expect(result.data!.mature).toBeDefined();
    expect(result.data!.name).toBeDefined();
    expect(result.data!.partner).toBeDefined();
    expect(result.data!.profile_banner).toBeDefined();
    expect(result.data!.profile_banner_background_color).toBeDefined();
    expect(result.data!.status).toBeDefined();
    expect(result.data!.stream_key).toBeDefined();
    expect(result.data!.updated_at).toBeDefined();
    expect(result.data!.url).toBeDefined();
    expect(result.data!.video_banner).toBeDefined();
    expect(result.data!.views).toBeDefined();
  });

  it("Calls getChannelBadges with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelBadges(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.admin).toBeDefined();
    expect(result.data!.broadcaster).toBeDefined();
    expect(result.data!.global_mod).toBeDefined();
    expect(result.data!.mod).toBeDefined();
    expect(result.data!.staff).toBeDefined();
    expect(result.data!.subscriber).toBeDefined();
    expect(result.data!.turbo).toBeDefined();
    Object.values(result.data!).forEach((badge: kraken.ChannelBadge) => {
      if (badge) {
        expect(badge.alpha).toBeDefined();
        expect(badge.image).toBeDefined();
        expect(badge.svg).toBeDefined();
      }
    });
  });

  it("Calls getSetEmoticons with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getSetEmoticons({
      emotesets: [19151, 19150],
    });
    expect(result.data).toBeDefined();
    expect(result.data!.emoticon_sets).toBeDefined();
    Object.values(result.data!.emoticon_sets!).forEach((set) => {
      set.forEach((emote) => {
        expect(emote.code).toBeDefined();
        expect(emote.id).toBeDefined();
      });
    });
  });

  it("Calls getAllEmoticons with clientId", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getAllEmoticons();
      expect(result.data).toBeDefined();
      expect(result.data!._links).toBeDefined();
      expect(result.data!.emoticons).toBeDefined();
      result.data!.emoticons.forEach((emote) => {
        expect(emote.id).toBeDefined();
        expect(emote.images).toBeDefined();
        expect(emote.regex).toBeDefined();
        expect(emote.images.emoticon_set).toBeDefined();
        expect(emote.images.height).toBeDefined();
        expect(emote.images.url).toBeDefined();
        expect(emote.images.width).toBeDefined();
      });
    } catch (result) {
      expect(result.status).toBe(400);
      expect(result.message).toContain("Unsupported Authorization Type");
    }
  });

  it("Calls getAllEmoticons with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getAllEmoticons();
      expect(result.data).toBeDefined();
      expect(result.data!._links).toBeDefined();
      expect(result.data!.emoticons).toBeDefined();
      result.data!.emoticons.forEach((emote) => {
        expect(emote.id).toBeDefined();
        expect(emote.images).toBeDefined();
        expect(emote.regex).toBeDefined();
        expect(emote.images.emoticon_set).toBeDefined();
        expect(emote.images.height).toBeDefined();
        expect(emote.images.url).toBeDefined();
        expect(emote.images.width).toBeDefined();
      });
    } catch (result) {
      expect(result.status).toBe(400);
      expect(result.message).toContain("Unsupported Authorization Type");
    }
  });

  // it("Calls getExtensionAnalytics with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getExtensionAnalytics();
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((extension) => {
  //       expect(extension.URL).toBeDefined();
  //       expect(extension.date_range).toBeDefined();
  //       expect(extension.extension_id).toBeDefined();
  //       expect(extension.type).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Report Not Found");
  //   }
  // });

  // it("Calls getCheermotes with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getCheermotes();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((cheermote) => {
  //     expect(cheermote.is_charitable).toBeDefined();
  //     expect(cheermote.last_updated).toBeDefined();
  //     expect(cheermote.order).toBeDefined();
  //     expect(cheermote.prefix).toBeDefined();
  //     expect(cheermote.tiers).toBeDefined();
  //     expect(cheermote.type).toBeDefined();
  //   });
  // });

  // it("Calls getBitsLeaderboard with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getBitsLeaderboard();
  //   expect(result.data).toBeDefined();
  //   expect(result.date_range).toBeDefined();
  //   expect(result.total).toBeDefined();
  //   result.data.forEach((leaderboard) => {
  //     expect(leaderboard.rank).toBeDefined();
  //     expect(leaderboard.score).toBeDefined();
  //     expect(leaderboard.user_id).toBeDefined();
  //     expect(leaderboard.user_name).toBeDefined();
  //   });
  // });

  // it("Calls getGameAnalytics with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getGameAnalytics();
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((games) => {
  //       expect(games.URL).toBeDefined();
  //       expect(games.date_range).toBeDefined();
  //       expect(games.game_id).toBeDefined();
  //       expect(games.type).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("User Has No Access To Any Games");
  //   }
  // });

  // it("Calls getExtensionsTransactions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getExtensionsTransactions({
  //       extension_id: "extension_id",
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((transaction) => {
  //       expect(transaction.broadcaster_id).toBeDefined();
  //       expect(transaction.broadcaster_name).toBeDefined();
  //       expect(transaction.id).toBeDefined();
  //       expect(transaction.product_data).toBeDefined();
  //       expect(transaction.product_data.cost).toBeDefined();
  //       expect(transaction.product_data.cost.amount).toBeDefined();
  //       expect(transaction.product_data.cost.type).toBeDefined();
  //       expect(transaction.product_data.displayName).toBeDefined();
  //       expect(transaction.product_data.inDevelopment).toBeDefined();
  //       expect(transaction.product_data.sku).toBeDefined();
  //       expect(transaction.product_type).toBeDefined();
  //       expect(transaction.timestamp).toBeDefined();
  //       expect(transaction.user_id).toBeDefined();
  //       expect(transaction.user_name).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("must provide valid app access token");
  //   }
  // });

  // it("Calls createClip with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.createClip({
  //       broadcaster_id: TWITCH_USER.id,
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((clip) => {
  //       expect(clip.id).toBeDefined();
  //       expect(clip.edit_url).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual(
  //       "Clipping is not possible for an offline channel.",
  //     );
  //   }
  // });

  // it("Calls getClips with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getClips({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((clip) => {
  //     expect(clip.broadcaster_id).toBeDefined();
  //     expect(clip.broadcaster_name).toBeDefined();
  //     expect(clip.created_at).toBeDefined();
  //     expect(clip.creator_id).toBeDefined();
  //     expect(clip.creator_name).toBeDefined();
  //     expect(clip.embed_url).toBeDefined();
  //     expect(clip.embed_url).toBeDefined();
  //     expect(clip.game_id).toBeDefined();
  //     expect(clip.id).toBeDefined();
  //     expect(clip.language).toBeDefined();
  //     expect(clip.thumbnail_url).toBeDefined();
  //     expect(clip.title).toBeDefined();
  //     expect(clip.url).toBeDefined();
  //     expect(clip.video_id).toBeDefined();
  //     expect(clip.view_count).toBeDefined();
  //   });
  // });

  // it("Calls createEntitlementGrantsUploadURL with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.createEntitlementGrantsUploadURL({
  //       manifest_id: "manifest_id",
  //       type: "bulk_drops_grant",
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((grant) => {
  //       expect(grant.url).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Must provide valid app token.");
  //   }
  // });

  // it("Calls getCodeStatus with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getCodeStatus({
  //       user_id: TWITCH_USER.id,
  //       code: "code",
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((code) => {
  //       expect(code.code).toBeDefined();
  //       expect(code.status).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("invalid auth method");
  //   }
  // });

  // it("Calls redeemCode with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.redeemCode({
  //       user_id: TWITCH_USER.id,
  //       code: "code",
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((code) => {
  //       expect(code.code).toBeDefined();
  //       expect(code.status).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("");
  //   }
  // });

  // it("Calls getTopGames with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getTopGames();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((game) => {
  //     expect(game.box_art_url).toBeDefined();
  //     expect(game.id).toBeDefined();
  //     expect(game.name).toBeDefined();
  //   });
  // });

  // it("Calls getGames with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getGames({ name: ["Fortnite", "Call of Duty"] });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((game) => {
  //     expect(game.box_art_url).toBeDefined();
  //     expect(game.id).toBeDefined();
  //     expect(game.name).toBeDefined();
  //   });
  // });

  // it("Calls checkAutoModStatus with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.checkAutoModStatus(
  //       {
  //         broadcaster_id: TWITCH_USER.id,
  //       },
  //       {
  //         data: [
  //           {
  //             msg_id: "msg_id",
  //             msg_text: "msg_text",
  //             user_id: "user_id",
  //           },
  //         ],
  //       },
  //     );
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((msg) => {
  //       expect(msg.is_permitted).toBeDefined();
  //       expect(msg.msg_id).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("");
  //   }
  // });

  // it("Calls getBannedUsers with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getBannedUsers({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((ban) => {
  //     expect(ban.expires_at).toBeDefined();
  //     expect(ban.user_id).toBeDefined();
  //     expect(ban.user_name).toBeDefined();
  //   });
  // });

  // it("Calls getBannedEvents with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getBannedEvents({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((ban) => {
  //     expect(ban.event_data).toBeDefined();
  //     expect(ban.event_data.broadcaster_id).toBeDefined();
  //     expect(ban.event_data.broadcaster_name).toBeDefined();
  //     expect(ban.event_data.expires_at).toBeDefined();
  //     expect(ban.event_data.user_id).toBeDefined();
  //     expect(ban.event_data.user_name).toBeDefined();
  //     expect(ban.event_timestamp).toBeDefined();
  //     expect(ban.event_type).toBeDefined();
  //     expect(ban.id).toBeDefined();
  //     expect(ban.version).toBeDefined();
  //   });
  // });

  // it("Calls getModerators with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getModerators({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((mod) => {
  //     expect(mod.user_id).toBeDefined();
  //     expect(mod.user_name).toBeDefined();
  //   });
  // });

  // it("Calls getModeratorEvents with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getModeratorEvents({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((mod) => {
  //     expect(mod.event_data).toBeDefined();
  //     expect(mod.event_data.broadcaster_id).toBeDefined();
  //     expect(mod.event_data.broadcaster_name).toBeDefined();
  //     expect(mod.event_data.user_id).toBeDefined();
  //     expect(mod.event_data.user_name).toBeDefined();
  //     expect(mod.event_timestamp).toBeDefined();
  //     expect(mod.event_type).toBeDefined();
  //     expect(mod.id).toBeDefined();
  //     expect(mod.version).toBeDefined();
  //   });
  // });

  // it("Calls searchCategories with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.searchCategories({
  //     query: encodeURIComponent("Arts"),
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((category) => {
  //     expect(category.id).toBeDefined();
  //     expect(category.box_art_url).toBeDefined();
  //     expect(category.name).toBeDefined();
  //   });
  // });

  // it("Calls searchChannels with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.searchChannels({
  //     query: encodeURIComponent(TWITCH_USER.display_name),
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((channel) => {
  //     expect(channel.broadcaster_language).toBeDefined();
  //     expect(channel.display_name).toBeDefined();
  //     expect(channel.game_id).toBeDefined();
  //     expect(channel.id).toBeDefined();
  //     expect(channel.is_live).toBeDefined();
  //     expect(channel.thumbnail_url).toBeDefined();
  //     expect(channel.title).toBeDefined();
  //     if (channel.is_live) {
  //       expect(channel.started_at).toBeDefined();
  //       expect(channel.tags_ids).toBeDefined();
  //     }
  //   });
  // });

  // it("Calls getStreamKey with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getStreamKey({
  //       broadcaster_id: TWITCH_USER.id,
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((key) => {
  //       expect(key.stream_key).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Missing scope: channel:read:stream_key");
  //   }
  // });

  // it("Calls getStreams with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getStreams();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((stream) => {
  //     expect(stream.game_id).toBeDefined();
  //     expect(stream.id).toBeDefined();
  //     expect(stream.language).toBeDefined();
  //     expect(stream.started_at).toBeDefined();
  //     expect(stream.thumbnail_url).toBeDefined();
  //     expect(stream.title).toBeDefined();
  //     expect(stream.type).toBeDefined();
  //     expect(stream.user_id).toBeDefined();
  //     expect(stream.user_name).toBeDefined();
  //     expect(stream.viewer_count).toBeDefined();
  //   });
  // });

  // it("Calls getStreamsMetadata with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getStreamsMetadata();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((stream) => {
  //     expect(stream.user_id).toBeDefined();
  //     expect(stream.user_name).toBeDefined();
  //   });
  // });

  // it("Calls createStreamMarker with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.createStreamMarker({ user_id: TWITCH_USER.id });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((marker) => {
  //       expect(marker.created_at).toBeDefined();
  //       expect(marker.description).toBeDefined();
  //       expect(marker.id).toBeDefined();
  //       expect(marker.position_seconds).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual(
  //       'code:"BROADCASTER_NOT_LIVE" message:"Stream markers cannot be created when the channel is offline." ',
  //     );
  //   }
  // });

  // it("Calls getStreamMarkers with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getStreamMarkers({
  //       user_id: TWITCH_USER.id,
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((stream) => {
  //       expect(stream.user_id).toBeDefined();
  //       expect(stream.user_name).toBeDefined();
  //       expect(stream.videos).toBeDefined();
  //       stream.videos.forEach((video) => {
  //         expect(video.markers).toBeDefined();
  //         expect(video.video_id).toBeDefined();
  //         video.markers.forEach((marker) => {
  //           expect(marker.URL).toBeDefined();
  //           expect(marker.created_at).toBeDefined();
  //           expect(marker.description).toBeDefined();
  //           expect(marker.id).toBeDefined();
  //           expect(marker.position_seconds).toBeDefined();
  //         });
  //       });
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual(
  //       "Unable to find user's most recent Video/VOD ID. Please ensure you are passing the correct user id!",
  //     );
  //   }
  // });

  // it("Calls getChannelInformation with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getChannelInformation({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((channel) => {
  //     expect(channel.broadcaster_id).toBeDefined();
  //     expect(channel.broadcaster_language).toBeDefined();
  //     expect(channel.game_id).toBeDefined();
  //     expect(channel.game_name).toBeDefined();
  //     expect(channel.title).toBeDefined();
  //   });
  // });

  // it("Calls modifyChannelInformation with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.modifyChannelInformation({
  //     broadcaster_id: TWITCH_USER.id,
  //     broadcaster_language: "en",
  //   });
  //   expect(result.status).toEqual(204);
  // });

  // it("Calls getBroadcasterSubscriptions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getBroadcasterSubscriptions({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   const tiers = [
  //     SubscriptionTier["Tier 1"],
  //     SubscriptionTier["Tier 2"],
  //     SubscriptionTier["Tier 3"],
  //   ];
  //   const tierMatcher = new RegExp(`(${tiers.join("|")})`);
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((sub) => {
  //     expect(sub.broadcaster_id).toBeDefined();
  //     expect(sub.broadcaster_name).toBeDefined();
  //     expect(sub.is_gift).toBeDefined();
  //     expect(sub.plan_name).toBeDefined();
  //     expect(sub.tier).toMatch(tierMatcher);
  //     expect(sub.user_id).toBeDefined();
  //     expect(sub.user_name).toBeDefined();
  //   });
  // });

  // it("Calls getAllStreamTags with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getAllStreamTags();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((tag) => {
  //     expect(tag.is_auto).toBeDefined();
  //     expect(tag.localization_descriptions).toBeDefined();
  //     expect(tag.localization_names).toBeDefined();
  //     expect(tag.tag_id).toBeDefined();
  //   });
  // });

  // it("Calls getStreamTags with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getStreamTags({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((tag) => {
  //     expect(tag.is_auto).toBeDefined();
  //     expect(tag.localization_descriptions).toBeDefined();
  //     expect(tag.localization_names).toBeDefined();
  //     expect(tag.tag_id).toBeDefined();
  //   });
  // });

  // it("Calls replaceStreamTags with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.replaceStreamTags({
  //     broadcaster_id: TWITCH_USER.id,
  //   });
  //   expect(result.status).toEqual(204);
  // });

  // it("Calls createUserFollow with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.createUserFollow({
  //       from_id: TWITCH_USER.id,
  //       to_id: TWITCH_USER.id,
  //     });
  //     expect(result.status).toEqual(204);
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Missing scope: user:edit:follows");
  //   }
  // });

  // it("Calls deleteUserFollow with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.deleteUserFollow({
  //       from_id: TWITCH_USER.id,
  //       to_id: TWITCH_USER.id,
  //     });
  //     expect(result.status).toEqual(204);
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Missing scope: user:edit:follows");
  //   }
  // });

  // it("Calls getUsers with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getUsers();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((user) => {
  //     expect(user.broadcaster_type).toBeDefined();
  //     expect(user.description).toBeDefined();
  //     expect(user.display_name).toBeDefined();
  //     expect(user.email).toBeDefined();
  //     expect(user.id).toBeDefined();
  //     expect(user.login).toBeDefined();
  //     expect(user.offline_image_url).toBeDefined();
  //     expect(user.profile_image_url).toBeDefined();
  //     expect(user.type).toBeDefined();
  //     expect(user.view_count).toBeDefined();
  //   });
  // });

  // it("Calls getUserFollows with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getUserFollows({
  //     from_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((follow) => {
  //     expect(follow.followed_at).toBeDefined();
  //     expect(follow.from_id).toBeDefined();
  //     expect(follow.from_name).toBeDefined();
  //     expect(follow.to_id).toBeDefined();
  //     expect(follow.to_name).toBeDefined();
  //   });
  // });

  // it("Calls updateUser with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.updateUser({
  //     description: TWITCH_USER.description,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((user) => {
  //     expect(user.broadcaster_type).toBeDefined();
  //     expect(user.description).toBeDefined();
  //     expect(user.display_name).toBeDefined();
  //     expect(user.email).toBeDefined();
  //     expect(user.id).toBeDefined();
  //     expect(user.login).toBeDefined();
  //     expect(user.offline_image_url).toBeDefined();
  //     expect(user.profile_image_url).toBeDefined();
  //     expect(user.type).toBeDefined();
  //     expect(user.view_count).toBeDefined();
  //   });
  // });

  // it("Calls getUserExtensions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getUserExtensions();
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((extension) => {
  //     expect(extension.can_activate).toBeDefined();
  //     expect(extension.id).toBeDefined();
  //     expect(extension.name).toBeDefined();
  //     expect(extension.type).toBeDefined();
  //     expect(extension.version).toBeDefined();
  //   });
  // });

  // it("Calls getUserActiveExtensions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getUserActiveExtensions();
  //   expect(result.data).toBeDefined();
  //   expect(result.data.component).toBeDefined();
  //   expect(result.data.overlay).toBeDefined();
  //   expect(result.data.panel).toBeDefined();
  //   Object.values(result.data).forEach(
  //     (extensionType: map<DetailedExtensionData>) => {
  //       Object.values(extensionType).forEach((extension) => {
  //         expect(extension.active).toBeDefined();
  //         if (extension.active) {
  //           expect(extension.id).toBeDefined();
  //           expect(extension.name).toBeDefined();
  //           expect(extension.version).toBeDefined();
  //         }
  //       });
  //     },
  //   );
  // });

  // it("Calls updateUserExtensions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.updateUserExtensions({
  //     data: {
  //       panel: {},
  //       component: {},
  //       overlay: {},
  //     },
  //   });
  //   expect(result.data).toBeDefined();
  //   expect(result.data.component).toBeDefined();
  //   expect(result.data.overlay).toBeDefined();
  //   expect(result.data.panel).toBeDefined();
  //   Object.values(result.data).forEach(
  //     (extensionType: map<DetailedExtensionData>) => {
  //       Object.values(extensionType).forEach((extension) => {
  //         expect(extension.active).toBeDefined();
  //         if (extension.active) {
  //           expect(extension.id).toBeDefined();
  //           expect(extension.name).toBeDefined();
  //           expect(extension.version).toBeDefined();
  //         }
  //       });
  //     },
  //   );
  // });

  // it("Calls getVideos with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   const result = await kapi.getVideos({
  //     user_id: TWITCH_USER.id,
  //   });
  //   expect(result.data).toBeDefined();
  //   result.data.forEach((video) => {
  //     expect(video.created_at).toBeDefined();
  //     expect(video.description).toBeDefined();
  //     expect(video.duration).toBeDefined();
  //     expect(video.id).toBeDefined();
  //     expect(video.language).toBeDefined();
  //     expect(video.published_at).toBeDefined();
  //     expect(video.thumbnail_url).toBeDefined();
  //     expect(video.title).toBeDefined();
  //     expect(video.type).toBeDefined();
  //     expect(video.url).toBeDefined();
  //     expect(video.user_id).toBeDefined();
  //     expect(video.user_name).toBeDefined();
  //     expect(video.view_count).toBeDefined();
  //     expect(video.viewable).toBeDefined();
  //   });
  // });

  // it("Calls getWebhookSubscriptions with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getWebhookSubscriptions();
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((whsub) => {
  //       expect(whsub.callback).toBeDefined();
  //       expect(whsub.expires_at).toBeDefined();
  //       expect(whsub.topic).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Must provide valid app token.");
  //   }
  // });

  // it("Calls getHypeTrainEvents with clientId and token", async () => {
  //   const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
  //   try {
  //     const result = await kapi.getHypeTrainEvents({
  //       broadcaster_id: TWITCH_USER.id,
  //     });
  //     expect(result.data).toBeDefined();
  //     result.data.forEach((hype) => {
  //       expect(hype.event_data).toBeDefined();
  //       expect(hype.event_data.broadcaster_id).toBeDefined();
  //       expect(hype.event_data.cooldown_end_time).toBeDefined();
  //       expect(hype.event_data.expires_at).toBeDefined();
  //       expect(hype.event_data.goal).toBeDefined();
  //       expect(hype.event_data.id).toBeDefined();
  //       expect(hype.event_data.last_contribution).toBeDefined();
  //       expect(hype.event_data.last_contribution.total).toBeDefined();
  //       expect(hype.event_data.last_contribution.type).toBeDefined();
  //       expect(hype.event_data.last_contribution.user).toBeDefined();
  //       expect(hype.event_data.level).toBeDefined();
  //       expect(hype.event_data.started_at).toBeDefined();
  //       expect(hype.event_data.top_contributions).toBeDefined();
  //       hype.event_data.top_contributions.forEach((contribution) => {
  //         expect(contribution.total).toBeDefined();
  //         expect(contribution.type).toBeDefined();
  //         expect(contribution.user).toBeDefined();
  //       });
  //       expect(hype.event_data.total).toBeDefined();
  //       expect(hype.event_timestamp).toBeDefined();
  //       expect(hype.event_type).toBeDefined();
  //       expect(hype.id).toBeDefined();
  //       expect(hype.version).toBeDefined();
  //     });
  //   } catch (result) {
  //     expect(result.error).toBeDefined();
  //     expect(result.message).toEqual("Missing scope: channel:read:hype_train");
  //   }
  // });
});
