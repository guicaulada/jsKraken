export type integer = number;
export type float = number;

export type repeatable = id | id[];

export type map<T> = {
  [key: string]: T;
};

export type id = string | integer;

export type RFC3339 = string;

export type CheermoteBackground = "light" | "dark";

export type CheermoteScale = "1" | "1.5" | "2" | "3" | "4";

export type CheermoteState = "static" | "animated";

export type VideoSort = "views" | "time";

export type BroadcastType = "all" | "archive" | "highlight" | "upload";

export type CommercialLength = 30 | 60 | 90 | 120 | 150 | 180;

export type Period = "all" | "day" | "week" | "month";

export type LongPeriod = "all" | "week" | "month";

export type StreamType = "live" | "playlist" | "all";

export type Direction = "asc" | "desc";

export type UserFollowSort = "created_at" | "last_broadcast" | "login";

export type Viewable = "private" | "public";

export enum SubscriptionTier {
  "Tier 1" = "1000",
  "Tier 2" = "2000",
  "Tier 3" = "3000",
}

export interface PaginationQuery {
  limit?: integer;
  offset?: integer;
  cursor?: string;
  direction?: Direction;
}

export interface Pagination {
  _cursor?: string;
  _total?: integer;
}

export interface CheermotesQuery {
  channel_id?: id;
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
  delay?: integer;
  channel_feed_enabled?: boolean;
}

export interface UpdateChannelBody {
  channel: UpdateChannelData;
}

export interface User {
  _id: id;
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
}

export interface ChannelFollow extends Follow {
  user: User;
}

export interface ChannelFollows extends Pagination {
  follows: ChannelFollow[];
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
}

export interface ChannelSubscription extends Subscription {
  user: User;
}

export interface ChannelSubscriptions extends Pagination {
  subscriptions: ChannelSubscription[];
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

export interface MutedSegment {
  duration: integer;
  offset: integer;
}

export interface Video {
  _id: string;
  broadcast_id: integer;
  broadcast_type: string;
  channel: VideoChannel;
  created_at: string;
  description: string;
  description_html: string;
  fps: map<float>;
  game: string;
  language: string;
  length: integer;
  muted_segments?: MutedSegment[];
  preview: Thumbnails;
  published_at: string;
  resolutions: map<string>;
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
  emotesets?: integer[];
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
  images: EmoticonImage;
}

export interface SelfLink {
  self: string;
}

export interface Emoticons {
  _links: SelfLink;
  emoticons: Emoticon[];
}

export interface ClipUser {
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
  broadcaster: ClipUser;
  curator: ClipUser;
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
  owner: User;
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
  owner: User;
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
  containing_item?: string;
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

export interface TopGame extends StreamsSummary {
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

export interface StreamQuery {
  stream_type?: StreamType;
}

export interface ChannelStream {
  stream?: Stream;
}

export interface LiveStreamQuery extends PaginationQuery, StreamQuery {
  channel?: repeatable;
  game?: string;
  language?: string;
}

export interface StreamsSummaryQuery {
  game?: string;
}

export interface StreamsSummary {
  channels: integer;
  viewers: integer;
}

export interface FeaturedStream {
  image: string;
  priority: integer;
  scheduled: boolean;
  sponsored: boolean;
  stream: Stream;
  text: string;
  title: string;
}

export interface FeaturedStreams {
  featured: FeaturedStream[];
}

export interface FollowedStreamQuery extends PaginationQuery, StreamQuery {}

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
  users?: Channel[];
}

export interface Teams {
  teams: Team[];
}

export interface Notifications {
  email: boolean;
  push: boolean;
}

export interface CurrentUser {
  _id: integer;
  bio: string;
  created_at: string;
  display_name: string;
  email: string;
  email_verified: boolean;
  logo: string;
  name: string;
  notifications: Notifications;
  partnered: boolean;
  twitter_connected: boolean;
  type: string;
  updated_at: string;
}

export interface UserQuery {
  login: repeatable;
}

export interface Users extends Pagination {
  users: User[];
}

export interface UserSubscription extends Subscription {
  channel: Channel;
}

export interface UserFollow extends Follow {
  channel: Channel;
}

export interface UserFollows extends Pagination {
  follows: UserFollow[];
}

export interface UserFollowsQuery extends PaginationQuery {
  sortby: UserFollowSort;
}

export interface FollowChannelBody {
  notifications: boolean;
}

export interface UserBlock {
  _id?: integer;
  updated_at?: string;
  user: User;
}

export interface UserBlocks extends Pagination {
  blocks: UserBlock[];
}

export interface VHS {
  identifier: string;
}

export interface TopVideosQuery extends VideosQuery {
  game?: string;
  period?: LongPeriod;
}

export interface Vods {
  vods: Video[];
}

export interface CreateVideoQuery {
  channel_id: id;
  title: string;
  description?: string;
  game?: string;
  language?: string;
  tag_list?: repeatable;
  viewable?: Viewable;
  viewable_at?: RFC3339;
}

export interface Upload {
  token: string;
  url: string;
}

export interface CreatedVideo {
  upload: Upload;
  video: Video;
}

export interface UploadVideoQuery {
  upload_token: string;
}

export interface UploadVideoPartQuery extends UploadVideoQuery {
  part: integer;
}

export interface UpdateVideoQuery {
  title?: string;
  description?: string;
  game?: string;
  language?: string;
  tag_list?: repeatable;
}

export interface DeletedVideo {
  ok: boolean;
}
