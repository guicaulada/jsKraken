export type integer = number;
export type float = number;

export type repeatable = string | string[];

export type map<T> = {
  [key: string]: T;
};

export type CheermoteBackground = "light" | "dark";

export type CheermoteScale = "1" | "1.5" | "2" | "3" | "4";

export type CheermoteState = "static" | "animated";

export type VideoSort = "views" | "time";

export type BroadcastType = "all" | "archive" | "highlight" | "upload";

export type CommercialLength = 30 | 60 | 90 | 120 | 150 | 180;

export type Period = "all" | "day" | "week" | "month";

export type StreamType = "live" | "playlist" | "all";

export enum SubscriptionTier {
  "Tier 1" = "1000",
  "Tier 2" = "2000",
  "Tier 3" = "3000",
}

export interface PaginationQuery {
  limit?: integer;
  offset?: integer;
  cursor?: string;
  direction?: string;
}

export interface Pagination {
  _cursor?: string;
  _total?: integer;
}

export interface CheermotesQuery {
  channel_id?: string;
}

export interface CheermoteImagesByState {
  animated: map<string>;
  static: map<string>;
}

export interface CheermoteImages {
  dark: CheermoteImagesByState;
  light: CheermoteImagesByState;
}

export interface CheermoteTier {
  color: string;
  id: string;
  images: CheermoteImages;
  min_bits: integer;
}

export interface Cheermote {
  backgrounds: CheermoteBackground[];
  prefix: string;
  scales: CheermoteScale[];
  states: CheermoteState[];
  tiers: CheermoteTier[];
}

export interface Cheermotes {
  actions: Cheermote[];
}

export interface CurrentChannel extends Channel {
  broadcaster_type: string;
  stream_key: string;
  email: string;
}

export interface Channel {
  _id: integer;
  broadcaster_language: string;
  created_at: string;
  display_name: string;
  followers: integer;
  game: string;
  language: string;
  logo: string;
  mature: boolean;
  name: string;
  partner: boolean;
  profile_banner: string;
  profile_banner_background_color: string;
  status: string;
  updated_at: string;
  url: string;
  video_banner: string;
  views: integer;
}

export interface UpdateChannelData {
  status?: string;
  game?: string;
  delay?: string;
  channel_feed_enabled?: boolean;
}

export interface UpdateChannelBody {
  channel: UpdateChannelData;
}

export interface User {
  _id: integer;
  bio: string;
  created_at: string;
  display_name: string;
  logo: string;
  name: string;
  type: string;
  updated_at: string;
}

export interface ChannelEditors {
  users: User[];
}

export interface Follow {
  created_at: string;
  notifications: boolean;
  user: User;
}

export interface Follows extends Pagination {
  follows: Follow[];
}

export interface Team {
  _id: integer;
  background: string;
  banner: string;
  created_at: string;
  display_name: string;
  info: string;
  logo: string;
  name: string;
  updated_at: string;
}

export interface Teams {
  teams: Team[];
}

export interface Subscription {
  _id: string;
  created_at: string;
  sub_plan: SubscriptionTier;
  sub_plan_name: string;
  user: User;
}

export interface Subscriptions extends Pagination {
  subscriptions: Subscription[];
}

export interface VideosQuery extends PaginationQuery {
  broadcast_type?: BroadcastType[];
  language?: repeatable;
  sort?: VideoSort;
}

export interface VideoChannel {
  _id: string;
  display_name: string;
  name: string;
}

export interface VideoFPS {
  chunked: float;
  high: float;
  low: float;
  medium: float;
  mobile: float;
}

export interface VideoResolutions {
  chunked: string;
  high: string;
  low: string;
  medium: string;
  mobile: string;
}

export interface VideoThumbnailData {
  type: string;
  url: string;
}

export interface VideoThumbnails {
  large: VideoThumbnailData[];
  medium: VideoThumbnailData[];
  small: VideoThumbnailData[];
  template: VideoThumbnailData[];
}

export interface Video {
  _id: string;
  broadcast_id: integer;
  broadcast_type: string;
  channel: VideoChannel;
  created_at: string;
  description: string;
  description_html: string;
  fps: VideoFPS;
  game: string;
  language: string;
  length: integer;
  preview: Thumbnails;
  published_at: string;
  resolutions: VideoResolutions;
  status: string;
  tag_list: string;
  thumbnails: VideoThumbnails;
  title: string;
  url: string;
  viewable: string;
  viewable_at: string;
  views: integer;
}

export interface Videos extends Pagination {
  videos: Video[];
}

export interface ChannelCommercialBody {
  length: CommercialLength;
}

export interface ChannelCommercial {
  Length: integer;
  Message: string;
  RetryAfter: integer;
}

export interface ChannelBadge {
  alpha: string;
  image: string;
  svg: string;
}

export interface ChannelBadges {
  admin: ChannelBadge;
  broadcaster: ChannelBadge;
  global_mod: ChannelBadge;
  mod: ChannelBadge;
  staff: ChannelBadge;
  subscriber: ChannelBadge;
  turbo: ChannelBadge;
}

export interface EmoticonsSetQuery {
  emotesets: integer[];
}

export interface SetEmoticon {
  code: string;
  emoticon_set?: integer;
  id: integer;
}

export interface EmoticonsSet {
  emoticon_sets?: map<SetEmoticon[]>;
  emoticons?: SetEmoticon[];
}

export interface EmoticonImage {
  width: integer;
  height: integer;
  url: string;
  emoticon_set: integer;
}

export interface Emoticon {
  id: integer;
  regex: string;
  images: EmoticonImage[];
}

export interface SelfLink {
  self: string;
}

export interface Emoticons {
  _links: SelfLink;
  emoticons: Emoticon[];
}

export interface ClipBroadcaster {
  id: string;
  name: string;
  display_name: string;
  channel_url: string;
  logo: string;
}

export interface ClipCurator {
  id: string;
  name: string;
  display_name: string;
  channel_url: string;
  logo: string;
}

export interface ClipVod {
  id: string;
  url: string;
}

export interface ClipThumbnails {
  medium: string;
  small: string;
  tiny: string;
}

export interface Clip {
  slug: string;
  tracking_id: string;
  url: string;
  embed_url: string;
  embed_html: string;
  broadcaster: ClipBroadcaster;
  curator: ClipCurator;
  vod: ClipVod;
  game: string;
  language: string;
  title: string;
  views: integer;
  duration: float;
  created_at: string;
  thumbnails: ClipThumbnails;
}

export interface TopClipsQuery extends PaginationQuery {
  channel?: string;
  game?: string;
  language?: repeatable;
  period?: Period;
  trending?: boolean;
}

export interface Clips extends Pagination {
  clips: Clip[];
}

export interface FollowedQuery extends PaginationQuery {
  trending?: boolean;
}

export interface CollectionOwner {
  _id: string;
  bio: string;
  created_at: string;
  display_name: string;
  logo: string;
  name: string;
  type: string;
  updated_at: string;
}

export interface Thumbnails {
  large: string;
  medium: string;
  small: string;
  template: string;
}

export interface CollectionMetadata {
  _id: string;
  created_at: string;
  items_count: integer;
  owner: CollectionOwner;
  thumbnails: Thumbnails;
  title: string;
  total_duration: integer;
  updated_at: string;
  views: integer;
}

export interface CollectionQuery {
  include_all_items?: boolean;
}

export interface CollectionItem {
  _id: string;
  description_html: string;
  duration: integer;
  game: string;
  item_id: string;
  item_type: string;
  owner: CollectionOwner;
  published_at: string;
  thumbnails: Thumbnails;
  title: string;
  views: integer;
}

export interface Collection {
  _id: string;
  items: CollectionItem[];
}

export interface ChannelCollectionQuery extends PaginationQuery {
  containing_item: string;
}

export interface ChannelCollections extends Pagination {
  collections: CollectionMetadata[];
}

export interface CollectionBody {
  title: string;
}

export interface CollectionThumbnailBody {
  item_id: string;
}

export interface CollectionItemBody {
  id: string;
  type: "video";
}

export interface MoveCollectionItemBody {
  position: integer;
}

export interface Game {
  _id: integer;
  box: Thumbnails;
  giantbomb_id: integer;
  logo: Thumbnails;
  name: string;
}

export interface TopGame {
  channels: integer;
  viewers: integer;
  game: Game;
}

export interface TopGames extends Pagination {
  top: TopGame[];
}

export interface IngestServer {
  _id: integer;
  availability: float;
  default: boolean;
  name: string;
  url_template: string;
}

export interface IngestServers {
  ingests: IngestServer[];
}

export interface SearchQuery extends PaginationQuery {
  query: string;
}

export interface Channels extends Pagination {
  channels: Channel[];
}

export interface Games extends Pagination {
  games: Game[];
}

export interface StreamSearchQuery extends SearchQuery {
  hls?: boolean;
}

export interface Stream {
  _id: integer;
  average_fps: float;
  channel: Channel;
  created_at: string;
  delay: float;
  game: string;
  is_playlist: boolean;
  preview: Thumbnails;
  video_height: integer;
  viewers: integer;
}

export interface Streams extends Pagination {
  streams: Stream[];
}

export interface ChannelStreamQuery {
  stream_type: StreamType;
}

export interface ChannelStream {
  stream?: Stream;
}

export interface LiveStreamQuery extends Pagination, ChannelStreamQuery {
  channel: repeatable;
  game: string;
  language: string;
}

export interface StreamsSummaryQuery {
  game?: repeatable;
}

export interface StreamsSummary {
  channels: integer;
  viewers: integer;
}

// import { RequestResponse } from "./request";

// export type integer = number;

// export type repeatable = string | string[];

// export type map<T> = {
//   [key: string]: T;
// };

// export type CommercialLength = 30 | 60 | 90 | 120 | 150 | 180;

// export type AnalyticsType = "overview_v1" | "overview_v2";

// export type CheermoteTierId =
//   | "1"
//   | "100"
//   | "500"
//   | "1000"
//   | "5000"
//   | "10k"
//   | "100k";

// export type CheermoteType =
//   | "global_first_party"
//   | "global_third_party"
//   | "channel_custom"
//   | "display_only"
//   | "sponsored";

// export type Period = "all" | "day" | "week" | "month";

// export type VideoSort = "time" | "trending" | "views";

// export type VideoType = "upload" | "archive" | "highlight";

// export type Viewable = "private" | "public";

// export type VideoTypeQuery = "all" | VideoType;

// export type ExtensionType = "component" | "mobile" | "panel" | "overlay";

// export type CodeStatus =
//   | "SUCCESSFULLY_REDEEMED"
//   | "ALREADY_CLAIMED"
//   | "EXPIRED"
//   | "USER_NOT_ELIGIBLE"
//   | "NOT_FOUND"
//   | "INACTIVE"
//   | "UNUSED"
//   | "INCORRECT_FORMAT"
//   | "INTERNAL_ERROR";

// export enum SubscriptionTier {
//   "Tier 1" = "1000",
//   "Tier 2" = "2000",
//   "Tier 3" = "3000",
// }

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export interface PaginationCursor {
//   cursor?: string;
// }

// export interface DateRange {
//   started_at?: string;
//   ended_at?: string;
// }

// export interface Response<T> extends RequestResponse {
//   total?: integer;
//   pagination?: PaginationCursor;
//   date_range?: DateRange;
//   data: T;
// }

// export interface PaginationQuery {
//   after?: string;
//   before?: string;
//   first?: integer;
// }

// export interface StartCommercialBody {
//   broadcaster_id: string;
//   length: CommercialLength;
// }

// export interface StartCommercialData {
//   length: CommercialLength;
//   message: string;
//   retryAfter: integer;
// }

// export interface AnalyticsQuery extends PaginationQuery, DateRange {
//   type?: AnalyticsType;
// }

// export interface AnalyticsData {
//   URL: string;
//   date_range: DateRange;
//   type: AnalyticsType;
// }

// export interface ExtensionAnalyticsQuery extends AnalyticsQuery {
//   extension_id?: string;
// }

// export interface ExtensionAnalyticsData extends AnalyticsData {
//   extension_id: string;
// }

// export interface GameAnalyticsQuery extends AnalyticsQuery {
//   game_id?: string;
// }

// export interface GameAnalyticsData extends AnalyticsData {
//   game_id: string;
// }

// export interface BitsLeaderboardQuery extends DateRange {
//   count?: integer;
//   period?: Period;
//   user_id?: string;
// }

// export interface BitsLeaderboardData {
//   user_id: string;
//   user_name: string;
//   rank: integer;
//   score: integer;
// }

// export interface ExtensionTransactionQuery extends PaginationQuery {
//   extension_id: string;
//   id?: repeatable;
// }

// export interface ExtensionTransactionCostData {
//   amount: integer;
//   type: "bits";
// }

// export interface ExtensionTransactionProductData {
//   domain?: string;
//   broadcast?: boolean;
//   sku: string;
//   cost: ExtensionTransactionCostData;
//   displayName: string;
//   inDevelopment: boolean;
// }

// export interface ExtensionTransactionData {
//   id: string;
//   timestamp: string;
//   broadcaster_id: string;
//   broadcaster_name: string;
//   user_id: string;
//   user_name: string;
//   product_type: "BITS_IN_EXTENSION";
//   product_data: ExtensionTransactionProductData;
// }

// export interface CreateClipQuery {
//   broadcaster_id: string;
//   has_delay?: boolean;
// }

// export interface CreateClipData {
//   id: string;
//   edit_url: string;
// }

// export interface ClipQuery extends PaginationQuery, DateRange {
//   broadcaster_id?: string;
//   game_id?: string;
//   id?: repeatable;
// }

// export interface ClipData {
//   id: string;
//   url: string;
//   embed_url: string;
//   broadcaster_id: string;
//   broadcaster_name: string;
//   creator_id: string;
//   creator_name: string;
//   video_id: string;
//   game_id: string;
//   language: string;
//   title: string;
//   view_count: integer;
//   created_at: string;
//   thumbnail_url: string;
// }

// export interface EntitlementGrantsQuery {
//   manifest_id: string;
//   type: "bulk_drops_grant";
// }

// export interface EntitlementGrantsData {
//   url: string;
// }

// export interface CodeQuery {
//   code: repeatable;
//   user_id: string;
// }

// export interface CodeData {
//   code: string;
//   status: CodeStatus;
// }

// export interface GameQuery {
//   id?: repeatable;
//   name?: repeatable;
// }

// export interface GameData {
//   id: string;
//   name: string;
//   box_art_url: string;
// }

// export interface AutoModQuery {
//   broadcaster_id: string;
// }

// export interface AutoModBodyData {
//   msg_id: string;
//   msg_text: string;
//   user_id: string;
// }

// export interface AutoModBody {
//   data: AutoModBodyData[];
// }

// export interface AutoModData {
//   msg_id: string;
//   is_permitted: boolean;
// }

// export interface BannedUserQuery extends PaginationQuery {
//   broadcaster_id: string;
//   user_id?: repeatable;
// }

// export interface BannedUserData {
//   user_id: string;
//   user_name: string;
//   expires_at: string;
// }

// export interface EventQuery extends PaginationQuery {
//   broadcaster_id: string;
//   user_id?: repeatable;
// }

// export interface EventData {
//   broadcaster_id: string;
//   broadcaster_name: string;
//   user_id: string;
//   user_name: string;
// }

// export interface Event {
//   id: string;
//   event_type: string;
//   event_timestamp: string;
//   version: string;
//   event_data: EventData;
// }

// export interface BanEventData extends EventData {
//   expires_at: string;
// }
// export interface BannedEventData extends Event {
//   event_data: BanEventData;
// }

// export interface ModeratorQuery extends PaginationQuery {
//   broadcaster_id: string;
//   user_id?: repeatable;
// }

// export interface ModeratorData {
//   user_id: string;
//   user_name: string;
// }

// export interface SearchQuery extends PaginationQuery {
//   query: string;
// }

// export interface ChannelSearchQuery extends SearchQuery {
//   live_only?: boolean;
// }

// export interface ChannelSearchData {
//   broadcaster_language: string;
//   display_name: string;
//   game_id: string;
//   id: string;
//   is_live: boolean;
//   thumbnail_url: string;
//   title: string;
//   tags_ids?: string[];
//   started_at?: string;
// }

// export interface StreamKeyQuery {
//   broadcaster_id: string;
// }

// export interface StreamKeyData {
//   stream_key: string;
// }

// export interface StreamQuery extends PaginationQuery {
//   game_id?: repeatable;
//   language?: repeatable;
//   user_id?: repeatable;
//   user_login?: repeatable;
// }

// export interface StreamData {
//   id: string;
//   user_id: string;
//   user_name: string;
//   game_id: string;
//   type: string;
//   title: string;
//   viewer_count: integer;
//   started_at: string;
//   language: string;
//   thumbnail_url: string;
// }

// export interface OverwatchHero {
//   role: string;
//   name: string;
//   ability: string;
// }

// export interface HearthstoneHero {
//   type: string;
//   class: string;
//   name: string;
// }

// export interface HeroMetadata<T> {
//   hero?: T;
// }

// export interface OverwatchMetadata {
//   broadcaster: HeroMetadata<OverwatchHero>;
// }

// export interface HearthstoneMetadata {
//   broadcaster: HeroMetadata<HearthstoneHero>;
//   opponent: HeroMetadata<HearthstoneHero>;
// }

// export interface StreamMetadata {
//   user_id: string;
//   user_name: string;
//   game_id?: string;
//   overwatch?: OverwatchMetadata;
//   hearthstone?: HearthstoneMetadata;
// }

// export interface CreateStreamMarkerBody {
//   user_id: string;
//   description?: string;
// }

// export interface CreateStreamMarkerData {
//   id: string;
//   created_at: string;
//   description: string;
//   position_seconds: integer;
// }

// export interface StreamMarkerQuery extends PaginationQuery {
//   user_id?: string;
//   video_id?: string;
// }

// export interface StreamMarker {
//   id: string;
//   created_at: string;
//   description: string;
//   position_seconds: integer;
//   URL: string;
// }

// export interface StreamMarkerVideo {
//   video_id: string;
//   markers: StreamMarker[];
// }

// export interface StreamMarkerData {
//   user_id: string;
//   user_name: string;
//   videos: StreamMarkerVideo[];
// }

// export interface ChannelInformationQuery {
//   broadcaster_id: string;
// }

// export interface ChannelInformationData {
//   game_name: string;
//   broadcaster_id: string;
//   game_id: string;
//   broadcaster_language: string;
//   title: string;
//   description?: string;
//   status?: string;
// }

// export interface ModifyChannelInformationQuery {
//   broadcaster_id: string;
//   status?: string;
//   game_id?: string;
//   broadcaster_language?: string;
//   title?: string;
//   description?: string;
// }

// export interface BroadcasterSubscriptionQuery {
//   broadcaster_id: string;
//   user_id?: repeatable;
// }

// export interface BroadcasterSubscriptionData {
//   broadcaster_id: string;
//   broadcaster_name: string;
//   is_gift: boolean;
//   tier: SubscriptionTier;
//   plan_name: string;
//   user_id: string;
//   user_name: string;
// }

// export interface AllStreamTagsQuery extends PaginationQuery {
//   tag_id?: repeatable;
// }

// export interface StreamTagData {
//   tag_id: string;
//   is_auto: boolean;
//   localization_names: map<string>;
//   localization_descriptions: map<string>;
// }

// export interface StreamTagsQuery {
//   broadcaster_id: string;
// }

// export interface ReplaceStreamTagBody {
//   tag_ids: string[];
// }

// export interface CreateUserFollowBody {
//   from_id: string;
//   to_id: string;
// }

// export interface CreateUserFollowQuery {
//   allow_notifications?: boolean;
// }

// export interface DeleteUserFollowQuery {
//   from_id: string;
//   to_id: string;
// }

// export interface UserQuery {
//   login?: repeatable;
//   id?: repeatable;
// }

// export interface UserData {
//   id: string;
//   login: string;
//   display_name: string;
//   type: string;
//   broadcaster_type: string;
//   description: string;
//   profile_image_url: string;
//   offline_image_url: string;
//   view_count: integer;
//   email: string;
// }

// export interface UserFollowsQuery {
//   from_id?: string;
//   to_id?: string;
// }

// export interface UserFollowData {
//   from_id: string;
//   from_name: string;
//   to_id: string;
//   to_name: string;
//   followed_at: string;
// }

// export interface UpdateUserQuery {
//   description?: string;
// }

// export interface ExtensionData {
//   id: string;
//   version: string;
//   name: string;
//   can_activate: boolean;
//   type: ExtensionType[];
// }

// export interface UserActiveExtensionQuery {
//   user_id?: string;
// }

// export interface DetailedExtensionData {
//   active: boolean;
//   id?: string;
//   version?: string;
//   name?: string;
//   x?: integer;
//   y?: integer;
// }

// export interface UserExtensionData {
//   panel: map<DetailedExtensionData>;
//   overlay: map<DetailedExtensionData>;
//   component: map<DetailedExtensionData>;
// }

// export interface UpdateUserExtensionBody {
//   data: UserExtensionData;
// }

// export interface VideoQuery extends PaginationQuery {
//   id?: repeatable;
//   user_id?: string;
//   game_id?: string;
//   language?: string;
//   period?: Period;
//   sort?: VideoSort;
//   type?: VideoTypeQuery;
// }

// export interface VideoData {
//   id: string;
//   user_id: string;
//   user_name: string;
//   title: string;
//   description: string;
//   created_at: string;
//   published_at: string;
//   url: string;
//   thumbnail_url: string;
//   viewable: Viewable;
//   view_count: integer;
//   language: string;
//   type: VideoType;
//   duration: string;
// }

// export interface WebhookSubscriptionData {
//   topic: string;
//   callback: string;
//   expires_at: string;
// }

// export interface HypeTrainEventsQuery extends PaginationQuery {
//   broadcaster_id: string;
//   id?: string;
//   cursor?: string;
// }

// export interface HypeTrainEventContribution {
//   total: integer;
//   type: string;
//   user: string;
// }

// export interface HypeTrainEventData {
//   broadcaster_id: string;
//   cooldown_end_time: string;
//   expires_at: string;
//   goal: integer;
//   id: string;
//   last_contribution: HypeTrainEventContribution;
//   level: integer;
//   started_at: string;
//   top_contributions: HypeTrainEventContribution[];
//   total: integer;
// }

// export interface HypeTrainEvent extends Omit<Event, "event_data"> {
//   event_data: HypeTrainEventData;
// }
