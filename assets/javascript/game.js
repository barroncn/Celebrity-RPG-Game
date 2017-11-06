$(document).ready(function() {
    
// This object holds the information we need to play the game and initializes 
// many of the variables we'll use.
var players = {
    name: ["#bruce", "#harrison", "#arnold", "#sylvester", "#wesley"],
    health: [207, 206, 210, 205, 204],
    defence: [16, 10, 19, 15, 8],
    attack: [6, 8, 5, 7, 9],
    color: ["#blue", "#orange", "#yellow", "#green", "#red"],
    isPlayer: true, //This will allow us to check whether the user has picked their own character
    finishGame: false, //This will allow us to check whether the opponent has been pickec
    theOpp: null, //This will be the opponents health read from the stats box
    theUser: null, //This will be the user's health read from the stats box
    multiplier: 1,
    oppIndex: null, //This will be the index of the opponent within the arrays
    userIndex: null, //This will be the index of the user within the arrays
    winsCount: 0, //This allows us to keep count of how many opponents have been faced so we'll know when to end the game
    theIndexesUser: function(){ // This function sets the index of the user
            this.theUser = $("#uh").text();
            this.userIndex = this.health.indexOf(parseInt(this.theUser, 10));
    },
    
    //This function sets the index of the opponent
    theIndexesOpp: function(){ 
            this.theOpp = $("#oh").text();
            this.oppIndex = this.health.indexOf(parseInt(this.theOpp, 10));
    },
      
      
    //This function sets our players. The first player clicked is the users player and the index is set
    //The second player clicked is the opponent and the index is set. THe names and stats are moved to the stats box.        
    setPlayers: function(name){ 
            var theIndex = this.name.indexOf(name);
            var newName = $(this.color[theIndex]).clone();
        
            if(this.isPlayer === true){
            $(this.name[theIndex]).appendTo("#user-pic");
            $("#user-name").html(newName);
            $(this.color[theIndex]).css("opacity", .3);
            $("#uh").text(this.health[theIndex]);
            $("#upp").remove();
            this.isPlayer = false;
            this.theIndexesUser();
            }
        
            else if (this.finishGame === false){
            $(this.name[theIndex]).appendTo("#opponent-pic");
            $("#opp-name").html(newName);
            $(this.color[theIndex]).css("opacity", .3);
            $("#oh").text(this.health[theIndex]);
            $("#opp").remove();
            this.finishGame = true;
            this.theIndexesOpp(); 
            }
    },
    
    //This function changes the scores when the attack button is clicked.           
    clickAttack: function(){ 
            if (this.isPlayer === false && this.finishGame === true && parseInt($("#oh").text()) != 0 && parseInt($("#uh").text()) != 0){
                var userPower = this.attack[this.userIndex] * this.multiplier;
                this.multiplier ++;
                var userHealth = (parseInt($("#uh").text()) - this.defence[this.oppIndex]);
                var oppHealth = (parseInt($("#oh").text()) - userPower);
                $("#uh").html(Math.max(0, userHealth));
                $("#oh").html(Math.max(0, oppHealth));
                $("#up").html(userPower);
                $("#op").html(this.defence[this.oppIndex]);
            }
            
            //This allows the score to update before the alert pops up indicating whether the user has won or lost
            setTimeout(function(){                     
                        checkScore();
                        }, 500);
    },
};

// Click on Bruce Willis
$("#bruce").on("click", function(){
    players.setPlayers("#bruce");
});

// Click on Harrison Ford
$("#harrison").on("click", function(){
    players.setPlayers("#harrison");
});

// Click on Arnold Schwarzenegger
$("#arnold").on("click", function(){
     players.setPlayers("#arnold");
});

// Click on Sylvester Stalone
$("#sylvester").on("click", function(){
     players.setPlayers("#sylvester");
});

// Click on Wesley Snipes
$("#wesley").on("click", function(){
     players.setPlayers("#wesley");
});

$("#attackbutton").on("click", function(){
    players.clickAttack();
});

// Save the original state of the the following divs
var originalStateCharacter = $("#character-home").clone(true);
var originalStateMain = $("#main-game").clone(true);
var originalStateOppPic = $("#opponent-pic").clone(true);
var originalStateOppStats = $("#oppStats").clone(true);

// Restore to original state
function reSet(){
    $("#character-home").replaceWith(originalStateCharacter.clone(true));
    $("#main-game").replaceWith(originalStateMain.clone(true));
    players.isPlayer = true;
    players.finishGame = false;
    players.multiplier = 1;
    players.winsCount = 0;
}

// Restore opponent after he's lost
function resetOpp(){
    $("#opponent-pic").replaceWith(originalStateOppPic.clone(true));
    $("#oppStats").replaceWith(originalStateOppStats.clone(true));
    players.finishGame = false;
    players.winsCount++;
    
}
// Checks the score to see if the player has won lost or tied
function checkScore(){
    // We'll count a tie as a loss for the user.
    if(parseInt($("#oh").text()) === 0 && parseInt($("#uh").text()) === 0){
        alert("He just barely got the best of you! Try again!");
        reSet();
    }
    
    //If the opponents health is zero, the user wins that match (they have not played all the players yet.)
    else if(parseInt($("#oh").text()) === 0 && players.winsCount <3){
        alert("Nice Job! Pick your next opponent.");
        resetOpp();
    }
    
    //If the opponents health is zero and the user has played all the players, the player wins the game.
    else if(parseInt($("#oh").text()) === 0){
        alert("Total domination! Looks like YOU are the real OG!");
        reSet();
    }
       
    //If the users health goes to zero, they lose the game.                 
    else if(parseInt($("#uh").text()) === 0){
        alert("Didn't get him this time! Try again!");
        reSet();
    }
}

})