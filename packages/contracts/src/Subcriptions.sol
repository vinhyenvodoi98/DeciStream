// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Master.sol";

contract Subcriptions is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;
  string private _customBaseURI;
  address private _masterAddress;

  constructor(string memory name, string memory symbol, string memory customBaseURI_) ERC721(name, symbol) {
    _customBaseURI = customBaseURI_;
    _masterAddress = msg.sender;
  }

  function mint() external {
    uint256 newTokenId = _tokenId.current();
    _mint(msg.sender, newTokenId);
    _tokenId.increment();

    Master(_masterAddress).insertSubcription(address(this), msg.sender, newTokenId);
    Master(_masterAddress).newSubsribeNotify(owner(), msg.sender);
  }

  function _baseURI() internal override view virtual returns (string memory) {
    return _customBaseURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    _requireMinted(tokenId);

    return _baseURI();
  }

  function _transfer(address from, address to, uint256 tokenId) internal override virtual {
    super._transfer(from, to, tokenId);

    Master(_masterAddress).updateSubcription(address(this), to, tokenId);
  }
}
