// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Welldonation {
    
    struct Campaign {
        uint256 campaignId;
        address campaignCreator;
        string campaignName;
        string campaignDescription;
        uint256 fundraisingGoal;
        uint256 currentFundsRaised;
        bool isActive;
        string[] mediaContent;
        address[] donorsList;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public totalCampaigns = 0;

    // Event emitted when a campaign created
    event CampaignCreated(uint256 campaignId, address indexed campaignCreator);

    // Event emited when donation received
    event AmountDonated(uint256 indexed campaignId, uint256 amount);

    // Function to create new campaign
    function createCampaign(
        string memory _campaignName,
        string memory _campaignDescription,
        uint256 _fundraisingGoal,
        string[] memory _mediaContent
    ) public returns (uint256 campaignId) {
        totalCampaigns++;
        campaignId = totalCampaigns;

        Campaign memory newCampaign = Campaign({
            campaignId: campaignId,
            campaignCreator: msg.sender,
            campaignName: _campaignName,
            campaignDescription: _campaignDescription,
            fundraisingGoal: _fundraisingGoal,
            currentFundsRaised: 0,
            isActive: true,
            mediaContent: _mediaContent,
            donorsList: new address[](0)
        });

        campaigns[campaignId] = newCampaign;

        emit CampaignCreated(campaignId, msg.sender);
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _campaignId) public payable {
        require(campaigns[_campaignId].isActive, "Campaign is not active");

        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_campaignId];
        (bool sent,) = payable(campaign.campaignCreator).call{value: amount}("");

        if (sent) {
            campaigns[_campaignId].currentFundsRaised += msg.value;
            campaigns[_campaignId].donorsList.push(msg.sender);
        }

        emit AmountDonated(_campaignId, amount);
    }

    // Function to get campaign details
    function getCampaignDetails(uint256 _campaignId)
        public view returns (
            uint256 campaignId,
            address campaignCreator,
            string memory campaignName,
            string memory campaignDescription,
            uint256 fundraisingGoal,
            uint256 currentFundsRaised,
            bool isActive,
            string[] memory mediaContent,
            address[] memory donorsList
        )
    {
        Campaign storage campaign = campaigns[_campaignId];

        return (
            campaign.campaignId,
            campaign.campaignCreator,
            campaign.campaignName,
            campaign.campaignDescription,
            campaign.fundraisingGoal,
            campaign.currentFundsRaised,
            campaign.isActive,
            campaign.mediaContent,
            campaign.donorsList
        );
    }

    // Function to get all donors
    function getDonors(uint256 _campaignId)
    public view returns (
        address[] memory donorsList
    ) {
        return campaigns[_campaignId].donorsList;
    }

    // Function to get all campaigns
    function getCampaigns()
    public view returns (
        Campaign[] memory 
    ) {
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns);
        for (uint256 i = 1; i <= totalCampaigns; i++) {
            allCampaigns[i - 1] = campaigns[i];
        }

        return allCampaigns;
    }

    // Function to get active campaigns
    function getActiveCampaigns()
    public view returns (
        Campaign[] memory
    ) {
        uint256 totalActiveCampaigns = 0;
        for (uint256 i = 1; i <= totalCampaigns; i++) {
            if (campaigns[i].isActive) {
                totalActiveCampaigns++;
            }
        }

        Campaign[] memory activeCampaigns = new Campaign[](totalActiveCampaigns);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= totalActiveCampaigns; i++) {
            if (campaigns[i].isActive) {
                activeCampaigns[currentIndex] = campaigns[i];
                currentIndex++;
            }
        }

        return activeCampaigns;
    }

}