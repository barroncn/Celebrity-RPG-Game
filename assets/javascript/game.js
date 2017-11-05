$(document).ready(function() {
var players = {
    name: ["#bruce", "#harrison", "#arnold", "#sylvester", "#wesley"],
    health: [207, 206, 210, 205, 204],
    defence: [16, 10, 19, 15, 8],
    attack: [6, 8, 5, 7, 9],
    color: ["#blue", "#orange", "#yellow", "#green", "#red"],
    isPlayer: true,
    finishGame: false,
    theOpp: null,
    theUser: null,
    multiplier: 1,
    oppIndex: null,
    userIndex: null,
    winsCount: 0,
    theIndexesUser: function(){
            this.theUser = $("#uh").text();
            this.userIndex = this.health.indexOf(parseInt(this.theUser, 10));
    },
    
    theIndexesOpp: function(){
            this.theOpp = $("#oh").text();
            this.oppIndex = this.health.indexOf(parseInt(this.theOpp, 10));
    },
            
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

function checkScore(){
    if(parseInt($("#oh").text()) === 0 && parseInt($("#uh").text()) === 0){
        alert("He just barely got the best of you! Try again!");
        reSet();
    }
    
    else if(parseInt($("#oh").text()) === 0 && players.winsCount <3){
        alert("Nice Job! Pick your next opponent.");
        resetOpp();
    }
    
    else if(parseInt($("#oh").text()) === 0){
        alert("Total domination! Looks like YOU are the real OG!");
        reSet();
    }
                        
    else if(parseInt($("#uh").text()) === 0){
        alert("Didn't get the best of him this time! Try again!");
        reSet();
    }
}

})