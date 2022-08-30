
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
                        console.log(x);
                        return;
                    }
                })
            });
        }  
    });
}


getPlayer("Kris Dunn");





// console.log(numOfPages);
