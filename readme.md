#Tank App
##Readme

Sprint 1 - Basic functionality
	This app was inspired by a few other 3rd party sites that use the World of Tanks API to give players support and in depth information into both in game vehicle statistics and player rating information. The primary website provided by Wargaming is notoriously insuffiencent. In it's first iteration, I wanted to make an app that would primary show vehicles statistics information. However, once I realized that the API data was slightly most limited than I had hoped, this feature alone would be a but simplistic. I added this feature to my site in the first day and a half of my project, and decided to spend more time on player stats.

	Adding the vehicle information required making a database table with the tanks' basic information, including a tank_id number, then making the API calls. The tank_id from the db gets used to call API information on the tanks more detailed statistics, in things called packages and modules. These packages show the various upgrades for all the tanks in a Materialize Collapsible. This dropdown display makes it easy to display what could  be hundreds of lines of data. Also, because there are 600+ tanks, so of which have 7 or 8 different packages, this data is called from the API upon each page load, but stored in a database.

	The other half of the site's functionality comes from player data. Like the tanks, two seperate API calls are made. One uses the player name to search and it returns a player's account_id. This id is then used as a key to call the API that returns player data. Multiple APIs are used to find various player data. The first is an API that returns the over stats for the player's career. These basic stats can be viewed on the player's career-stats page.

	The more indepth player statistics I was originally going focus on is a third party calculated score that is widely accepted in the community called wn8. This calculation is used on various other sites, like wotinfo.net. I realized that I did not want to so redirectly replicate what these other sites already offer, so on the third day of this project I needed to brainstorm and come up with a pivot. Something that would offer value to the player not already provided by other sites. 

	The feature I decide would bring real value to the world of tanks commmunity was to show players' tanks that they are actively grinding. This is a huge part of the game. Players must play a tank of a certain tier to accure XP to unlock the tank of the next tier. This is a core game element, and one that can cause lots of anxiety. Often players must spend hours playing a tank that is weak, not fully upgraded, or simply not the tank someone wants to be playing. The best way to aleviate this trouble is for players to team up with friends in game and play together is what is called a platoon. By displaying a player's vehicles that have been played within the last two weeks, have a subsequent tank, and have a subsequent tank that have not been played by that player, you can provide a relatively accurate view of the tanks a player is actively "grinding."

	So at this point, the player's statistics have three features show on three page views. There is an overall view of the player under career statistics. Here, things like winrate and player rating give you a snap shot of the player's performance. Then there is the "Recently Played Vehicles" page. This display actually shows you all the tanks the player has ever played, but it shows them in chronological order of what was last played. This feature is important if you want to platoon with someone in a certain tank because lots of tanks in game do not have a subsequent tank. Finally, there is the "Current Grind List" page. This page looks and feels just like the other display lists, but the backend functionality to narrow down to these tanks requires two different database calls along with the API calls and about 100 lines of code. This page may appear simplistic to the user, but it ended up being the bulk of my project.

	As for styling, I wanted to use Materialize to make the site appear professional, slick, and simple. I decided to make the site feel very mobile oriented, since most players access these type of site from their phone while using their xbox. This mobile-first design was accomplished by removing and small mouse-click button 

2. Wed, Thurs
	MVP & basic styling

3. Friday through the weekend
	readme, stretch goals

Day 3
I need to display all tanks that a user has played in the last two weeks, identify the next tanks in the tech tree, and establish that they have zero games in the next tank.


TODO
Sort Grind tanks
Add header explaing grind tanks
create dead end page load for grind tanks
??? Create route for tier 10s???
Figure out how to load tanks list based on some criteria instead of all three
Create deadend/redirect for no tanks found
Create deadend/redirect for no players found

