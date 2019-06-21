function isNode() {
  return typeof module !== 'undefined' && module.exports
}

class ExtendableProxy {
  constructor(getset={}) {
    return new Proxy(this, getset);
  }
}

class KrakenAPI extends ExtendableProxy {
  constructor(token) {
    super({
      get: function (kapi, func) {
        if (kapi[func] != null) return kapi[func]
        return function (...params) { return kapi.perform(func, ...params) }
      }
    })
    this.auth = token.replace('oauth:', '')
    this.url = 'https://api.twitch.tv'
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': `OAuth ${this.auth}`
    }
  }

  send(method, path, params) {
    var self = this
    return new Promise(function (resolve, reject) {
      var request = false
      if (isNode()) {
        request = require('xmlhttprequest').XMLHttpRequest
      } else {
        request = XMLHttpRequest
      }
      if (request) {
        var http_request = new request()
        http_request.open(method, self.url+path, true)
        for (var h in self.headers) {
          http_request.setRequestHeader(h, self.headers[h])
        }
        http_request.send(JSON.stringify(params))
        http_request.onreadystatechange = function () {
          if (http_request.readyState == 4) {
            if (Number(http_request.status.toString()[0]) == 2) {
              try {
                resolve(JSON.parse(http_request.responseText))
              } catch {
                resolve(http_request.responseText)
              }
            } else {
              try {
                reject(JSON.parse(http_request.responseText))
              } catch {
                reject(http_request.responseText)
              }
            }
          }
        }
      } else {
        reject('There was a problem importing the XMLHttpRequest class.')
      }
    })
  }

  perform(action, ...params) {
    const method = {
      // Bits
      getCheermotes: [`GET`, `/v5/bits/actions?${this.serialize(params[0])}`],
      // Channels
      getCurrentChannel: [`GET`, `/kraken/channel`],
      getChannel: [`GET`, `/kraken/channels/${params[0]}`],
      updateChannel: [`PUT`, `/kraken/channels/${params[0]}`, params[1]],
      getChannelEditors: [`GET`, `/kraken/channels/${params[0]}/editors`],
      getChannelFollowers: [`GET`, `/kraken/channels/${params[0]}/follows?${this.serialize(params[1])}`],
      getChannelTeams: [`GET`, `/kraken/channels/${params[0]}/teams`],
      getChannelSubscriptions: [`GET`, `/kraken/channels/${params[0]}/subscriptions?${this.serialize(params[1])}`],
      checkChannelSubsctiption: [`GET`, `/kraken/channels/${params[0]}/subscriptions/${params[1]}?${this.serialize(params[2])}`],
      getChannelVideos: [`GET`, `/kraken/channels/${params[0]}/videos?${this.serialize(params[1])}`],
      startChannelCommercial: [`POST`, `/kraken/channels/${params[0]}/commercial`, params[1]],
      resetChannelStreamKey: [`DELETE`, `/kraken/channels/${params[0]}/stream_key`],
      getChannelCommunities: [`GET`, `/kraken/channels/${params[0]}/communities`],
      setChannelCommunities: [`PUT`, `/kraken/channels/${params[0]}/communities`, params[1]],
      deleteChannelCommunities: [`PUT`, `/kraken/channels/${params[0]}/community`, params[1]],
      // Chat
      getChannelBadges: [`GET`, `/kraken/chat/${params[0]}/badges`],
      getChannelEmoticonsBySet: [`GET`, `/kraken/chat/${params[0]}/emoticon_images?${this.serialize(params[1])}`],
      getChannelEmoticons: [`GET`, `/kraken/chat/${params[0]}/emoticons`],
      getChannelRooms: [`GET`, `/kraken/chat/${params[0]}/rooms`],
      // Clips
      getClip: [`GET`, `/kraken/clips/${params[0]}`],
      getTopClips: [`GET`, `/kraken/clips/top?${this.serialize(params[0])}`],
      getFollowedClips: [`GET`, `/kraken/clips/followed?${this.serialize(params[0])}`],
      // Collection
      getCollectionMetadata: [`GET`, `/kraken/collections/${params[0]}`],
      getCollection: [`GET`, `/kraken/collections/${params[0]}/items?${this.serialize(params[1])}`],
      getChannelCollections: [`GET`, `/kraken/channels/${params[0]}/collections?${this.serialize(params[1])}`],
      createChannelCollection: [`POST`, `/kraken/channels/${params[0]}/collections`, params[1]],
      updateCollection: [`PUT`, `/kraken/collections/${params[0]}`, params[1]],
      createCollectionThumbnail: [`PUT`, `/kraken/collections/${params[0]}/thumbnail`, params[1]],
      deleteCollection: [`DELETE`, `/kraken/collections/${params[0]}`],
      addCollectionItem: [`POST`, `/kraken/collections/${params[0]}/items`, params[1]],
      deleteCollectionItem: [`DELETE`, `/kraken/collections/${params[0]}/items/${params[1]}`],
      moveCollectionItem: [`PUT`, `/kraken/collections/${params[0]}/items/${params[1]}`, params[2]],
      // Games
      getTopGames: [`GET`, `/kraken/games/top?${this.serialize(params[0])}`],
      // Ingest
      getMyChannel: [`GET`, `/kraken/ingests`],
      // Search
      searchChannels: [`GET`, `/kraken/search/channels?${this.serialize(params[0])}`],
      searchGames: [`GET`, `/kraken/search/games?${this.serialize(params[0])}`],
      searchStreams: [`GET`, `/kraken/search/streams?${this.serialize(params[0])}`],
      // Streams
      getStream: [`GET`, `/kraken/streams/${params[0]}`],
      getStreams: [`GET`, `/kraken/streams?${this.serialize(params[0])}`],
      getStreamsSummary: [`GET`, `/kraken/streams/summary?${this.serialize(params[0])}`],
      getFeaturedStreams: [`GET`, `/kraken/streams/featured?${this.serialize(params[0])}`],
      getFollowedStreams: [`GET`, `/kraken/streams/followed?${this.serialize(params[0])}`],
      // Teams
      getTeams: [`GET`, `/kraken/teams?${this.serialize(params[0])}`],
      getTeam: [`GET`, `/kraken/teams/${params[0]}`],
      // User
      getCurrentUser: [`GET`, `/kraken/user`],
      getUserById: [`GET`, `/kraken/users/${params[0]}`],
      getUser: [`GET`, `/kraken/users?${this.serialize(params[0])}`],
      getUserEmotes: [`GET`, `/kraken/users/${params[0]}/emotes`],
      checkUserSubsctiption: [`GET`, `/kraken/users/${params[0]}/subscriptions/${params[1]}`],
      getUserFollows: [`GET`, `/kraken/users/${params[0]}/follows/channels?${this.serialize(params[1])}`],
      checkUserFollow: [`GET`, `/kraken/users/${params[0]}/follows/channels/${params[1]}`],
      userFollowChannel: [`PUT`, `/kraken/users/${params[0]}/follows/channels/${params[1]}`, params[2]],
      userUnfollowChannel: [`DELETE`, `/kraken/users/${params[0]}/follows/channels/${params[1]}`],
      getUserBlocks: [`GET`, `/kraken/users/${params[0]}/blocks?${this.serialize(params[1])}`],
      userBlockUser: [`PUT`, `/kraken/users/${params[0]}/blocks/${params[1]}`],
      userUnlockUser: [`DELETE`, `/kraken/users/${params[0]}/blocks/${params[1]}`],
      createConnectionToVHS: [`PUT`, `/kraken/user/vhs`],
      checkConnectionToVHS: [`GET`, `/kraken/user/vhs`],
      deleteConnectionToVHS: [`DELETE`, `/kraken/user/vhs`],
      // Videos
      getVideo: [`GET`, `/kraken/videos/${params[0]}`],
      getTopVideos: [`GET`, `/kraken/videos/top?${this.serialize(params[0])}`],
      getFollowedVideos: [`GET`, `/kraken/videos/followed?${this.serialize(params[0])}`],
      createVideo: [`POST`, `/kraken/videos?${this.serialize(params[0])}`],
      updateVideo: [`PUT`, `/kraken/videos/${params[0]}?${this.serialize(params[0])}`],
      deleteVideo: [`DELETE`, `/kraken/videos/${params[0]}`],
    }

    if (method[action] == undefined) {
      console.log('Unknown method.')
      return
    }

    return this.send(...method[action])
  }

  setRequestHeader(header, value) {
    self.headers[header] = value
  }

  serialize(obj) {
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (obj[p].constructor.name == 'Array') {
          str.push(encodeURIComponent(p+'[]') + '=' + encodeURIComponent(obj[p]))
        } else {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
    }
    return str.join("&")
  }
}

if (isNode()) {
  module.exports = KrakenAPI
}