import * as kraken from "./kraken";
import { RequestHeaders, RequestMethod, RequestResponse } from "./request";

export interface Options {
  headers?: kraken.map<string>;
  url?: string;
}

export interface ExecuteArguments {
  method: RequestMethod;
  path: string;
  query?: unknown;
  body?: unknown;
  options: Options;
}

export interface JSKraken {
  url: string;
  headers: RequestHeaders;

  // Bits
  getCheermotes: (
    query?: kraken.CheermotesQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Cheermotes>>;

  // Channels
  getCurrentChannel: (
    options?: Options,
  ) => Promise<RequestResponse<kraken.CurrentChannel>>;
  getChannel: (
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Channel>>;
  updateChannel: (
    channelId: kraken.id,
    body: kraken.UpdateChannelBody,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Channel>>;
  getChannelEditors: (
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelEditors>>;
  getChannelFollowers: (
    channelId: kraken.id,
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelFollows>>;
  getChannelTeams: (
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Teams>>;
  getChannelSubscriptions: (
    channelId: kraken.id,
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelSubscriptions>>;
  checkChannelSubsctiption: (
    channelId: kraken.id,
    userId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelSubscription>>;
  getChannelVideos: (
    channelId: kraken.id,
    query?: kraken.VideosQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Videos>>;
  startChannelCommercial: (
    channelId: kraken.id,
    body: kraken.ChannelCommercialBody,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelCommercial>>;
  resetChannelStreamKey: (
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.CurrentChannel>>;

  // Chat
  getChannelBadges: (
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelBadges>>;
  getSetEmoticons: (
    query?: kraken.EmoticonsSetQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.EmoticonsSet>>;
  getAllEmoticons: (
    options?: Options,
  ) => Promise<RequestResponse<kraken.Emoticons>>;

  // Clips
  getClip: (
    slug: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Clip>>;
  getTopClips: (
    query?: kraken.TopClipsQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Clips>>;
  getFollowedClips: (
    query?: kraken.FollowedQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Clips>>;

  // Collection
  getCollectionMetadata: (
    collectionId: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.CollectionMetadata>>;
  getCollection: (
    collectionId: string,
    query?: kraken.CollectionQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Collection>>;
  getChannelCollections: (
    channelId: kraken.id,
    query?: kraken.ChannelCollectionQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelCollections>>;
  createChannelCollection: (
    channelId: kraken.id,
    body: kraken.CollectionBody,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelCollections>>;
  updateCollection: (
    collectionId: string,
    body: kraken.CollectionBody,
    options?: Options,
  ) => Promise<RequestResponse>;
  createCollectionThumbnail: (
    collectionId: string,
    body: kraken.CollectionThumbnailBody,
    options?: Options,
  ) => Promise<RequestResponse>;
  deleteCollection: (
    collectionId: string,
    options?: Options,
  ) => Promise<RequestResponse>;
  addCollectionItem: (
    collectionId: string,
    body: kraken.CollectionItemBody,
    options?: Options,
  ) => Promise<RequestResponse<kraken.CollectionItem>>;
  deleteCollectionItem: (
    collectionId: string,
    itemId: string,
    options?: Options,
  ) => Promise<RequestResponse>;
  moveCollectionItem: (
    collectionId: string,
    itemId: string,
    body: kraken.MoveCollectionItemBody,
    options?: Options,
  ) => Promise<RequestResponse>;

  // Games
  getTopGames: (
    query: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.TopGames>>;

  // Ingest
  getIngestServers: (
    options?: Options,
  ) => Promise<RequestResponse<kraken.IngestServers>>;

  // Search
  searchChannels: (
    query: kraken.SearchQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Channels>>;
  searchGames: (
    query: kraken.SearchQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Games>>;
  searchStreams: (
    query: kraken.StreamSearchQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Streams>>;

  // Streams
  getStream: (
    channelId: kraken.id,
    query?: kraken.StreamQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.ChannelStream>>;
  getStreams: (
    query?: kraken.LiveStreamQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Streams>>;
  getStreamsSummary: (
    query?: kraken.StreamsSummaryQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.StreamsSummary>>;
  getFeaturedStreams: (
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.FeaturedStreams>>;
  getFollowedStreams: (
    query?: kraken.FollowedStreamQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Streams>>;

  // Teams
  getTeams: (
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Teams>>;
  getTeam: (
    teamName: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Team>>;

  // User
  getCurrentUser: (
    options?: Options,
  ) => Promise<RequestResponse<kraken.CurrentUser>>;
  getUser: (
    userId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.User>>;
  getUsers: (
    query: kraken.UserQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Users>>;
  getUserEmotes: (
    userId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.EmoticonsSet>>;
  checkUserSubsctiption: (
    userId: kraken.id,
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserSubscription>>;
  getUserFollows: (
    userId: kraken.id,
    query?: kraken.UserFollowsQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserFollows>>;
  checkUserFollow: (
    userId: kraken.id,
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserFollow>>;
  userFollowChannel: (
    userId: kraken.id,
    channelId: kraken.id,
    body?: kraken.FollowChannelBody,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserFollow>>;
  userUnfollowChannel: (
    userId: kraken.id,
    channelId: kraken.id,
    options?: Options,
  ) => Promise<RequestResponse>;
  getUserBlocks: (
    userId: kraken.id,
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserBlocks>>;
  userBlockUser: (
    userId: kraken.id,
    blockId: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.UserBlock>>;
  userUnlockUser: (
    userId: kraken.id,
    blockId: string,
    options?: Options,
  ) => Promise<RequestResponse>;
  createConnectionToVHS: (
    body: kraken.VHS,
    options?: Options,
  ) => Promise<RequestResponse>;
  checkConnectionToVHS: (
    options?: Options,
  ) => Promise<RequestResponse<kraken.VHS>>;
  deleteConnectionToVHS: (options?: Options) => Promise<RequestResponse>;

  // Videos
  getVideo: (
    videoId: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Video>>;
  getTopVideos: (
    query?: kraken.TopVideosQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Vods>>;
  getFollowedVideos: (
    query?: kraken.VideosQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Videos>>;
  createVideo: (
    query: kraken.CreateVideoQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.CreatedVideo>>;
  uploadVideoPart: (
    videoId: string,
    query: kraken.UploadVideoPartQuery,
    body: Blob,
    options?: Options,
  ) => Promise<RequestResponse>;
  completeVideoUpload: (
    videoId: string,
    query: kraken.UploadVideoQuery,
    options?: Options,
  ) => Promise<RequestResponse>;
  updateVideo: (
    videoId: string,
    query?: kraken.UpdateVideoQuery,
    options?: Options,
  ) => Promise<RequestResponse<kraken.Video>>;
  deleteVideo: (
    videoId: string,
    options?: Options,
  ) => Promise<RequestResponse<kraken.DeletedVideo>>;
}
