const prompt = require('prompt-sync')({ sigint: true });

class Shrugman {
    constructor() {
        this.shrugmanEmoji = '¯\\_(:/)_/¯';
        this.secret = [];
        this.covered = [];
        this.storedDrawing = [''];
        this.list = {
            movieCollection: [
                `The Shawshank Redemption`,
                `The Lord of the Rings`,
                `Pulp Fiction`,
                `Forrest Gump`,
                `Fight Club`,
                `Saving Private Ryan`,
                `Star Wars`,
                `Harry Potter`,
                `Spirited Away`,
                `Howl's Moving Castle`,
                `Back to the Future`,
                `Parasite`,
                `American History X`,
                `Casablanca`,
                `Grave of the Fireflies`,
                `Memento`,
                `Django Unchained`,
                `The Shining`,
                `American Beauty`,
                `Toy Story 3`,
                `Eternal Sunshine of the Spotless Mind`,
                'Little Miss Sunshine',
                'Up',
                'Ex Machina',
                'A Room with a View',
                'Dune',
                'Trainspotting',
                'Dead Poets Society',
                'Minari',
                '1984',
                'Ghost in the Shell'
                ]
            };
        }
        getMovie() {
            const {secret, list} = this;
            let arrayOfMovies = Object.values(list)[0];
            let randomIndex = Math.floor(Math.random() * arrayOfMovies.length);
            let secretMovie = arrayOfMovies[randomIndex].toLowerCase();
            secret.push(secretMovie);
            return secret;
        }
        replaceLettersWithUnderscores() {
            const {secret, covered} = this;
            let secretMovie = secret[0];
            console.log(secret);
            let array = secretMovie.split("");
            for (let i = 0; i < array.length; i++) {
                if (array[i] !== ' ') {
                    array[i] = '_';
                }
            }
            let secretMovieCovered = array.join("");
            covered.push(secretMovieCovered);
            return covered;
        }
        isAnswerCorrect(guess) {
            const {shrugmanEmoji, secret, covered, storedDrawing} = this;
            let secretMovie = secret[0];
            let secretMovieCovered = covered[0];
            let answerCorrect = true;
            if (secretMovie.indexOf(guess) === -1) {
                answerCorrect = false;
                storedDrawing[0] = storedDrawing[0] + shrugmanEmoji[storedDrawing[0].length];
            } else {
                let secretSplit = secretMovieCovered.split("");
                for (let i = 0; i < secretMovie.length; i++) {
                    if (secretMovie[i] === guess) {
                        secretSplit.splice(i, 1, guess);
                    }
                }
                secretMovieCovered = secretSplit.join("");
                covered.splice(0, 1, secretMovieCovered);
            }
            console.log(secretMovieCovered); 
            console.log(" ");
            if (storedDrawing[0].length === shrugmanEmoji.length) {
                return `Better luck next time: ${secretMovie}`;
            } else {
                return storedDrawing[0];
            } 
        }
        anotherRound(playAgain) {
            if (playAgain.toLowerCase() === "y") {
                this.secret.splice(0,1);
                this.covered.splice(0,1);
                this.storedDrawing.splice(0, 1, '')
                game.getMovie();
                console.log(game.replaceLettersWithUnderscores());
                playGame();
            } else if (playAgain.toLowerCase() === "n") {
                return `That's okay :) Hope to see you again soon!`;
            }
        }
}

const game = new Shrugman();

game.getMovie();

console.log(game.replaceLettersWithUnderscores());

playGame();

function playGame() {
    console.log(" ");
    let guess = prompt(`Guess a letter `);
    console.clear();
    console.log(game.isAnswerCorrect(guess));
    if (game.storedDrawing[0].length < game.shrugmanEmoji.length && game.covered[0].includes('_')) {
        playGame();
    } else if (game.storedDrawing[0].length === game.shrugmanEmoji.length || !game.covered[0].includes('_')) {
        let playAgain = prompt(`Another round(y/n)? `);
        console.clear();
        console.log(game.anotherRound(playAgain));
    }
}











