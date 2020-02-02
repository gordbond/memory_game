//Gord Bond, 000786196
//Date Created: Oct. 10, 2019
//I, Gord Bond, 000786196 certify that this material is my original work. No other person's work 
//has been used without due acknowledgement.
//This memoryGame.js file is to provide the model for the memory game
//It take user info from a form and uses it to create a custom game board.


// Event listener waits for page to load before running any code
window.addEventListener("load", function () {

    //-----Variables-----------//

    //Accesses the html form which asks player for their info
    const userForm = document.getElementById("userForm");
    //Accesses the div which contains the user info form
    const formDiv = document.getElementById("formDiv");
    //Accesses the button used to start a new game
    const newGameButton = document.getElementById("newGameButton");
    //Accesses the button used to show player info
    const playerInfoButton = document.getElementById("showPlayerInfoButton");
    //Accesses the button used to view the rules of the game
    const helpButton = document.getElementById("helpButton");
    //Accesses the html form input for first name
    const userFirstName = document.forms.userForm.firstName;
    //Accesses the html form input for last name
    const userLastName = document.forms.userForm.lastName;
    //Accesses the html form input for user age
    const userAge = document.forms.userForm.age;
    //Accesses the html form input for user's favourite colour
    const userFavColour = document.forms.userForm.playerColour;
    //Accesses the list items with the card class used  - These are the cards for the game 
    const card = document.getElementsByClassName("card");
    //Creates a copy of the card elements - similar to slice
    let cards = [...card];
    //Accesses the div containing all the game information - such as cards and player information
    const memoryTableDiv = document.getElementById("memoryTableDiv");
    //The number of pairs found by the user
    score = 0;
    //The number of clicks by the user
    clicks = 0;

    //----------------------EVENT LISTENERS------------------//

    /**
     * Accesses the userForm and listens for if the form 
     * is submitted. Runs a series of actions when submitted.
     * New game and user are created and DOM is manipulated to show 
     * new html elements while making the form disappear
     */
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        //hides form
        formDiv.style = "display:none;";
        //create a new user
        user1 = new user(userFirstName.value, userLastName.value, userAge.value, userFavColour.value);
        //Shows the game board
        memoryTableDiv.style = "visibility:visible;";
        //Creates new game (Cards are shuffled, user info displayed)
        game = new Game(userFavColour.value, memoryTableDiv, cards);
        //listOfCards = game.listOfCards;//Not sure I need this
        //Reorganize the title logo
        document.getElementById("titleDiv").style = "margin:0; margin-left:30%;";
        //Shows the player info 
        document.getElementById("playerInfo").style = "display:block";
        //Shows the buttons for the game
        document.getElementById("buttons").style = "display:block";

    });

    /**
     * Accesses the newGameButton and listens for it to be clicked. 
     * Runs a series of actions when clicked.
     * Creates a new user and new game
     * removes winner message if visable
     */
    newGameButton.addEventListener("click", function (event) {
        event.preventDefault();
        //new user created
        user1 = new user(userFirstName.value, userLastName.value, userAge.value, userFavColour.value);
        //new game created
        game = new Game(userFavColour.value, memoryTableDiv, cards);
        //listOfCards = game.listOfCards;//Not sure I need this
        //Hides 'winner' message
        document.getElementById("winner").style = "display:none;";
    });

    /**
     * Accesses the helpButton and listens for it to be clicked. 
     * Runs a series of actions when clicked.
     * Shows the rules of the game
     * Hides player info
     * displays player info button and hides help button
     */
    helpButton.addEventListener("click", function (event) {
        event.preventDefault();
        //Show rules
        document.getElementById("helpDiv").style = "display:block";
        //Hide player info
        document.getElementById("playerInfo").style = "display:none";
        //display player info button
        playerInfoButton.style = "display:inline";
        //hide help button
        helpButton.style = "display:none";

    });

    /**
     * Accesses the showPlayerInfoButton and listens for it to be clicked. 
     * Runs a series of actions when clicked.
     * Shows the player info
     * Hides the rules
     * hides player info button and shows help button
     */
    showPlayerInfoButton.addEventListener("click", function (event) {
        event.preventDefault();
        //Shows player info
        document.getElementById("playerInfo").style = "display:block";
        //Hides rules
        document.getElementById("helpDiv").style = "display:none";
        //Shows help button
        helpButton.style = "display:inline";
        //Hides player info
        playerInfoButton.style = "display:none";

    });


    //-------------------------CLASSES-----------------------------------//

    /**
     * Game class
     * Used to set up game board with player info and shuffled (randomized) cards
     * Game logic included.
     */
    class Game {


        /**
         * Constructor for Game
         * Calls local methods to create game board
         * @param {String} favColour 
         * @param {HTMLDivElement} memoryTableDiv 
         * @param {HTMLCollectionOf<HTMLLIElement>} cards 
         */
        constructor(favColour, memoryTableDiv, cards) {
            this.memoryTableDiv = memoryTableDiv;
            this.cards = cards;
            this.favColour = favColour;
            //shuffles cards and places them in the HTML
            this.setCards(this.cards);
            //Accesses cards after set card method shuffles them
            const shuffledCards = document.getElementsByClassName("card"); 
            //Accesses the front face of the card
            const frontOfCards = document.getElementsByClassName("flippable");
            //Accesses the back face of the card
            const backOfCards = document.getElementsByClassName("back");
            //sets border colour of cards
            this.userCustomization(shuffledCards);
            //Game logic - checks for click on cards
            this.listenForClick(shuffledCards, frontOfCards, backOfCards);
            //resets score to zero 
            score = 0;
            //resets score to zero in view
            document.getElementById("score").innerHTML = "Number of pairs: " + score;
            //resets clicks to zero 
            clicks = 0;
            //resets score to zero in view
            document.getElementById("numOfClicks").innerHTML = "Clicks: " + clicks;


        }

        /**
         * Using the DurnstenFeld Shuffle algorithm to shuffle the cards
         * @param {HTMLCollectionOf<HTMLLIElement>} array 
         */
        shuffleImgs(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        /**
         * Uses a loop to access all the cards and apply the 
         * user's favourite colour
         * @param {HTMLCollectionOf<HTMLLIElement>} array 
         */
        userCustomization(array) {
            for (let i = 0; i < array.length; i++) {
                array[i].style = "border-color:" + this.favColour + ";";
            }
        }


        /**
         * Takes the original list of cards, shuffles them and
         * then outputs a new list
         * @param {HTMLCollectionOf<HTMLLIElement>} arrayOfImgs 
         */
        setCards(arrayOfImgs) {
            this.shuffleImgs(arrayOfImgs);
            let counter = 0;
            let result = "<ul>";
            for (let i = 0; i < 4; i++) { //change back to 4 if I put the other row back
                //result += "<li>";
                for (var j = 0; j < 6; j++) {
                    // result += "<td class='card'>"+cards[counter].innerHTML+"</td>";
                    result += "<li class='card'>" + cards[counter].innerHTML + "</li>";
                    counter++;
                }
                //result += "</li>";
            }
            result += "</ul>";
            memoryTableDiv.innerHTML = result;
        }


        //CAN BREAK IT UP AND CALL SPECIFIC FUNCTIONS/METHODS
        /* card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click",congratulations); */

        //----GAME LOGIC-----//

        /**
         * Listen for click is used for the game logic.
         * User can on click 2 cards at a time
         * Checks to see if they match
         * If they do, they remain face up and are added to the score
         * If not they are turned back over
         * @param {HTMLCollectionOf<HTMLLIElement>} arrayOfCards 
         * @param {HTMLCollectionOf<HTMLImageElement>} frontOfCards 
         * @param {HTMLCollectionOf<HTMLImageElement>} backOfCards 
         */
        listenForClick(arrayOfCards, frontOfCards, backOfCards) {
            //iterates through all the cards
            for (let i = 0; i < arrayOfCards.length; i++) {
                //adds an event listener for clicks on each card
                arrayOfCards[i].addEventListener("click", function () {
                    //adds flipped to class list and shows the front face of the card
                    frontOfCards[i].classList.add("flipped");
                    //gets the list of elements with class "flipped"
                    const flippedCards = document.getElementsByClassName("flipped");
                    //if less than 3 flipped cards - flip card to front
                    if (flippedCards.length <= 2) {
                        clicks++;
                        document.getElementById("numOfClicks").innerHTML = "Clicks: " + clicks;
                        frontOfCards[i].style = "display:block;";
                        backOfCards[i].style = "display:none;";
                        //if equal to 2 flipped cards - check if they match
                        if (flippedCards.length == 2) {
                            if (flippedCards[0].parentElement.className === flippedCards[1].parentElement.className) {
                                flippedCards[0].classList.add("match");
                                flippedCards[1].classList.add("match");
                                //add 1 to number of matching pairs (score)
                                score = score + 1;
                                //display score
                                document.getElementById("score").innerHTML = "Number of pairs: " + score;
                                //if 12 pairs found display winner message
                                if (score === 12) {
                                    document.getElementById("winner").style = "display:block;"
                                }
                            }
                            
                        }
                        //determine whether cards should stay flipped
                    } else{
            
                        
                        for (let i = 0; i < arrayOfCards.length; i++) {
                            //if they match - leave face up
                            if (frontOfCards[i].classList.contains("match")) {
                                frontOfCards[i].classList.remove("flipped");
                                //if they don't match - turn over
                            } else {
                                frontOfCards[i].style = "display:none;";
                                backOfCards[i].style = "display:block;";
                                frontOfCards[i].classList.remove("flipped");
                            }
                        }
                        //Allows 3rd click to flip over
                        frontOfCards[i].classList.add("flipped");
                        frontOfCards[i].style = "display:block;";
                        backOfCards[i].style = "display:none;";
                        clicks++;
                        document.getElementById("numOfClicks").innerHTML = "Clicks: " + clicks;
                    }

                });
            }
        }
    }



    /**
     * User Class
     * Contains information about user entered
     * in the form.
     * Info is displayed for user.
     */
    class user {
        /**
         * Constructor - used to call methods which display
         * the user information
         * @param {String} firstName 
         * @param {String} lastName 
         * @param {String} age 
         * @param {String} favColour 
         */
        constructor(firstName, lastName, age, favColour) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.favColour = favColour;
            //displays users age
            this.setUserAge(this.age);
            //displays user name
            this.setUserName(this.firstName, this.lastName);
            //displays user favourite colour for font colour
            this.setUserColor(this.favColour);
        }

        /**
         * Sets the font color of the user info to 
         * the user's favourite colour
         * @param {String} favColour 
         */
        setUserColor(favColour) {
            const p = document.getElementsByTagName('p');
            for (let i = 0; i < p.length; i++) {
                p[i].style = "color:" + favColour + ";";
            }

        }

        /**
         * setUserName concatenates first and last name 
         * then displays it in the player info div
         * @param {String} firstName 
         * @param {String} lastName 
         */
        setUserName(firstName, lastName) {
            document.getElementById("name").innerHTML =
                "Name: " + firstName + " " + lastName;
        }

        /**
         * setUserAge displays the user's age in the player info div
         * @param {String} age 
         */
        setUserAge(age) {
            document.getElementById("age").innerHTML = "Age: " + age;
        }
    }
});