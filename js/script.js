window.onload = function(){
    const form = document.forms["research"];
    form.addEventListener("submit", search, false);
    document.querySelector("#alert").innerHTML = "";
}

// Init the search method to find the user we need
function search(e){
    e.preventDefault();
    
    var alert = document.querySelector("#alert");
    
    var xhttp = new XMLHttpRequest();
    const METHOD = "GET";
    const URL = "https://api.github.com/users/";

    xhttp.open(METHOD, URL + getUserToSearch(), true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            if (alert != null || alert != ""){
                alert.innerHTML = "";
                };
            var user = JSON.parse(xhttp.responseText);
            console.log(user);
            printOutput(user);
            getUserBtn(user);             
        }
        if(xhttp.status == 404){        
            var profile = document.querySelector(".user-container")
            if (profile != null || profile != ""){
                profile.innerHTML = "";
                };
            alert.innerHTML = "User not found, try with another";
        }
    }    
    
}

// Print the output with the user information
function printOutput(user){
    var profile = document.querySelector(".user-container");
            profile.innerHTML = `<div class="user-container">
                    <div class="user-name"><h3>${user.name}</h3></div>
                    <div class="user-flex">
                        <div class="img-user">
                            <img src="${user.avatar_url}">
                        </div>
                        <div class="info-user">
                            <p>Followers: ${user.followers} </p>
                            <p>Following: ${user.following} </p><p>Bio: ${user.bio} </p>
                            <button id="btn-user"> Visit GitHub </button>
                        </div>
                    </div>
                </div>`;
};

// Get user button to open the GitHub profile
function getUserBtn(user){
    const btnUser = document.querySelector("#btn-user");
    btnUser.addEventListener("click", function(){
         window.open(user.html_url,'_blank' );
    });
}

// Get user to search, if not found use the default one
function getUserToSearch(name = "giusetega"){
    var user = document.getElementById("username").value;
    return (user == null || user == "") ? name : user;
}