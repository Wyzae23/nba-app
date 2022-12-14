let main = 
{
    key: "https://www.balldontlie.io/api/v1/players?search=",

    getPlayer: function(name)
    {
        console.log(name);
        fetch(this.key + name)
        .then((response) => response.json())
        .then((data) => this.displayData(data));
    },

    displayData: function(data)
    {
        let player = data.data[0];
        let temp = document.getElementById("playerInfoTemplate").content;
        let tempHTML = document.importNode(temp, true);
        if(player.first_name != null)
        {
            tempHTML.querySelector(".player-name").textContent = "Name: " + player.first_name;
        }
        if(player.last_name != null)
        {
            tempHTML.querySelector(".player-name").textContent += (" " + player.last_name);
        }
        if(player.position != null)
        {
            tempHTML.querySelector(".position").textContent = "Position: " + player.position;
        }
        if(player.height_feet != null)
        {
            tempHTML.querySelector(".height").textContent = "Height: " + player.height_feet + " feet";
        }
        if(player.height_inches != null)
        {
            tempHTML.querySelector(".height").textContent += " " + player.height_inches + " inches";
        }
        if(player.weight != null)
        {
            tempHTML.querySelector(".weight").textContent = "Weight: " + player.weight_pounds;        
        }
        if(player.team.full_name != null)
        {
            tempHTML.querySelector(".team").textContent = "Team: " + player.team.full_name;
        }
        let playerInfoClass = document.getElementsByClassName("player-info")[0];
        playerInfoClass.innerHTML = "";
        let playerInfo = document.createElement('div');
        playerInfo.className="player-information";
        playerInfo.appendChild(tempHTML);
        playerInfoClass.appendChild(playerInfo);
        let playerId = player.id;
        this.getPlayerStats(playerId);
    },

    getPlayerStats: function(playerId)
    {
        fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerId)
        .then((response) => response.json())
        .then((data) => this.displayPlayerStats(data));
    },

    displayPlayerStats: function(data)
    {
        player = data.data[0];
        let ppg = player.pts;
        let rpg = player.reb;
        let apg = player.ast;
        let spg = player.stl;
        let bpg = player.blk;
        let threesPerGame = player.fg3m;
        let fgp = player.fg_pct;
        let ftp = player.ft_pct;
        let tpg = player.turnover;
        let temp = document.getElementById("playerStatsTemplate").content;
        let tempHTML = document.importNode(temp, true);
        if(ppg != null)
        {
            tempHTML.querySelector(".points-per-game").textContent = "Points Per Game: " + ppg;
        }
        if(rpg != null)
        {
            tempHTML.querySelector(".rebounds-per-game").textContent = "Rebounds Per Game : " + rpg;
        }
        if(apg != null)
        {
            tempHTML.querySelector(".assists-per-game").textContent = "Assists Per Game: " + apg;
        }
        if(spg != null)
        {
            tempHTML.querySelector(".steals-per-game").textContent = "Steals Per Game: " + spg;
        }
        if(bpg != null)
        {
            tempHTML.querySelector(".blocks-per-game").textContent = "Blocks Per Game: " + bpg;
        }
        if(threesPerGame != null)
        {
            tempHTML.querySelector(".threes-per-game").textContent = "Threes Per Game: " + threesPerGame;
        }
        if(fgp != null)
        {
            tempHTML.querySelector(".field-goal-percentage").textContent = "Field Goal Percentage: " + fgp;
        }
        if(ftp != null)
        {
            tempHTML.querySelector(".free-throw-percentage").textContent = "Free Throw Percentage: " + ftp;
        }
        if(tpg != null)
        {
            tempHTML.querySelector(".turnovers-per-game").textContent = "Turnovers Per Game: " + tpg;
        }
        let playerInfoClass = document.getElementsByClassName("player-info")[0];
        let playerStats = document.createElement('div');
        playerStats.className = "player-stats";
        playerStats.appendChild(tempHTML);
        playerInfoClass.appendChild(playerStats);
    },

    search: function()
    {
        let name = document.querySelector(".search-bar").value;
        let correctedName = "";
        for(let i = 0; i < name.length; i++)
        {
            if(name[i] == ' ')
            {
                correctedName += "+";
            }
            else
            {
                correctedName += name[i];
            }
        }
        this.getPlayer(correctedName);
    }
};




document.querySelector(".search button").addEventListener("click", function()
{
    main.search();
    document.getElementById("display-results").scrollIntoView({behavior: "smooth"});
});

/*
let getPlayer = function(name)
{
    fetch("https://www.balldontlie.io/api/v1/players?page=1&per_page=100")
    .then((response) => response.json())
    .then((page) => 
    {
        numOfPages = page.meta.total_pages;
        // console.log(numOfPages);
        for(let i = numOfPages-1; i <= numOfPages; i++)
        {
            fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${i}`)
            .then((responseCurr) => responseCurr.json())
            .then((pageCurr) => 
            {
                pageCurr.data.forEach((x, i) => 
                {
                    let fullName = x.first_name + " " + x.last_name;
                    if(name == fullName)
                    {

                        
                        let temp = document.getElementById("playerInfoTemplate").content;
                        let tempHTML = document.importNode(temp, true);
                        tempHTML.querySelector(".playerName").textContent = fullName;
                        tempHTML.querySelector(".position").textContent = x.position;
                        tempHTML.querySelector(".height-feet").textContent = x.height_feet;
                        tempHTML.querySelector(".height-inches").textContent = x.height_inches;
                        tempHTML.querySelector(".weight").textContent = x.weight;
                        tempHTML.querySelector(".team").textContent = x.team.full_name;
                        document.getElementsByClassName("playerInfo")[0].appendChild(tempHTML);
                        
                    }
                })
            });
        }  
    });
}
let playerName = null;
document.querySelector(".search button").addEventListener("click", function()
{
    document.getElementsByClassName("player-info")[0].textContent = "";
    document.querySelector(".player-info").classList.remove("invisible");
    playerName = document.querySelector(".search-bar").value;
    getPlayer(playerName);
});
*/






// console.log(numOfPages);
