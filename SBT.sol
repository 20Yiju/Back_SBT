// ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract SBT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3 Club Tour", "W3CT") {}

     // Mapping from token ID to locked status
    mapping(uint256 => bool) _locked;

    // Mapping owner address to token count 
    mapping(address => uint256) private _balances;

    /// @notice Emitted when the locking status is changed to locked.
    /// @dev If a token is minted and the status is locked, this event should be emitted.
    /// @param tokenId The identifier for a token.
    event Locked(uint256 tokenId);

    /// @notice Returns the locking status of an Soulbound Token
    /// @dev SBTs assigned to zero address are considered invalid, and queries
    /// about them do throw.
    /// @param tokenId The identifier for an SBT.
    function locked(uint256 tokenId) external view returns (bool) {
        //require(ownerOf(tokenId) != address(0));
        return _locked[tokenId];
    }
    
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _locked[tokenId] = true;
        emit Locked(tokenId);
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    modifier IsTransferAllowed(uint256 tokenId) {
        require(_locked[tokenId] == false, "Not allowed to transfer token");
        _;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

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

    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        return tokenOfOwnerByIndex(owner, index);
    }

    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    function getTotalTokenIdFromOwner(address owner) public view returns (uint256[] memory) {
        uint256 totalToken = _tokenIdCounter.current();
        uint256[] memory tokenIds = new uint256[](totalToken);
        uint256 j = 0;

        for (uint256 i = 0; i < totalToken; i++) {
            if(owner == ownerOf(i)){
                tokenIds[j] = i;
                j++;
            } 
            
        }

        return tokenIds;
    }

}
