// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./Subcriptions.sol";
import "./Videos.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract Master is Ownable {
  mapping (string => uint256) private _tables;

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

    Videos video = new Videos(name, symbol);
    video.transferOwnership(msg.sender);

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

  function getTableId (string memory name) public view onlyOwner returns (uint256) {
    return _tables[name];
  }

  function getTableMetadata (string memory tablePrefix) public view onlyOwner returns (string memory) {
    return SQLHelpers.toNameFromId(tablePrefix, _tables[tablePrefix]);
  }
}