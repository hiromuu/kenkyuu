// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NarouToken.sol";

contract NarouNFT is ERC721, Ownable {
    NarouToken private narouToken;

    constructor(NarouToken _narouToken) ERC721("Narou NFT", "NAROUNFT") {
        narouToken = _narouToken;
    }

    function mintWithReward(
        address to,
        uint256 tokenId,
        uint256 rewardAmount
    ) public onlyOwner {
        _mint(to, tokenId);
        narouToken.mint(to, rewardAmount);
    }
}
