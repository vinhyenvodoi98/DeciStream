// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract Videos is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  mapping (string => uint256) private _tables;
  Counters.Counter private _tokenIdCounter;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);

    TablelandDeployments.get().mutate(
      address(this),
      _tables["Videos"],
      SQLHelpers.toInsert(
        "Videos",
        _tables["Videos"],
        "video_erc721_address,owner_address,tokenId",
        string.concat(
          SQLHelpers.quote(Strings.toHexString(address(this))),
          ",",
          SQLHelpers.quote(Strings.toHexString(address(msg.sender))),
          ",",
          Strings.toString(tokenId)
        )
      )
    );
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function updateTable(string memory tablePrefix, uint256 tableId) public onlyOwner {
    _tables[tablePrefix] = tableId;
  }

  function _transfer(address from, address to, uint256 tokenId) internal override virtual {
    super._transfer(from, to, tokenId);

    string memory setters = string.concat(
      "owner_address=",
      SQLHelpers.quote(Strings.toHexString(to)) // Wrap strings in single quotes
    );

    string memory filters = string.concat(
      "video_erc721_address=",
      SQLHelpers.quote(Strings.toHexString(address(this))),
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
}
