/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jsKraken from "../index";
import * as kraken from "../types/kraken";
import * as helper from "./helper";

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
    helper.expectChannel(result.data!);
    expect(result.data!.broadcaster_type).toBeDefined();
    expect(result.data!.email).toBeDefined();
    expect(result.data!.stream_key).toBeDefined();
  });

  it("Calls getChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannel(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    helper.expectChannel(result.data!);
  });

  it("Calls updateChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.updateChannel(TWITCH_CHANNEL._id, {
      channel: {
        delay: 0,
      },
    });
    expect(result.data).toBeDefined();
    helper.expectChannel(result.data!);
  });

  it("Calls getChannelEditors with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelEditors(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.users).toBeDefined();
    result.data!.users.forEach(helper.expectUser);
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
      helper.expectUser(follow.user);
    });
  });

  it("Calls getChannelTeams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getChannelTeams(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.teams).toBeDefined();
    result.data!.teams.forEach(helper.expectTeam);
  });

  it("Calls getChannelSubscribers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getChannelSubscriptions(TWITCH_CHANNEL._id);
      expect(result.data).toBeDefined();
      expect(result.data!._total).toBeDefined();
      expect(result.data!.subscriptions).toBeDefined();
      result.data!.subscriptions.forEach((sub) => {
        helper.expectSubscription(sub);
        helper.expectUser(sub.user);
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
      helper.expectSubscription(result.data!);
      helper.expectUser(result.data!.user);
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
    result.data!.videos.forEach(helper.expectVideo);
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
    helper.expectChannel(result.data!);
    expect(result.data!.broadcaster_type).toBeDefined();
    expect(result.data!.email).toBeDefined();
    expect(result.data!.stream_key).toBeDefined();
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
    helper.expectEmoticonSets(result.data!.emoticon_sets!);
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

  it("Calls getClip with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getClip("AmazonianEncouragingLyrebirdAllenHuhu");
    expect(result.data).toBeDefined();
    helper.expectClip(result.data!);
  });

  it("Calls getTopClips with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getTopClips();
    expect(result.data).toBeDefined();
    expect(result.data!._cursor).toBeDefined();
    expect(result.data!.clips).toBeDefined();
    result.data!.clips.forEach(helper.expectClip);
  });

  it("Calls getFollowedClips with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getFollowedClips();
    expect(result.data).toBeDefined();
    expect(result.data!._cursor).toBeDefined();
    expect(result.data!.clips).toBeDefined();
    result.data!.clips.forEach(helper.expectClip);
  });

  it("Calls getCollectionMetadata with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getCollectionMetadata("myIbIFkZphQSbQ");
      expect(result.data).toBeDefined();
      helper.expectCollectionMetadata(result.data!);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls getCollection with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getCollection("myIbIFkZphQSbQ");
      expect(result.data).toBeDefined();
      expect(result.data!._id).toBeDefined();
      expect(result.data!.items).toBeDefined();
      result.data!.items.forEach(helper.expectCollectionItem);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls getChannelCollections with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.getChannelCollections(TWITCH_CHANNEL._id!);
      expect(result.data).toBeDefined();
      expect(result.data!._cursor).toBeDefined();
      expect(result.data!.collections).toBeDefined();
      result.data!.collections.forEach(helper.expectCollectionMetadata);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls createCollection with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.createCollection(TWITCH_CHANNEL._id!, {
        title: "jsKraken_" + Date.now(),
      });
      expect(result.data).toBeDefined();
      helper.expectCollectionMetadata(result.data!);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls updateCollection with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.updateCollection("myIbIFkZphQSbQ", {
        title: "jsKraken_" + Date.now(),
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls createCollectionThumbnail with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.createCollectionThumbnail("myIbIFkZphQSbQ", {
        item_id: "eyJ0eXBlIjoidmlkZW8iLCJpZCI6IjEyMjEzODk0OSJ9",
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls deleteCollection with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.deleteCollection("myIbIFkZphQSbQ");
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls addCollectionItem with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.addCollectionItem("myIbIFkZphQSbQ", {
        id: "122138949",
        type: "video",
      });
      expect(result.data).toBeDefined();
      helper.expectCollectionItem(result.data!);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls deleteCollectionItem with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.deleteCollectionItem(
        "myIbIFkZphQSbQ",
        "122138949",
      );
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls moveCollectionItem with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.moveCollectionItem(
        "myIbIFkZphQSbQ",
        "122138949",
        { position: 3 },
      );
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("first-party oauth client required");
    }
  });

  it("Calls getTopGames with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getTopGames();
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.top).toBeDefined();
    result.data!.top.forEach((top) => {
      expect(top.channels).toBeDefined();
      expect(top.viewers).toBeDefined();
      helper.expectGame(top.game);
    });
  });

  it("Calls getIngestServers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getIngestServers();
    expect(result.data).toBeDefined();
    expect(result.data!.ingests).toBeDefined();
    result.data!.ingests.forEach((server) => {
      expect(server._id).toBeDefined();
      expect(server.availability).toBeDefined();
      expect(server.default).toBeDefined();
      expect(server.name).toBeDefined();
      expect(server.url_template).toBeDefined();
    });
  });

  it("Calls searchChannels with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.searchChannels({
      query: TWITCH_CHANNEL.display_name,
    });
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.channels).toBeDefined();
    result.data!.channels.forEach(helper.expectChannel);
  });

  it("Calls searchGames with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.searchGames({
      query: TWITCH_CHANNEL.game,
    });
    expect(result.data).toBeDefined();
    expect(result.data!.games).toBeDefined();
    result.data!.games.forEach(helper.expectGame);
  });

  it("Calls searchStreams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.searchStreams({
      query: TWITCH_CHANNEL.display_name,
    });
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.streams).toBeDefined();
    result.data!.streams.forEach(helper.expectStream);
  });

  it("Calls getStream with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getStream(TWITCH_CHANNEL._id);
    expect(result.data).toBeDefined();
    expect(result.data!.stream).toBeDefined();
    if (result.data!.stream) {
      helper.expectStream(result.data!.stream);
    }
  });

  it("Calls getStreams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getStreams();
    expect(result.data).toBeDefined();
    expect(result.data!.streams).toBeDefined();
    result.data!.streams.forEach(helper.expectStream);
  });

  it("Calls getStreamsSummary with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getStreamsSummary();
    expect(result.data).toBeDefined();
    expect(result.data!.channels).toBeDefined();
    expect(result.data!.viewers).toBeDefined();
  });

  it("Calls getFeaturedStreams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getFeaturedStreams();
    expect(result.data).toBeDefined();
    expect(result.data!.featured).toBeDefined();
    result.data!.featured.forEach((featured) => {
      expect(featured.image).toBeDefined();
      expect(featured.priority).toBeDefined();
      expect(featured.scheduled).toBeDefined();
      expect(featured.sponsored).toBeDefined();
      expect(featured.text).toBeDefined();
      expect(featured.title).toBeDefined();
      expect(featured.stream).toBeDefined();
      helper.expectStream(featured.stream);
    });
  });

  it("Calls getFollowedStreams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getFollowedStreams();
    expect(result.data).toBeDefined();
    expect(result.data!.streams).toBeDefined();
    result.data!.streams.forEach(helper.expectStream);
  });

  it("Calls getTeams with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getTeams();
    expect(result.data).toBeDefined();
    expect(result.data!.teams).toBeDefined();
    result.data!.teams.forEach(helper.expectTeam);
  });

  it("Calls getTeam with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getTeam("staff");
    expect(result.data).toBeDefined();
    helper.expectTeam(result.data!);
  });

  it("Calls getCurrentUser with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getCurrentUser();
    expect(result.data).toBeDefined();
    helper.expectUser(result.data!);
    expect(result.data!.email).toBeDefined();
    expect(result.data!.email_verified).toBeDefined();
    expect(result.data!.notifications).toBeDefined();
    expect(result.data!.notifications.email).toBeDefined();
    expect(result.data!.notifications.push).toBeDefined();
    expect(result.data!.partnered).toBeDefined();
    expect(result.data!.twitter_connected).toBeDefined();
  });

  it("Calls getUser with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getUser(TWITCH_USER._id);
    expect(result.data).toBeDefined();
    helper.expectUser(result.data!);
  });

  it("Calls getUsers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getUsers({
      login: [TWITCH_USER._id],
    });
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    result.data!.users.forEach(helper.expectUser);
  });

  it("Calls getUserEmotes with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getUserEmotes(TWITCH_USER._id);
    expect(result.data).toBeDefined();
    expect(result.data!.emoticon_sets).toBeDefined();
    helper.expectEmoticonSets(result.data!.emoticon_sets!);
  });

  it("Calls checkUserSubsctiption with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.checkUserSubsctiption(
        TWITCH_USER._id,
        TWITCH_CHANNEL._id,
      );
      expect(result.data).toBeDefined();
      helper.expectSubscription(result.data!);
      helper.expectChannel(result.data!.channel);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        `${TWITCH_USER._id} has no subscriptions to ${TWITCH_CHANNEL._id}`,
      );
    }
  });

  it("Calls getUserFollows with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getUserFollows(TWITCH_USER._id);
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.follows).toBeDefined();
    result.data!.follows.forEach((follow) => {
      expect(follow.created_at).toBeDefined();
      expect(follow.notifications).toBeDefined();
      helper.expectChannel(follow.channel);
    });
  });

  it("Calls checkUserFollows with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.checkUserFollow(
        TWITCH_USER._id,
        TWITCH_CHANNEL._id,
      );
      expect(result.data).toBeDefined();
      expect(result.data!.created_at).toBeDefined();
      expect(result.data!.notifications).toBeDefined();
      helper.expectChannel(result.data!.channel);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Follow not found");
    }
  });

  it("Calls followChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.followChannel(
        TWITCH_USER._id,
        TWITCH_CHANNEL._id,
      );
      expect(result.data).toBeDefined();
      expect(result.data!.created_at).toBeDefined();
      expect(result.data!.notifications).toBeDefined();
      helper.expectChannel(result.data!.channel);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("From and to entities cannot be the same");
    }
  });

  it("Calls unfollowChannel with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.unfollowChannel(
        TWITCH_USER._id,
        TWITCH_CHANNEL._id,
      );
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("From and to entities cannot be the same");
    }
  });

  it("Calls getBlockedUsers with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getBlockedUsers(TWITCH_USER._id);
    expect(result.data).toBeDefined();
    expect(result.data!._total).toBeDefined();
    expect(result.data!.blocks).toBeDefined();
    result.data!.blocks.forEach(({ user }) => helper.expectUser(user));
  });

  it("Calls blockUser with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.blockUser(TWITCH_USER._id, TWITCH_USER._id);
      expect(result.data).toBeDefined();
      expect(result.data!._id).toBeDefined();
      expect(result.data!.updated_at).toBeDefined();
      helper.expectUser(result.data!.user);
    } catch (result) {
      expect(result.error).toEqual("Bad Request");
    }
  });

  it("Calls unblockUser with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.unblockUser(TWITCH_USER._id, TWITCH_USER._id);
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toEqual("Bad Request");
    }
  });

  it("Calls createConnectionToVHS with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.createConnectionToVHS({
        identifier: "ABC12345",
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        JSON.stringify(
          {
            status: 403,
            message: "No service found for that clientID",
            error: "Forbidden",
          },
          null,
          2,
        ),
      );
    }
  });

  it("Calls checkConnectionToVHS with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.checkConnectionToVHS();
      expect(result.data).toBeDefined();
      expect(result.data!.identifier).toBeDefined();
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        JSON.stringify(
          {
            status: 403,
            message: "No service found for that clientID",
            error: "Forbidden",
          },
          null,
          2,
        ),
      );
    }
  });

  it("Calls deleteConnectionToVHS with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.deleteConnectionToVHS();
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        JSON.stringify(
          {
            status: 403,
            message: "No service found for that clientID",
            error: "Forbidden",
          },
          null,
          2,
        ),
      );
    }
  });

  it("Calls getVideo with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getVideo("v106400740");
    expect(result.data).toBeDefined();
    helper.expectVideo(result.data!);
  });

  it("Calls getTopVideos with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getTopVideos();
    expect(result.data).toBeDefined();
    expect(result.data!.vods).toBeDefined();
    result.data!.vods.forEach(helper.expectVideo);
  });

  it("Calls getTopVideos with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await kapi.getFollowedVideos();
    expect(result.data).toBeDefined();
    expect(result.data!.videos).toBeDefined();
    result.data!.videos.forEach(helper.expectVideo);
  });

  it("Calls createVideo with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.createVideo({
        title: "jsKraken" + Date.now(),
        channel_id: TWITCH_CHANNEL._id,
      });
      expect(result.data).toBeDefined();
      expect(result.data!.upload).toBeDefined();
      expect(result.data!.upload.token).toBeDefined();
      expect(result.data!.upload.url).toBeDefined();
      expect(result.data!.video).toBeDefined();
      helper.expectVideo(result.data!.video);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "Your email must be verified, and you must be a partner, affiliate, or developer to upload videos",
      );
    }
  });

  it("Calls uploadVideoPart with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const blob = new Blob();
    try {
      const result = await kapi.uploadVideoPart(
        "v107666453",
        {
          part: 1,
          upload_token:
            "7_STl2gsKwDy1mHj2k95ld3aodDl3E_NzzQdSlN9ll0p6Ct0xFhvrO5bWu7tGUKEH5jtD_hjB9q3X4vTOQ000B1UcmMxduT30FuHhAmFYgYf7DoJE9PVvGRZqk9WQAR2ZGphUpj_237smnjE2gMoaQ--",
        },
        blob,
      );
      expect(result.status).toEqual(200);
    } catch (result) {
      expect(result.status).toEqual(401);
    }
  });

  it("Calls completeVideoUpload with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.completeVideoUpload("v107666453", {
        upload_token:
          "7_STl2gsKwDy1mHj2k95ld3aodDl3E_NzzQdSlN9ll0p6Ct0xFhvrO5bWu7tGUKEH5jtD_hjB9q3X4vTOQ000B1UcmMxduT30FuHhAmFYgYf7DoJE9PVvGRZqk9WQAR2ZGphUpj_237smnjE2gMoaQ--",
      });
      expect(result.status).toEqual(200);
    } catch (result) {
      expect(result.status).toEqual(404);
    }
  });

  it("Calls uploadVideoPart with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    const blob = new Blob();
    try {
      const result = await kapi.uploadVideoPart(
        "v107666453",
        {
          part: 1,
          upload_token:
            "7_STl2gsKwDy1mHj2k95ld3aodDl3E_NzzQdSlN9ll0p6Ct0xFhvrO5bWu7tGUKEH5jtD_hjB9q3X4vTOQ000B1UcmMxduT30FuHhAmFYgYf7DoJE9PVvGRZqk9WQAR2ZGphUpj_237smnjE2gMoaQ--",
        },
        blob,
        { url: "http://localhost" },
      );
      expect(result.status).toEqual(200);
    } catch (result) {
      expect(result.status).toEqual(0);
    }
  });

  it("Calls completeVideoUpload with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.completeVideoUpload(
        "v107666453",
        {
          upload_token:
            "7_STl2gsKwDy1mHj2k95ld3aodDl3E_NzzQdSlN9ll0p6Ct0xFhvrO5bWu7tGUKEH5jtD_hjB9q3X4vTOQ000B1UcmMxduT30FuHhAmFYgYf7DoJE9PVvGRZqk9WQAR2ZGphUpj_237smnjE2gMoaQ--",
        },
        { url: "http://localhost" },
      );
      expect(result.status).toEqual(200);
    } catch (result) {
      expect(result.status).toEqual(0);
    }
  });

  it("Calls updateVideo with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.updateVideo("v107666453", {
        title: "jsKraken" + Date.now(),
      });
      expect(result.data).toBeDefined();
      helper.expectVideo(result.data!);
    } catch (result) {
      expect(result.status).toEqual(404);
    }
  });

  it("Calls deleteVideo with clientId and token", async () => {
    const kapi = jsKraken(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await kapi.deleteVideo("107666453");
      expect(result.status).toEqual(200);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        JSON.stringify({
          error: "You are not authorized",
          message: "You are not authorized",
          status: 401,
        }),
      );
    }
  });
});
