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

  // Ads
  startCommercial: (
    body: kraken.StartCommercialBody,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StartCommercialData[]>>;

  // Analytics
  getExtensionAnalytics: (
    query?: kraken.ExtensionAnalyticsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ExtensionAnalyticsData[]>>;
  getGameAnalytics: (
    query?: kraken.GameAnalyticsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.GameAnalyticsData[]>>;

  // Bits
  getCheermotes: (
    query?: kraken.CheermotesQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.CheermotesData[]>>;
  getBitsLeaderboard: (
    query?: kraken.BitsLeaderboardQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.BitsLeaderboardData[]>>;
  getExtensionsTransactions: (
    query: kraken.ExtensionTransactionQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ExtensionTransactionData[]>>;

  // Clip
  createClip: (
    query: kraken.CreateClipQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.CreateClipData[]>>;
  getClips: (
    query: kraken.ClipQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ClipData[]>>;

  // Entitlements
  createEntitlementGrantsUploadURL: (
    query: kraken.EntitlementGrantsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.EntitlementGrantsData[]>>;
  getCodeStatus: (
    query: kraken.CodeQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.CodeData[]>>;
  redeemCode: (
    query: kraken.CodeQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.CodeData[]>>;

  // Games
  getTopGames: (
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.GameData[]>>;
  getGames: (
    query: kraken.GameQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.GameData[]>>;

  // Moderation
  checkAutoModStatus: (
    query: kraken.AutoModQuery,
    body: kraken.AutoModBody,
    options?: Options,
  ) => Promise<kraken.Response<kraken.AutoModData[]>>;
  getBannedUsers: (
    query: kraken.BannedUserQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.BannedUserData[]>>;
  getBannedEvents: (
    query: kraken.EventQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.BannedEventData[]>>;
  getModerators: (
    query: kraken.ModeratorQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ModeratorData[]>>;
  getModeratorEvents: (
    query: kraken.EventQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.Event[]>>;

  // Search
  searchCategories: (
    query: kraken.SearchQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.GameData[]>>;
  searchChannels: (
    query: kraken.ChannelSearchQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ChannelSearchData[]>>;

  // Streams
  getStreamKey: (
    query: kraken.StreamKeyQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamKeyData[]>>;
  getStreams: (
    query?: kraken.StreamQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamData[]>>;
  getStreamsMetadata: (
    query?: kraken.StreamQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamMetadata[]>>;
  createStreamMarker: (
    body: kraken.CreateStreamMarkerBody,
    options?: Options,
  ) => Promise<kraken.Response<kraken.CreateStreamMarkerData[]>>;
  getStreamMarkers: (
    query: kraken.StreamMarkerQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamMarkerData[]>>;

  // Channels
  getChannelInformation: (
    query: kraken.ChannelInformationQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.ChannelInformationData[]>>;
  modifyChannelInformation: (
    query: kraken.ModifyChannelInformationQuery,
    options?: Options,
  ) => Promise<kraken.Response<RequestResponse>>;

  // Subscriptions
  getBroadcasterSubscriptions: (
    query: kraken.BroadcasterSubscriptionQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.BroadcasterSubscriptionData[]>>;

  // Tags
  getAllStreamTags: (
    query?: kraken.AllStreamTagsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamTagData[]>>;
  getStreamTags: (
    query: kraken.StreamTagsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.StreamTagData[]>>;
  replaceStreamTags: (
    query: kraken.StreamTagsQuery,
    body?: kraken.ReplaceStreamTagBody,
    options?: Options,
  ) => Promise<RequestResponse>;

  // Users
  createUserFollow: (
    body: kraken.CreateUserFollowBody,
    query?: kraken.CreateUserFollowQuery,
    options?: Options,
  ) => Promise<RequestResponse>;
  deleteUserFollow: (
    query: kraken.DeleteUserFollowQuery,
    options?: Options,
  ) => Promise<RequestResponse>;
  getUsers: (
    query?: kraken.UserQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.UserData[]>>;
  getUserFollows: (
    query: kraken.UserFollowsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.UserFollowData[]>>;
  updateUser: (
    query?: kraken.UpdateUserQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.UserData[]>>;
  getUserExtensions: (
    options?: Options,
  ) => Promise<kraken.Response<kraken.ExtensionData[]>>;
  getUserActiveExtensions: (
    query?: kraken.UserActiveExtensionQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.UserExtensionData>>;
  updateUserExtensions: (
    body: kraken.UpdateUserExtensionBody,
    options?: Options,
  ) => Promise<kraken.Response<kraken.UserExtensionData>>;

  // Videos
  getVideos: (
    query: kraken.VideoQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.VideoData[]>>;
  getWebhookSubscriptions: (
    query?: kraken.PaginationQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.WebhookSubscriptionData[]>>;

  // Hype
  getHypeTrainEvents: (
    query: kraken.HypeTrainEventsQuery,
    options?: Options,
  ) => Promise<kraken.Response<kraken.HypeTrainEvent[]>>;
}
