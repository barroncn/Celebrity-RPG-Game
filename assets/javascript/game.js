// Function that moves the first player a user clicks on into the user box if the div width of 
// character-home is at least a certain width (no characters have been picked). It will then make the
//character-home div shorter by 220px and update the user stats.

// Function that moves the subsequent players clicked into the opponent box if the div width of
// character-home is less than a certain width (at least one character has been picked) and the user health
// === "___". This way the user cannot click multiple opponents. It will then make
// the character-home dive shorter my 220px and update the opponent stats.

// Function that will be called when a player wins a battle. An alert will pop up saying that the user has 
// won the battle and they need to pick a new opponent. When okay is clicked, placeholder image will replace
// the opponent image and the stats will reset. Now the user can click a new opponent.

//When the player loses a battle (user health <= 0) an alert will pop up and say you have been defeated, 
// please try again. When the user clicks okay, the game will reset.Accounts

// If the user defeats all the characters (width on the character-home div is less than a certain length and 
// opponent health is <= 0,) an alert will pop up informing the user that they are indeed the real OG. We can
// pull the name of the player they are playing with and put it in the alert. We'll say they should play
// again. When the user clicks okay the game will reset.

// Variables:
// random number picker
// game reset
// make character-home div 220px smaller
$(document).ready(function() {
var players = {
    name: ["#bruce", "#harrison", "#arnold", "#sylvester", "#wesley"],
    health: [190, 206, 210, 205, 200],
    defence: [16, 10, 28, 15, 8],
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
    reSet: function(){
                $("#character-home").replaceWith(originalStateCharacter.clone(true));
                $("#main-game").replaceWith(originalStateMain.clone(true));
                this.isPlayer = true;
                this.finishGame = false;
            },
            
    resetOpp: function (){
                 $("#opponent-pic").replaceWith(originalStateOppPic.clone(true));
                 $("#oppStats").replaceWith(originalStateOppStats.clone(true));
                 this.finishGame = false;
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




// var bruceHealth = 230;
// var harrisonHealth = 215;
// var arnoldHealth = 240;
// var slyHealth = 235;
// var wesleyHealth = 225;
// var uhealthStatus = $("#uh");
// var isPlayer = true;
// var finishGame = false;

// function playGame(){
//     if(isPlayer === true){
//         $("#bruce").appendTo("#user-pic");
//         $("#user-name").html(newName);
//         $("#blue").css("opacity", .3);
//         $("#uh").text(bruceHealth);
//         // toPlayer();
//         $("#upp").remove();
//         isPlayer = false;
//     }
    
//     else if (finishGame === false){
//         $("#bruce").appendTo("#opponent-pic");
//         $("#opp-name").html(newName);
//         $("#blue").css("opacity", .3);
//         $("#oh").text(bruceHealth);
//         // toOpponent();
//         $("#opp").remove();
//         finishGame = true;
//     }
// }

// function toPlayer(){
//     $("#upp").remove();
//     isPlayer = false;
// }

// function toOpponent(){
//     $("#opp").remove();
//     finishGame = true;
// }



// Click on Bruce Willis
$("#bruce").on("click", function(){
    players.setPlayers("#bruce");
});
    // var newName = $("#blue").clone();
    
    // if(isPlayer === true){
    //     $("#bruce").appendTo("#user-pic");
    //     $("#user-name").html(newName);
    //     $("#blue").css("opacity", .3);
    //     $("#uh").text(bruceHealth);
    //     toPlayer();
    // }
    
    // else if (finishGame === false){
    //     $("#bruce").appendTo("#opponent-pic");
    //     $("#opp-name").html(newName);
    //     $("#blue").css("opacity", .3);
    //     $("#oh").text(bruceHealth);
    //     toOpponent();
    //     }
// });

// Click on Harrison Ford
$("#harrison").on("click", function(){
    players.setPlayers("#harrison");
});
//     var newName = $("#orange").clone();
    
//     if(isPlayer === true){
//         $("#harrison").appendTo("#user-pic");
//         $("#user-name").html(newName);
//         $("#orange").css("opacity", .3);
//         $("#uh").text(harrisonHealth);
//         toPlayer();
//     }
    
//     else if (finishGame === false){
//         $("#harrison").appendTo("#opponent-pic");
//         $("#opp-name").html(newName);
//         $("#orange").css("opacity", .3);
//         $("#oh").text(harrisonHealth);
//         toOpponent();  
//     }
// });

// Click on Arnold Schwarzenegger
$("#arnold").on("click", function(){
     players.setPlayers("#arnold");
    // var newName = $("#yellow").clone();
    
    // if(isPlayer === true){
    //     $("#arnold").appendTo("#user-pic");
    //     $("#user-name").html(newName);
    //     $("#yellow").css("opacity", .3);
    //     $("#uh").text(arnoldHealth);
    //     toPlayer();
    // }
    
    // else if (finishGame === false){
    //     $("#arnold").appendTo("#opponent-pic");
    //     $("#opp-name").html(newName);
    //     $("#yellow").css("opacity", .3);
    //     $("#oh").text(arnoldHealth);
    //     toOpponent();
    //     }
});

// Click on Sylvester Stalone
$("#sylvester").on("click", function(){
     players.setPlayers("#sylvester");
    // var newName = $("#green").clone();
    
    // if(isPlayer === true){
    //     $("#sylvester").appendTo("#user-pic");
    //     $("#user-name").html(newName);
    //     $("#green").css("opacity", .3);
    //     $("#uh").text(slyHealth);
    //     toPlayer();
    // }
    
    // else if (finishGame === false){
    //     $("#sylvester").appendTo("#opponent-pic");
    //     $("#opp-name").html(newName);
    //     $("#green").css("opacity", .3);
    //     $("#oh").text(slyHealth);
    //     toOpponent();
    //     }
});

// Click on Wesley Snipes
$("#wesley").on("click", function(){
     players.setPlayers("#wesley");
    // var newName = $("#red").clone();
    
    // if(isPlayer === true){
    //     $("#wesley").appendTo("#user-pic");
    //     $("#user-name").html(newName);
    //     $("#red").css("opacity", .3);
    //     $("#uh").text(wesleyHealth);
    //     toPlayer();
    // }
    
    // else if (finishGame === false){
    //     $("#wesley").appendTo("#opponent-pic");
    //     $("#opp-name").html(newName);
    //     $("#red").css("opacity", .3);
    //     $("#oh").text(wesleyHealth);
    //     toOpponent();
    //     }
});

// Playing the game (clicking the attack button)
// var userPowerIncrease = 0;
// var userPower = (Math.floor(Math.random() * 10) + 5);
// var oppHealth = parseInt($("#oh"), 10);
// var userHealth = parseInt($("#uh"), 10);

$("#attackbutton").on("click", function(){
    players.clickAttack();
    
//   if (isPlayer === false && finishGame === true){
//       userPowerIncrease = (Math.floor(Math.random()*8) + 1);
//       userPower = (userPower + userPowerIncrease);
//       var oppPower = (Math.floor(Math.random()*15) + 20);
//       oppHealth = (oppHealth - userPower);
//       userHealth = (oppHealth - oppPower);
//     //   return userHealth;
//     //   return userPower;
//     //   return oppHealth;
//       $("#uh").html(userHealth);
//       $("#oh").html(oppHealth);
//       $("#up").html(userPower);
//       $("#op").html(oppPower);
//   } 
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
}

// Restore opponent after he's lost
function resetOpp(){
    $("#opponent-pic").replaceWith(originalStateOppPic.clone(true));
    $("#oppStats").replaceWith(originalStateOppStats.clone(true));
    players.finishGame = false;
    
}

function checkScore(){
    if(parseInt($("#oh").text()) === 0 && parseInt($("#uh").text()) === 0){
        alert("He just barely got the best of you! Try again!");
        reSet();
        players.winsCount = 0;
    }
    
    else if(parseInt($("#oh").text()) === 0 && players.winsCount <3){
        alert("Nice Job! Pick your next opponent.");
        players.winsCount++;
        resetOpp();
    }
    
    else if(parseInt($("#oh").text()) === 0){
        alert("Looks like YOU are the real OG! Total domination!! Play again as another player!");
        players.winsCount = 0;
        reSet();
    }
                        
    else if(parseInt($("#uh").text()) === 0){
        alert("Didn't get the best of him this time! Try again!");
        reSet();
        players.winsCount = 0;
    }
}

})