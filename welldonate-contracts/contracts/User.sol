// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Welldonation {

    struct User {
        address userAddress;
        string name;
        string email;
        string password;
        string profilePicture;
        uint256[] campaignsCreated;
        uint256[] campaignsDonated;
        uint256[] donationAmount;
        bool isAuthenticated;
        uint256 registrationTimestamp;
    }

    struct Donation {
        uint256 campaignId;
        uint256 donationAmount;
    }

    mapping(address => User) public users;

    // Event emitted when a new user is registered
    event UserRegistered(address indexed userAddress);

    // Event emitted when a user updates their profile picture
    event UserProfilePictureUpdated(address indexed userAddress);

    // Event emitted when a user donates to a campaign
    event DonationAdded(address indexed userAddress, uint256 indexed campaignId, uint256 amount);

    // Event emitted when a user is deleted
    event UserDeleted(address indexed userAddress);

    // Event emmited when a user changes their password
    event PasswordChanged(address indexed userAddress);

    // Function to register a new user
    function registerUser(
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _profilePicture
    ) public {
        require(users[msg.sender].userAddress == address(0x0), "User already registered");

        User memory newUser = User({
            userAddress: msg.sender,
            name: _name,
            email: _email,
            password: _password,
            profilePicture: _profilePicture,
            campaignsDonated: new uint256[](0),
            campaignsCreated: new uint256[](0),
            donationAmount: new uint256[](0),
            isAuthenticated: false,
            registrationTimestamp: block.timestamp
        });

        users[msg.sender] = newUser;
        
        emit UserRegistered(msg.sender);
    }

    // Function to get user details
    function getUserDetails(address _userAddress)
        public
        view
        returns (
            address userAddress,
            string memory name,
            string memory email,
            string memory profilePicture,
            uint256[] memory campaignsDonated,
            uint256[] memory campaignsCreated,
            uint256[] memory donationAmount,
            bool isAuthenticated,
            uint256 registrationTimestamp
        )
    {
        User storage user = users[_userAddress];

        return (
            user.userAddress,
            user.name,
            user.email,
            user.profilePicture,
            user.campaignsDonated,
            user.campaignsCreated,
            user.donationAmount,    
            user.isAuthenticated,
            user.registrationTimestamp
        );
    }

    // Function to authenticate user
    function authenticateUser(string memory _password) 
    public view returns (bool) {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");

        return (keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(user.password)));
    }

    // Function to add a donation to user's donation history
    function addDonation(uint256 _campaignId, uint256 _amount) 
    public {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");
        user.donationAmount.push(_amount);
        user.campaignsDonated.push(_campaignId);
        emit DonationAdded(msg.sender, _campaignId, _amount);
    }

    // Function to get user's created campaigns
    function getCreatedCampaigns() 
    public view returns (uint256[] memory) {
        return users[msg.sender].campaignsCreated;
    }

    // Function to delete user account and associated data
    function deleteUser() 
    public {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");
        address userAddress = user.userAddress;
        delete users[userAddress];
        emit UserDeleted(userAddress);
    }

    // Function to update user profile picture
    function updateProfilePicture(string memory _profilePicture) 
    public {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");
        user.profilePicture = _profilePicture;
        emit UserProfilePictureUpdated(msg.sender);
    }

    function changePassword(string memory newPassword) 
    public {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");
        user.password = newPassword;
        emit PasswordChanged(msg.sender);
    }

    function getDonatedCampaignsWithAmount() 
    public view returns (Donation[] memory) {
        User storage user = users[msg.sender];
        require(user.userAddress != address(0), "User not registered");
        uint256 numDonations = user.campaignsDonated.length;
        Donation[] memory donations = new Donation[](numDonations);
        for (uint256 i = 0; i < numDonations; i++) {
            uint256 campaignId = user.campaignsDonated[i];
            uint256 donationAmount = user.donationAmount[i];
            donations[i] = Donation(campaignId, donationAmount);
        }

        return donations;
    }
}