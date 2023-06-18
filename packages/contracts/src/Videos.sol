// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Master.sol";

contract Videos is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  mapping (string => uint256) private _tables;
  Counters.Counter private _tokenIdCounter;
  address private _masterAddress;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    _masterAddress = msg.sender;
  }

  function safeMint(string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);

    Master(_masterAddress).insertVideo(address(this), msg.sender, tokenId);
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

    Master(_masterAddress).updateVideo(address(this), to, tokenId);
  }
}
