// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract Subcriptions is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;
  string private _customBaseURI;
  mapping (string => uint256) private _tables;

  constructor(string memory name, string memory symbol, string memory customBaseURI_) ERC721(name, symbol) {
    _customBaseURI = customBaseURI_;
  }

  function mint() external returns (uint256) {
    uint256 newTokenId = _tokenId.current();
    _mint(msg.sender, newTokenId);
    _tokenId.increment();

    TablelandDeployments.get().mutate(
      address(this),
      _tables["Subscriptions"],
      SQLHelpers.toInsert(
        "Subscriptions",
        _tables["Subscriptions"],
        "subscription_erc721_address,subscriber_address,tokenId",
        string.concat(
          SQLHelpers.quote(Strings.toHexString(address(this))),
          ",",
          SQLHelpers.quote(Strings.toHexString(address(msg.sender))),
          ",",
          Strings.toString(newTokenId)
        )
      )
    );

    return newTokenId;
  }

  function _baseURI() internal override view virtual returns (string memory) {
    return _customBaseURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    _requireMinted(tokenId);

    return _baseURI();
  }

  function updateTable(string memory tablePrefix, uint256 tableId) public onlyOwner {
    _tables[tablePrefix] = tableId;
  }

  function _transfer(address from, address to, uint256 tokenId) internal override virtual {
    super._transfer(from, to, tokenId);

    string memory setters = string.concat(
      "subscriber_address=",
      SQLHelpers.quote(Strings.toHexString(to)) // Wrap strings in single quotes
    );

    string memory filters = string.concat(
      "subscription_erc721_address=",
      SQLHelpers.quote(Strings.toHexString(address(this))),
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
}
