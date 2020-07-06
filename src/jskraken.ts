import request from "./request";
import { ExecuteArguments, JSHelix, Options } from "./types/jskraken";
import { RequestHeaders } from "./types/request";

export default function jsKraken(clientId: string, token?: string): JSHelix {
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

  // Ads
  // function startCommercial(
  //   body: kraken.StartCommercialBody,
  //   options: Options = {},
  // ): Promise<kraken.Response<kraken.StartCommercialData[]>> {
  //   return execute<kraken.Response<kraken.StartCommercialData[]>>({
  //     options,
  //     method: "POST",
  //     path: "/kraken/channels/commercial",
  //     body,
  //   });
  // }

  // Bits
  function getCheermotes(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/v5/bits/actions",
      query,
    });
  }

  // Channels
  function getCurrentChannel(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channel",
    });
  }

  function getChannel(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}",
    });
  }

  function updateChannel(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/channels/${params[0]}",
      body,
    });
  }

  function getChannelEditors(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/editors",
    });
  }

  function getChannelFollowers(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/follows",
      query,
    });
  }

  function getChannelTeams(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/teams",
    });
  }

  function getChannelSubscriptions(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/subscriptions",
      query,
    });
  }

  function checkChannelSubsctiption(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/subscriptions/${params[1]}",
      query,
    });
  }

  function getChannelVideos(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/videos",
      query,
    });
  }

  function startChannelCommercial(body, options: Options = {}) {
    return execute({
      options,
      method: "POST",
      path: "/kraken/channels/${params[0]}/commercial",
      body,
    });
  }

  function resetChannelStreamKey(options: Options = {}) {
    return execute({
      options,
      method: "DELETE",
      path: "/kraken/channels/${params[0]}/stream_key",
    });
  }

  function getChannelCommunities(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/channels/${params[0]}/communities",
    });
  }

  function setChannelCommunities(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/channels/${params[0]}/communities",
      body,
    });
  }

  function deleteChannelCommunities(body, options: Options = {}) {
    return execute({
      options,
      method: "PUT",
      path: "/kraken/channels/${params[0]}/community",
      body,
    });
  }

  // Chat
  function getChannelBadges(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/chat/${params[0]}/badges",
    });
  }

  function getChannelEmoticonsBySet(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/chat/${params[0]}/emoticon_images",
      query,
    });
  }

  function getChannelEmoticons(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/chat/${params[0]}/emoticons",
    });
  }

  function getChannelRooms(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/chat/${params[0]}/rooms",
    });
  }

  // Clips
  function getClip(options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/clips/${params[0]}",
    });
  }

  function getTopClips(query, options: Options = {}) {
    return execute({
      options,
      method: "GET",
      path: "/kraken/clips/top",
      query,
    });
  }

  function getFollowedClips(query, options: Options = {}) {
    return execute({
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
    getChannelCommunities,
    setChannelCommunities,
    deleteChannelCommunities,

    // Chat
    getChannelBadges,
    getChannelEmoticonsBySet,
    getChannelEmoticons,
    getChannelRooms,

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
