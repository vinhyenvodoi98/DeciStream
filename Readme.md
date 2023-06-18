<h1 align="center">DeciStream 👋</h1>
<p>
  <img src="https://github.com/vinhyenvodoi98/DeciStream/blob/master/images/cover.png" />
</p>

# Description

## General
DeciStream is a multiParticipates Streaming platform inspired by "Twitter Spaces" or "Joe Rogan Experience" streams. where streamers can participate in making content for the stream such as discussing an interesting topic.

DeciStream focuses on decentralized values. For example, each channel is an erc721 when a subscriber will be minted an erc721 token to be able to participate in that channel's DAO activities such as voting for the next stream participant. Besides the video is also the erc721 that owned by the content creator.
## Function
- [x] Integrated ENS (Ethereum name service)
- [x] Send and Receive notifications from Push protocol (Ethereum Push Notification Service)
- [x] Streamer can create Channel
- [x] Subscribe to interesting channels
- [x] Create Stream
- [x] Invite others to join the stream as **participants** (multiParticipates Streaming)
- [x] Release that stream for others to join as **spectators**
- [x] Export video to erc721
---
### Future function
- [ ] Create channel's DAO ( 50% done)
- [ ] Add **Chat** feature using Push Protocol
- [ ] Release streams only for channel subscribers
- ...

# Tech behind
## Stream Platform ( [LivePeer](https://docs.livepeer.org/) )
I use /room and /stream feature to be able to create multi-participant streams

## Database ( [tableLand](https://tableland.xyz/) )

<img src="https://github.com/vinhyenvodoi98/DeciStream/blob/master/images/database.png" />

I use 4 tables namely Channels, Steams, Videos, Subscriptions.
- The Channels table will store the user's address and the address of the smartcontract video and subscription.
- The Stream table will store the backplayId and streamId values that are needed by the livePeer to be able to watch the stream.
- Videos table to store Video NFT values including video_erc721_address, owner_address and tokenId
- Subscriptions table stores NFTs representing channel subscribers

### How i update table
To ensure the correctness of the data in the database i added functions to ERC721 so that whenever nft is minted or transferred, it updates their value in the table.

File: Master.sol
```Master.sol

  ...

  function insertSubcription(address erc721contract, address subscriberAddress ,uint256 newTokenId) external onlySubcriptions {
    TablelandDeployments.get().mutate(
      address(this),
      _tables["Subscriptions"],
      SQLHelpers.toInsert(
        "Subscriptions",
        _tables["Subscriptions"],
        "subscription_erc721_address,subscriber_address,tokenId",
        string.concat(
          SQLHelpers.quote(Strings.toHexString(erc721contract)),
          ",",
          SQLHelpers.quote(Strings.toHexString(subscriberAddress)),
          ",",
          Strings.toString(newTokenId)
        )
      )
    );
  }

  function updateSubcription(address erc721contract, address to, uint256 tokenId) external onlySubcriptions {
    string memory setters = string.concat(
      "subscriber_address=",
      SQLHelpers.quote(Strings.toHexString(to)) // Wrap strings in single quotes
    );

    string memory filters = string.concat(
      "subscription_erc721_address=",
      SQLHelpers.quote(Strings.toHexString(erc721contract)),
      "and tokenId=",
      Strings.toString(tokenId)
    );

    TablelandDeployments.get().mutate(
      address(this),
      _tables["Subscriptions"],
      SQLHelpers.toUpdate(
        "Subscriptions",
        _tables["Subscriptions"],
        setters,
        filters
      )
    );
  }
  ...

```

File: Subcriptions.sol
```Subcriptions.sol
  ...
  function mint() external {
    uint256 newTokenId = _tokenId.current();
    _mint(msg.sender, newTokenId);
    _tokenId.increment();

    Master(_masterAddress).insertSubcription(address(this), msg.sender, newTokenId);
    ....
  }

  function _transfer(address from, address to, uint256 tokenId) internal override virtual {
    super._transfer(from, to, tokenId);

    Master(_masterAddress).updateSubcription(address(this), to, tokenId);
  }
  ...
```

## Notification ( [Push protocol](https://push.org/) )
I am using notification feature from push protocol

Currently I'm using 2 notification templates

- Notice new subscriber to the channel
- Notice someone invited to join the stream

## Naming ( [ENS](https://app.ens.domains/) )
To make accounts more readable i use ens.
If an account already owns ENS, it will display Ens avatar and Ens name instead of wallet address

## Storage ( [nft.storage](https://nft.storage/) )
I use storage video and metadata of Nft
