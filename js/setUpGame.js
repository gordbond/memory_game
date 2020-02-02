//to do 
//user class
//score
//timer?
//make it look nice

window.addEventListener("load", function () {
    let userForm = document.getElementById("userForm");
    let formDiv = document.getElementById("formDiv");
    let newGameButton = document.getElementById("newGameButton");
    let playerInfoButton = document.getElementById("showPlayerInfoButton");
    let helpButton = document.getElementById("helpButton");
    let userFirstName = document.forms.userForm.firstName;
    let userLastName = document.forms.userForm.lastName;
    let userAge = document.forms.userForm.age;
    let userFavColour = document.forms.userForm.playerColour;
    let card = document.getElementsByClassName("card");
    let cards = [...card];
    let memoryTableDiv = document.getElementById("memoryTableDiv");
    score = 0;


    //USER HITS SUBMIT 
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formDiv.style = "display:none;";
        user1 = new user(userFirstName.value, userLastName.value, userAge.value, userFavColour.value);
        memoryTableDiv.style = "visibility:visible;";
        gameBoard = new Game(userFavColour.value, memoryTableDiv, cards);
        listOfCards = gameBoard.listOfCards;
        document.getElementById("titleDiv").style = "margin:0; margin-left:30%;";
        document.getElementById("playerInfo").style = "display:block";
        document.getElementById("buttons").style = "display:block";
        
    });

    newGameButton.addEventListener("click", function (event) {
        event.preventDefault();
        gameBoard = new Game(userFavColour.value, memoryTableDiv, cards);
        listOfCards = gameBoard.listOfCards;
    });

    helpButton.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("helpDiv").style = "display:block";
        document.getElementById("playerInfo").style = "display:none";
        playerInfoButton.style = "display:inline";
        helpButton.style = "display:none";
       
    });

    showPlayerInfoButton.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("playerInfo").style = "display:block";
        document.getElementById("helpDiv").style = "display:none";
        helpButton.style = "display:inline";
        playerInfoButton.style = "display:none";
        
    });

    


    //SET UP BOARD
    class Game {

       

        constructor(favColour, memoryTableDiv, cards) {
            this.memoryTableDiv = memoryTableDiv;
            this.cards = cards;
            this.favColour = favColour;
            this.setCards(this.cards);
            let shuffledCards = document.getElementsByClassName("card"); //could I just reset the cards variable?
            let frontOfCards = document.getElementsByClassName("flippable");
            let backOfCards = document.getElementsByClassName("back");
            //let shuffledCards = memoryTableDiv.getElementsByTagName("td");
            this.userCustomization(shuffledCards);
            this.listenForClick(shuffledCards, frontOfCards, backOfCards);
            score = 0;
            document.getElementById("score").innerHTML = "Number of pairs: " + score;
            
        
        }


        shuffleImgs(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        userCustomization(array) {
            for (let i = 0; i < array.length; i++) {
                array[i].style = "border-color:" + this.favColour + ";";
            }
        }



        setCards(arrayOfImgs) {
            this.shuffleImgs(arrayOfImgs);
            let counter = 0;
            let result = "<table>";
            for (let i = 0; i < 3; i++) { //change back to 4 if I put the other row back
                result += "<tr>";
                for (var j = 0; j < 6; j++) {
                    // result += "<td class='card'>"+cards[counter].innerHTML+"</td>";
                    result += "<td class='card'>" + cards[counter].innerHTML + "</td>";
                    counter++;
                }
                result += "</tr>";
            }
            result += "</table>";
            memoryTableDiv.innerHTML = result;
        }


        //CAN BREAK IT UP AND CALL SPECIFIC FUNCTIONS/METHODS
        /* card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click",congratulations); */
        //----GAME LOGIC-----//
        listenForClick(arrayOfCards, frontOfCards, backOfCards) {
            
            for (let i = 0; i < arrayOfCards.length; i++) {
                arrayOfCards[i].addEventListener("click", function () {
                    
                    frontOfCards[i].classList.add("flipped");
                    let flippedCards = document.getElementsByClassName("flipped");

                    if (document.getElementsByClassName("flipped").length < 3) {
                        frontOfCards[i].style = "display:block;";
                        backOfCards[i].style = "display:none;";
                        if (flippedCards.length == 2) {
                            if (flippedCards[0].parentElement.className === flippedCards[1].parentElement.className) {
                                //document.getElementById("message1").innerHTML = "YAYYYYY";
                                flippedCards[0].classList.add("match");
                                flippedCards[1].classList.add("match");
                                score = score +1;
                                document.getElementById("score").innerHTML = "Number of pairs: "+score;
                                if(score === 9){
                                    //return document.getElementById("message2").innerHTML = "WINNER!!!!!!!!";
                                    document.getElementById("winner").style = "display:block;"
                                }
                                
                            } /* else
                                document.getElementById("message1").innerHTML = "Nope"; */
                        }
                    } else {

                        for (let i = 0; i < arrayOfCards.length; i++) {
                            if (frontOfCards[i].classList.contains("match")) {
                                //document.getElementById("message1").innerHTML = "working";
                                frontOfCards[i].classList.remove("flipped");
                            } else {
                                frontOfCards[i].style = "display:none;";
                                backOfCards[i].style = "display:block;";
                                frontOfCards[i].classList.remove("flipped");
                            }
                        }
                    }
                    
                });
            }
        }
        

        

    }



    //class for user
    class user {
        constructor(firstName, lastName, age, favColour) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.favColour = favColour;
            this.setUserAge(this.age);
            this.setUserName(this.firstName, this.lastName);
            this.setUserColor(this.favColour);
        }

        setUserColor(favColour){        
            let p = document.getElementsByTagName('p');
            for (let i=0; i < p.length; i++){
                p[i].style = "color:" + favColour + ";";
            }
            /* let buttons = document.getElementsByTagName("button");
            for (let i=0; i < buttons.length; i++){
                buttons[i].style = "background-color:" +favColour+ ";";
            } */
            
               
        }

        setUserName(firstName, lastName){
            document.getElementById("name").innerHTML = 
            "Name: " + firstName + " " + lastName;
        }
        setUserAge(age){
            document.getElementById("age").innerHTML = "Age: " + age;
        }

        
        
    }





});