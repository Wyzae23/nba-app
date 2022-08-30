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
        tempHTML.querySelector(".player-name").textContent = player.first_name + " " + player.last_name;
        tempHTML.querySelector(".position").textContent = player.position;
        tempHTML.querySelector(".height-feet").textContent = player.height_feet;
        tempHTML.querySelector(".height-inches").textContent = player.height_inches;
        tempHTML.querySelector(".weight").textContent = player.weight_pounds;
        tempHTML.querySelector(".team").textContent = player.team.full_name;
        let playerInfoClass = document.getElementsByClassName("player-info")[0];
        playerInfoClass.classList.remove("invisible");
        playerInfoClass.innerHTML = "";
        playerInfoClass.appendChild(tempHTML);
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
