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
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Channel>> {
    return execute<kraken.Channel>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}`,
    });
  }

  function updateChannel(
    channelId: kraken.id,
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
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelEditors>> {
    return execute<kraken.ChannelEditors>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/editors`,
    });
  }

  function getChannelFollowers(
    channelId: kraken.id,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelFollows>> {
    return execute<kraken.ChannelFollows>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/follows`,
      query,
    });
  }

  function getChannelTeams(
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Teams>> {
    return execute<kraken.Teams>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/teams`,
    });
  }

  function getChannelSubscriptions(
    channelId: kraken.id,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelSubscriptions>> {
    return execute<kraken.ChannelSubscriptions>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/subscriptions`,
      query,
    });
  }

  function checkChannelSubsctiption(
    channelId: kraken.id,
    userId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelSubscription>> {
    return execute<kraken.ChannelSubscription>({
      options,
      method: "GET",
      path: `/kraken/channels/${channelId}/subscriptions/${userId}`,
    });
  }

  function getChannelVideos(
    channelId: kraken.id,
    query?: kraken.VideosQuery,
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
    channelId: kraken.id,
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
    channelId: kraken.id,
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
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelBadges>> {
    return execute<kraken.ChannelBadges>({
      options,
      method: "GET",
      path: `/kraken/chat/${channelId}/badges`,
    });
  }

  function getSetEmoticons(
    query?: kraken.EmoticonsSetQuery,
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
    channelId: kraken.id,
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

  function createCollection(
    channelId: kraken.id,
    body: kraken.CollectionBody,
    options: Options = {},
  ): Promise<RequestResponse<kraken.CollectionMetadata>> {
    return execute<kraken.CollectionMetadata>({
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
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "PUT",
      path: `/kraken/collections/${collectionId}/thumbnail`,
      body,
    });
  }

  function deleteCollection(
    collectionId: string,
    options: Options = {},
  ): Promise<RequestResponse> {
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
    query?: kraken.PaginationQuery,
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
    channelId: kraken.id,
    query?: kraken.StreamQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.ChannelStream>> {
    return execute<kraken.ChannelStream>({
      options,
      method: "GET",
      path: `/kraken/streams/${channelId}`,
      query,
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

  function getFeaturedStreams(
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.FeaturedStreams>> {
    return execute<kraken.FeaturedStreams>({
      options,
      method: "GET",
      path: "/kraken/streams/featured",
      query,
    });
  }

  function getFollowedStreams(
    query?: kraken.FollowedStreamQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Streams>> {
    return execute<kraken.Streams>({
      options,
      method: "GET",
      path: "/kraken/streams/followed",
      query,
    });
  }

  // Teams
  function getTeams(
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Teams>> {
    return execute<kraken.Teams>({
      options,
      method: "GET",
      path: "/kraken/teams",
      query,
    });
  }

  function getTeam(
    teamName: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Team>> {
    return execute<kraken.Team>({
      options,
      method: "GET",
      path: `/kraken/teams/${teamName}`,
    });
  }

  // User
  function getCurrentUser(
    options: Options = {},
  ): Promise<RequestResponse<kraken.CurrentUser>> {
    return execute<kraken.CurrentUser>({
      options,
      method: "GET",
      path: "/kraken/user",
    });
  }

  function getUser(
    userId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.User>> {
    return execute<kraken.User>({
      options,
      method: "GET",
      path: `/kraken/users/${userId}`,
    });
  }

  function getUsers(
    query: kraken.UserQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Users>> {
    return execute<kraken.Users>({
      options,
      method: "GET",
      path: "/kraken/users",
      query,
    });
  }

  function getUserEmotes(
    userId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.EmoticonsSet>> {
    return execute<kraken.EmoticonsSet>({
      options,
      method: "GET",
      path: `/kraken/users/${userId}/emotes`,
    });
  }

  function checkUserSubsctiption(
    userId: kraken.id,
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserSubscription>> {
    return execute<kraken.UserSubscription>({
      options,
      method: "GET",
      path: `/kraken/users/${userId}/subscriptions/${channelId}`,
    });
  }

  function getUserFollows(
    userId: kraken.id,
    query?: kraken.UserFollowsQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserFollows>> {
    return execute<kraken.UserFollows>({
      options,
      method: "GET",
      path: `/kraken/users/${userId}/follows/channels`,
      query,
    });
  }

  function checkUserFollow(
    userId: kraken.id,
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserFollow>> {
    return execute<kraken.UserFollow>({
      options,
      method: "GET",
      path: `/kraken/users/${userId}/follows/channels/${channelId}`,
    });
  }

  function followChannel(
    userId: kraken.id,
    channelId: kraken.id,
    body?: kraken.FollowChannelBody,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserFollow>> {
    return execute<kraken.UserFollow>({
      options,
      method: "PUT",
      path: `/kraken/users/${userId}/follows/channels/${channelId}`,
      body,
    });
  }

  function unfollowChannel(
    userId: kraken.id,
    channelId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "DELETE",
      path: `/kraken/users/${userId}/follows/channels/${channelId}`,
    });
  }

  function getBlockedUsers(
    userId: kraken.id,
    query?: kraken.PaginationQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserBlocks>> {
    return execute({
      options,
      method: "GET",
      path: `/kraken/users/${userId}/blocks`,
      query,
    });
  }

  function blockUser(
    userId: kraken.id,
    blockId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.UserBlock>> {
    return execute({
      options,
      method: "PUT",
      path: `/kraken/users/${userId}/blocks/${blockId}`,
    });
  }

  function unblockUser(
    userId: kraken.id,
    blockId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "DELETE",
      path: `/kraken/users/${userId}/blocks/${blockId}`,
    });
  }

  function createConnectionToVHS(
    body: kraken.VHS,
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/user/vhs",
      body,
    });
  }

  function checkConnectionToVHS(
    options: Options = {},
  ): Promise<RequestResponse<kraken.VHS>> {
    return execute({
      options,
      method: "GET",
      path: "/kraken/user/vhs",
    });
  }

  function deleteConnectionToVHS(
    options: Options = {},
  ): Promise<RequestResponse> {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/user/vhs",
    });
  }

  // Videos
  function getVideo(
    videoId: string,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Video>> {
    return execute<kraken.Video>({
      options,
      method: "GET",
      path: `/kraken/videos/${videoId}`,
    });
  }

  function getTopVideos(
    query?: kraken.TopVideosQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Vods>> {
    return execute<kraken.Vods>({
      options,
      method: "GET",
      path: "/kraken/videos/top",
      query,
    });
  }

  function getFollowedVideos(
    query?: kraken.VideosQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Videos>> {
    return execute<kraken.Videos>({
      options,
      method: "GET",
      path: "/kraken/videos/followed",
      query,
    });
  }

  function createVideo(
    query: kraken.CreateVideoQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.CreatedVideo>> {
    return execute<kraken.CreatedVideo>({
      options,
      method: "POST",
      path: "/kraken/videos",
      query,
    });
  }

  function uploadVideoPart(
    videoId: string,
    query: kraken.UploadVideoPartQuery,
    body: Blob,
    options: Options = {},
  ): Promise<RequestResponse> {
    if (!options.url) {
      options.url = "https://uploads.twitch.tv";
    }
    return execute({
      options,
      method: "PUT",
      path: `/upload/${videoId}`,
      query,
      body,
    });
  }

  function completeVideoUpload(
    videoId: string,
    query: kraken.UploadVideoQuery,
    options: Options = {},
  ): Promise<RequestResponse> {
    if (!options.url) {
      options.url = "https://uploads.twitch.tv";
    }
    return execute({
      options,
      method: "PUT",
      path: `/upload/${videoId}/complete`,
      query,
    });
  }

  function updateVideo(
    videoId: string,
    query?: kraken.UpdateVideoQuery,
    options: Options = {},
  ): Promise<RequestResponse<kraken.Video>> {
    return execute<kraken.Video>({
      options,
      method: "POST",
      path: `/kraken/videos/${videoId}`,
      query,
    });
  }

  function deleteVideo(
    videoId: kraken.id,
    options: Options = {},
  ): Promise<RequestResponse<kraken.DeletedVideo>> {
    return execute<kraken.DeletedVideo>({
      options,
      method: "DELETE",
      path: `/kraken/videos/${videoId}`,
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
    createCollection,
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
    getUser,
    getUsers,
    getUserEmotes,
    checkUserSubsctiption,
    getUserFollows,
    checkUserFollow,
    followChannel,
    unfollowChannel,
    getBlockedUsers,
    blockUser,
    unblockUser,
    createConnectionToVHS,
    checkConnectionToVHS,
    deleteConnectionToVHS,

    // Videos
    getVideo,
    getTopVideos,
    getFollowedVideos,
    createVideo,
    uploadVideoPart,
    completeVideoUpload,
    updateVideo,
    deleteVideo,
  };
}
