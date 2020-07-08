import request from "./request";
import { ExecuteArguments, JSKraken, Options } from "./types/jskraken";
import * as kraken from "./types/kraken";
import { RequestHeaders } from "./types/request";

export default function jsKraken(clientId: string, token?: string): JSKraken {
  const url = "https://api.twitch.tv";
  const headers = {
    "Client-ID": clientId,
    "Content-Type": "application/json",
    Accept: "application/vnd.twitchtv.v5+json",
  } as RequestHeaders;

  if (token) {
    headers["Authorization"] = `OAuth ${token}`;
  }

  function execute<T>(args: ExecuteArguments): Promise<T> {
    return request<T>({
      headers: {
        ...headers,
        ...args.options.headers,
      },
      method: args.method,
      url: `${args.options.url || url}${args.path}`,
      body: args.body,
      query: args.query,
    });
  }

  // Bits
  function getCheermotes(
    query?: kraken.CheermotesQuery,
    options: Options = {},
  ): Promise<kraken.CheermoteResponse> {
    return execute<kraken.CheermoteResponse>({
      options,
      method: "GET",
      path: "/v5/bits/actions",
      query,
    });
  }

  // Channels
  function getCurrentChannel(
    options: Options = {},
  ): Promise<kraken.CurrentChannelResponse> {
    return execute<kraken.CurrentChannelResponse>({
      options,
      method: "GET",
      path: "/kraken/channel",
    });
  }

  function getChannel(
    channelId: string,
    options: Options = {},
  ): Promise<kraken.ChannelResponse> {
    return execute<kraken.ChannelResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}`,
    });
  }

  function updateChannel(
    channelId: string,
    body: kraken.UpdateChannelBody,
    options: Options = {},
  ): Promise<kraken.ChannelResponse> {
    return execute<kraken.ChannelResponse>({
      options,
      method: "PUT",
      path: `/kraken/channels/${channelId}`,
      body,
    });
  }

  function getChannelEditors(
    channelId: string,
    options: Options = {},
  ): Promise<kraken.ChannelEditorResponse> {
    return execute<kraken.ChannelEditorResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/editors`,
    });
  }

  function getChannelFollowers(
    channelId: string,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<kraken.FollowsResponse> {
    return execute<kraken.FollowsResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/follows`,
      query,
    });
  }

  function getChannelTeams(
    channelId: string,
    options: Options = {},
  ): Promise<kraken.TeamsResponse> {
    return execute<kraken.TeamsResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/teams`,
    });
  }

  function getChannelSubscriptions(
    channelId: string,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<kraken.SubscriptionsResponse> {
    return execute<kraken.SubscriptionsResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/subscriptions`,
      query,
    });
  }

  function checkChannelSubsctiption(
    channelId: string,
    userId: string,
    options: Options = {},
  ): Promise<kraken.SubscriptionData> {
    return execute<kraken.SubscriptionData>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/subscriptions/${userId}`,
    });
  }

  function getChannelVideos(
    channelId: string,
    query: kraken.ChannelVideosQuery,
    options: Options = {},
  ): Promise<kraken.ChannelVideosResponse> {
    return execute<kraken.ChannelVideosResponse>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/videos`,
      query,
    });
  }

  function startChannelCommercial(
    channelId: string,
    body: kraken.ChannelCommercialBody,
    options: Options = {},
  ): Promise<kraken.ChannelCommercial> {
    return execute<kraken.ChannelCommercial>({
      options,
      method: "POST",
      path: `/kraken/channels/${channelId}/commercial`,
      body,
    });
  }

  function resetChannelStreamKey(
    channelId: string,
    options: Options = {},
  ): Promise<kraken.CurrentChannelResponse> {
    return execute<kraken.CurrentChannelResponse>({
      options,
      method: "DELETE",
      path: `/kraken/channels/${channelId}/stream_key`,
    });
  }

  // Chat
  function getChannelBadges(
    channelId: string,
    options: Options = {},
  ): Promise<kraken.ChannelBadges> {
    return execute<kraken.ChannelBadges>({
      options,
      method: "GET",
      path: `/kraken/chat/${channelId}/badges`,
    });
  }

  function getSetEmoticons(
    query: kraken.EmoticonsSetQuery,
    options: Options = {},
  ): Promise<kraken.EmoticonsSetResponse> {
    return execute<kraken.EmoticonsSetResponse>({
      options,
      method: "GET",
      path: "/kraken/chat/emoticon_images",
      query,
    });
  }

  function getAllEmoticons(
    options: Options = {},
  ): Promise<kraken.EmoticonsResponse> {
    return execute<kraken.EmoticonsResponse>({
      options,
      method: "GET",
      path: "/kraken/chat/emoticons",
    });
  }

  // Clips
  function getClip(slug: string, options: Options = {}): Promise<kraken.Clip> {
    return execute<kraken.Clip>({
      options,
      method: "GET",
      path: `/kraken/clips/${slug}`,
    });
  }

  function getTopClips(
    query?: kraken.TopClipsQuery,
    options: Options = {},
  ): Promise<kraken.ClipsResponse> {
    return execute<kraken.ClipsResponse>({
      options,
      method: "GET",
      path: "/kraken/clips/top",
      query,
    });
  }

  function getFollowedClips(
    query?: kraken.FollowedQuery,
    options: Options = {},
  ): Promise<kraken.ClipsResponse> {
    return execute<kraken.ClipsResponse>({
      options,
      method: "GET",
      path: "/kraken/clips/followed",
      query,
    });
  }

  // Collection
  function getCollectionMetadata(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/collections/${params[0]}",
    });
  }

  function getCollection(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/collections/${params[0]}/items",
      query,
    });
  }

  function getChannelCollections(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/collections",
      query,
    });
  }

  function createChannelCollection(body, options: Options = {}) {
    return execute({
      options,
      method: "POST",
      path: "/kraken/channels/${params[0]}/collections",
      body,
    });
  }

  function updateCollection(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/collections/${params[0]}",
      body,
    });
  }

  function createCollectionThumbnail(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/collections/${params[0]}/thumbnail",
      body,
    });
  }

  function deleteCollection(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/collections/${params[0]}",
    });
  }

  function addCollectionItem(body, options: Options = {}) {
    return execute({
      options,
      method: "POST",
      path: "/kraken/collections/${params[0]}/items",
      body,
    });
  }

  function deleteCollectionItem(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/collections/${params[0]}/items/${params[1]}",
    });
  }

  function moveCollectionItem(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/collections/${params[0]}/items/${params[1]}",
      body,
    });
  }

  // Games
  function getTopGames(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/games/top",
      query,
    });
  }

  // Ingest
  function getMyChannel(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/ingests",
    });
  }

  // Search
  function searchChannels(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/search/channels",
      query,
    });
  }

  function searchGames(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/search/games",
      query,
    });
  }

  function searchStreams(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/search/streams",
      query,
    });
  }

  // Streams
  function getStream(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/streams/${params[0]}",
    });
  }

  function getStreams(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/streams",
      query,
    });
  }

  function getStreamsSummary(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/streams/summary",
      query,
    });
  }

  function getFeaturedStreams(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/streams/featured",
      query,
    });
  }

  function getFollowedStreams(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/streams/followed",
      query,
    });
  }

  // Teams
  function getTeams(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/teams",
      query,
    });
  }

  function getTeam(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/teams/${params[0]}",
    });
  }

  // User
  function getCurrentUser(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/user",
    });
  }

  function getUserById(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}",
    });
  }

  function getUser(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users",
      query,
    });
  }

  function getUserEmotes(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}/emotes",
    });
  }

  function checkUserSubsctiption(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}/subscriptions/${params[1]}",
    });
  }

  function getUserFollows(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}/follows/channels",
      query,
    });
  }

  function checkUserFollow(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}/follows/channels/${params[1]}",
    });
  }

  function userFollowChannel(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/users/${params[0]}/follows/channels/${params[1]}",
      body,
    });
  }

  function userUnfollowChannel(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/users/${params[0]}/follows/channels/${params[1]}",
    });
  }

  function getUserBlocks(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/users/${params[0]}/blocks",
      query,
    });
  }

  function userBlockUser(options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/users/${params[0]}/blocks/${params[1]}",
    });
  }

  function userUnlockUser(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/users/${params[0]}/blocks/${params[1]}",
    });
  }

  function createConnectionToVHS(options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/user/vhs",
    });
  }

  function checkConnectionToVHS(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/user/vhs",
    });
  }

  function deleteConnectionToVHS(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/user/vhs",
    });
  }

  // Videos
  function getVideo(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/videos/${params[0]}",
    });
  }

  function getTopVideos(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/videos/top",
      query,
    });
  }

  function getFollowedVideos(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/videos/followed",
      query,
    });
  }

  function createVideo(query, options: Options = {}) {
    return execute({
      options,
      method: "POST",
      path: "/kraken/videos",
      query,
    });
  }

  function updateVideo(query, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/videos/${params[0]}",
      query,
    });
  }

  function deleteVideo(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/videos/${params[0]}",
    });
  }

  return {
    url,
    headers,

    // Bits
    getCheermotes,

    // Channels
    getCurrentChannel,
    getChannel,
    updateChannel,
    getChannelEditors,
    getChannelFollowers,
    getChannelTeams,
    getChannelSubscriptions,
    checkChannelSubsctiption,
    getChannelVideos,
    startChannelCommercial,
    resetChannelStreamKey,

    // Chat
    getChannelBadges,
    getSetEmoticons,
    getAllEmoticons,

    // Clips
    getClip,
    getTopClips,
    getFollowedClips,

    // Collection
    getCollectionMetadata,
    getCollection,
    getChannelCollections,
    createChannelCollection,
    updateCollection,
    createCollectionThumbnail,
    deleteCollection,
    addCollectionItem,
    deleteCollectionItem,
    moveCollectionItem,

    // Games
    getTopGames,

    // Ingest
    getMyChannel,

    // Search
    searchChannels,
    searchGames,
    searchStreams,

    // Streams
    getStream,
    getStreams,
    getStreamsSummary,
    getFeaturedStreams,
    getFollowedStreams,

    // Teams
    getTeams,
    getTeam,

    // User
    getCurrentUser,
    getUserById,
    getUser,
    getUserEmotes,
    checkUserSubsctiption,
    getUserFollows,
    checkUserFollow,
    userFollowChannel,
    userUnfollowChannel,
    getUserBlocks,
    userBlockUser,
    userUnlockUser,
    createConnectionToVHS,
    checkConnectionToVHS,
    deleteConnectionToVHS,

    // Videos
    getVideo,
    getTopVideos,
    getFollowedVideos,
    createVideo,
    updateVideo,
    deleteVideo,
  };
}
