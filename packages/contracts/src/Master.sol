// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./Subcriptions.sol";
import "./Videos.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract Master is Ownable {
  mapping (string => uint256) private _tables;
  mapping (address => bool) private _subcriptionsAddresses;
  mapping (address => bool) private _videosAddresses;

  modifier onlySubcriptions() {
    require(_subcriptionsAddresses[msg.sender], "Caller is not subcriptions");
    _;
  }

  modifier onlyVideos() {
    require(_videosAddresses[msg.sender], "Caller is not videos");
    _;
  }

  constructor() {
    string memory subscriptionsDb = "Subscriptions";
    // Make sure we can get table_id back from calling `create`
    uint256 subscriptionsTableId = TablelandDeployments.get().create(
        address(this),
        SQLHelpers.toCreateFromSchema(
            "subscription_erc721_address text,"
            "subscriber_address text," // Notice the trailing comma
            "tokenId integer",
            subscriptionsDb
        )
    );
    _tables[subscriptionsDb] = subscriptionsTableId;

    string memory videosDb = "Videos";
    // Make sure we can get table_id back from calling `create`
    uint256 videosTableId = TablelandDeployments.get().create(
        address(this),
        SQLHelpers.toCreateFromSchema(
            "video_erc721_address text,"
            "owner_address text,"
            "tokenId integer",
            videosDb
        )
    );
    _tables[videosDb] = videosTableId;

    string memory channels= "Channels";
    // Make sure we can get table_id back from calling `create`
    uint256 channelsTableId = TablelandDeployments.get().create(
        address(this),
        SQLHelpers.toCreateFromSchema(
            "user_address text," // Notice the trailing comma
            "subscription_erc721_address text,"
            "video_erc721_address text",
            channels
        )
    );
    _tables[channels] = channelsTableId;
  }

  function createChannel(string memory name, string memory symbol, string memory uri) external {
    Subcriptions sub = new Subcriptions(name, symbol, uri);
    sub.transferOwnership(msg.sender);
    _subcriptionsAddresses[address(sub)] = true;

    Videos video = new Videos(name, symbol);
    video.transferOwnership(msg.sender);
    _subcriptionsAddresses[address(video)] = true;

    TablelandDeployments.get().mutate(
      address(this),
      _tables["Channels"],
      SQLHelpers.toInsert(
        "Channels",
        _tables["Channels"],
        "user_address,subscription_erc721_address,video_erc721_address",
        string.concat(
          SQLHelpers.quote(Strings.toHexString(msg.sender)),
          ",",
          SQLHelpers.quote(Strings.toHexString(address(sub))),
          ",",
          SQLHelpers.quote(Strings.toHexString(address(video)))
        )
      )
    );
  }

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

  function insertVideo(address erc721contract, address ownerAddress, uint256 newTokenId) external onlyVideos {
    TablelandDeployments.get().mutate(
      address(this),
      _tables["Videos"],
      SQLHelpers.toInsert(
        "Videos",
        _tables["Videos"],
        "video_erc721_address,owner_address,tokenId",
        string.concat(
          SQLHelpers.quote(Strings.toHexString(erc721contract)),
          ",",
          SQLHelpers.quote(Strings.toHexString(ownerAddress)),
          ",",
          Strings.toString(newTokenId)
        )
      )
    );
  }

  function updateVideo(address erc721contract, address to, uint256 tokenId) external onlyVideos {
    string memory setters = string.concat(
      "owner_address=",
      SQLHelpers.quote(Strings.toHexString(to)) // Wrap strings in single quotes
    );

    string memory filters = string.concat(
      "video_erc721_address=",
      SQLHelpers.quote(Strings.toHexString(erc721contract)),
      "and tokenId=",
      Strings.toString(tokenId)
    );

    TablelandDeployments.get().mutate(
      address(this),
      _tables["Videos"],
      SQLHelpers.toUpdate(
        "Videos",
        _tables["Videos"],
        setters,
        filters
      )
    );
  }

  function getTableId (string memory name) public view onlyOwner returns (uint256) {
    return _tables[name];
  }

  function getTableMetadata (string memory tablePrefix) public view onlyOwner returns (string memory) {
    return SQLHelpers.toNameFromId(tablePrefix, _tables[tablePrefix]);
  }
}