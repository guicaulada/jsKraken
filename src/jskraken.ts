import request from "./request";
import { ExecuteArguments, JSKraken, Options } from "./types/jskraken";
import * as kraken from "./types/kraken";
import { RequestHeaders, RequestResponse } from "./types/request";

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

  function execute<T>(args: ExecuteArguments): Promise<RequestResponse<T>> {
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
  ): Promise<RequestResponse<kraken.Cheermotes>> {
    return execute<kraken.Cheermotes>({
      options,
      method: "GET",
      path: "/v5/bits/actions",
      query,
    });
  }

  // Channels
  function getCurrentChannel(
    options: Options = {},
  ): Promise<RequestResponse<kraken.CurrentChannel>> {
    return execute<kraken.CurrentChannel>({
      options,
      method: "GET",
      path: "/kraken/channel",
    });
  }

  function getChannel(
    channelId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Channel>> {
    return execute<kraken.Channel>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}`,
    });
  }

  function updateChannel(
    channelId: string,
    body: kraken.UpdateChannelBody,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Channel>> {
    return execute<kraken.Channel>({
      options,
      method: "PUT",
      path: `/kraken/channels/${channelId}`,
      body,
    });
  }

  function getChannelEditors(
    channelId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelEditors>> {
    return execute<kraken.ChannelEditors>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/editors`,
    });
  }

  function getChannelFollowers(
    channelId: string,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Follows>> {
    return execute<kraken.Follows>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/follows`,
      query,
    });
  }

  function getChannelTeams(
    channelId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Teams>> {
    return execute<kraken.Teams>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/teams`,
    });
  }

  function getChannelSubscriptions(
    channelId: string,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Subscriptions>> {
    return execute<kraken.Subscriptions>({
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
  ): Promise<RequestResponse<kraken.Subscription>> {
    return execute<kraken.Subscription>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/subscriptions/${userId}`,
    });
  }

  function getChannelVideos(
    channelId: string,
    query: kraken.VideosQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Videos>> {
    return execute<kraken.Videos>({
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
  ): Promise<RequestResponse<kraken.ChannelCommercial>> {
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
  ): Promise<RequestResponse<kraken.CurrentChannel>> {
    return execute<kraken.CurrentChannel>({
      options,
      method: "DELETE",
      path: `/kraken/channels/${channelId}/stream_key`,
    });
  }

  // Chat
  function getChannelBadges(
    channelId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelBadges>> {
    return execute<kraken.ChannelBadges>({
      options,
      method: "GET",
      path: `/kraken/chat/${channelId}/badges`,
    });
  }

  function getSetEmoticons(
    query: kraken.EmoticonsSetQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.EmoticonsSet>> {
    return execute<kraken.EmoticonsSet>({
      options,
      method: "GET",
      path: "/kraken/chat/emoticon_images",
      query,
    });
  }

  function getAllEmoticons(
    options: Options = {},
  ): Promise<RequestResponse<kraken.Emoticons>> {
    return execute<kraken.Emoticons>({
      options,
      method: "GET",
      path: "/kraken/chat/emoticons",
    });
  }

  // Clips
  function getClip(
    slug: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Clip>> {
    return execute<kraken.Clip>({
      options,
      method: "GET",
      path: `/kraken/clips/${slug}`,
    });
  }

  function getTopClips(
    query?: kraken.TopClipsQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Clips>> {
    return execute<kraken.Clips>({
      options,
      method: "GET",
      path: "/kraken/clips/top",
      query,
    });
  }

  function getFollowedClips(
    query?: kraken.FollowedQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Clips>> {
    return execute<kraken.Clips>({
      options,
      method: "GET",
      path: "/kraken/clips/followed",
      query,
    });
  }

  // Collection
  function getCollectionMetadata(
    collectionId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.CollectionMetadata>> {
    return execute<kraken.CollectionMetadata>({
      options,
      method: "GET",
      path: `/kraken/collections/${collectionId}`,
    });
  }

  function getCollection(
    collectionId: string,
    query?: kraken.CollectionQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Collection>> {
    return execute<kraken.Collection>({
      options,
      method: "GET",
      path: `/kraken/collections/${collectionId}/items`,
      query,
    });
  }

  function getChannelCollections(
    channelId: string,
    query?: kraken.ChannelCollectionQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelCollections>> {
    return execute<kraken.ChannelCollections>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/collections`,
      query,
    });
  }

  function createChannelCollection(
    channelId: string,
    body: kraken.CollectionBody,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelCollections>> {
    return execute<kraken.ChannelCollections>({
      options,
      method: "POST",
      path: `/kraken/channels/${channelId}/collections`,
      body,
    });
  }

  function updateCollection(
    collectionId: string,
    body: kraken.CollectionBody,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "PUT",
      path: `/kraken/collections/${collectionId}`,
      body,
    });
  }

  function createCollectionThumbnail(
    collectionId: string,
    body: kraken.CollectionThumbnailBody,
    options: Options = {},
  ) {
    return execute({
      options,
      method: "PUT",
      path: `/kraken/collections/${collectionId}/thumbnail`,
      body,
    });
  }

  function deleteCollection(collectionId: string, options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: `/kraken/collections/${collectionId}`,
    });
  }

  function addCollectionItem(
    collectionId: string,
    body: kraken.CollectionItemBody,
    options: Options = {},
  ): Promise<RequestResponse<kraken.CollectionItem>> {
    return execute<kraken.CollectionItem>({
      options,
      method: "POST",
      path: `/kraken/collections/${collectionId}/items`,
      body,
    });
  }

  function deleteCollectionItem(
    collectionId: string,
    itemId: string,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "DELETE",
      path: `/kraken/collections/${collectionId}/items/${itemId}`,
    });
  }

  function moveCollectionItem(
    collectionId: string,
    itemId: string,
    body: kraken.MoveCollectionItemBody,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "PUT",
      path: `/kraken/collections/${collectionId}/items/${itemId}`,
      body,
    });
  }

  // Games
  function getTopGames(
    query: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.TopGames>> {
    return execute<kraken.TopGames>({
      options,
      method: "GET",
      path: "/kraken/games/top",
      query,
    });
  }

  // Ingest
  function getIngestServers(
    options: Options = {},
  ): Promise<RequestResponse<kraken.IngestServers>> {
    return execute<kraken.IngestServers>({
      options,
      method: "GET",
      path: "/kraken/ingests",
    });
  }

  // Search
  function searchChannels(
    query: kraken.SearchQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Channels>> {
    return execute<kraken.Channels>({
      options,
      method: "GET",
      path: "/kraken/search/channels",
      query,
    });
  }

  function searchGames(
    query: kraken.SearchQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Games>> {
    return execute<kraken.Games>({
      options,
      method: "GET",
      path: "/kraken/search/games",
      query,
    });
  }

  function searchStreams(
    query: kraken.StreamSearchQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Streams>> {
    return execute<kraken.Streams>({
      options,
      method: "GET",
      path: "/kraken/search/streams",
      query,
    });
  }

  // Streams
  function getStream(
    channelId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelStream>> {
    return execute<kraken.ChannelStream>({
      options,
      method: "GET",
      path: `/kraken/streams/${channelId}`,
    });
  }

  function getStreams(
    query?: kraken.LiveStreamQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Streams>> {
    return execute<kraken.Streams>({
      options,
      method: "GET",
      path: "/kraken/streams",
      query,
    });
  }

  function getStreamsSummary(
    query?: kraken.StreamsSummaryQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.StreamsSummary>> {
    return execute<kraken.StreamsSummary>({
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
    getIngestServers,

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
