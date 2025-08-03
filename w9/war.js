
class Card {

    static suits = ["Spades", "Hearts", "Diamonds", "Clubs"]

    // Used for determining which card is higher
    static rankOrder = new Map ([
        ["2", 2],
        ["3", 3],
        ["4", 4],
        ["5", 5],
        ["6", 6],
        ["7", 7],
        ["8", 8],
        ["9", 9],
        ["10", 10],
        ["J", 11],
        ["Q", 12],
        ["K", 13],
        ["A", 14],
    ]);

    // Unused function
    static getHigher(c1, c2) {
        if (c1 > c2) {
            return c1
        } else if (c2 > c1) {
            return c2
        } 
        return null
    }

    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
    }

  
    valueOf() {
        return Card.rankOrder.get(this.rank)    }

    toString() {
        return this.rank + "-" + this.suit
    }
}

class Deck {

    static defaultCap = 52

    constructor(cap) {
        this.cards = new Array(cap)
        this.size = 0
    }

    // Fill deck with cards in default order
    init() {
        for (let [rank, val] of Card.rankOrder) {
            for (const suit of Card.suits) {
                this.putCard(new Card(rank, suit))
            }
        }
    }

    // Place a card on top of the deck
    putCard(card) {
        this.cards[this.size] = card
        this.size ++
    }

    // splits deck into an even number of cards for each player in a random order
    randomSplit(numPlayers) {
        let handSize = Math.floor(this.size / numPlayers);
        let hands = new Array(numPlayers)
        for (let i = 0; i < numPlayers; i ++) {
            hands[i] = new Deck(handSize)
            for (let j = 0; j < handSize; j ++) {
                hands[i].putCard(this.randomDraw())
            }
        }
        return hands
    }

    draw() {
        this.size --
        return this.cards[this.size]
    }

    // Pick a random card.  This switches that card with the top card and reduces the deck size by 1
    randomDraw() {
        let idx = Math.floor(Math.random() * this.size)
        let choice = this.cards[idx]
        this.cards[idx] = this.cards[this.size - 1]
        this.size --
        return choice
    }

    isEmpty() {
        return this.size == 0 
    }

}

class Player {

    constructor(name, deck) {
        this.name = name
        this.deck = deck
        this.score = 0
        this.card = null
    }

    point() {
        this.score ++
    }

    draw() {
        this.card = this.deck.draw()
    }

    getCard() {
        return this.card
    }

}

let deck = new Deck(Deck.defaultCap)
deck.init()
let hands = deck.randomSplit(2) // randomly shuffle hands

let p1 = new Player("P1", hands[0])
let p2 = new Player("P2", hands[1])
let rw;
let round = 1
console.log("WAR! " + p1.name + " vs " + p2.name)

// Game loop, we use player1's deck as the counter
while (!p1.deck.isEmpty()) {
    p1.draw()
    p2.draw()
    
    console.log("Round " + round + ": " + p1.card.toString() + " vs " + p2.card.toString())
    rw = getRoundWinner(p1, p2)
    let roundConclusion = "It's a tie."
    if (rw != null) {
        rw.point()
        roundConclusion = rw.name + " wins."
    }
    console.log("Round " + round + ": " + roundConclusion)
    round ++
}

winner = getWinner(p1, p2)
let gameConclusion = "Tie game"
if (winner != null) {
    gameConclusion = winner.name + " wins the game"
}
console.log(gameConclusion)


// All players play their top card.  Returns the winner of the round
function getRoundWinner(...players) {
    let winner = null
    let highCard = 0
    for (const p of players) {
        if (p.card.valueOf() == highCard) {
            winner = null
        } else if (p.card > highCard) {
            winner = p
            highCard = p.card.valueOf()
        }
    }
    return winner
}

// Determine the winner of the game using high score
function getWinner(...players) {
    let winner = null
    let highScore = 0
    for (const p of players) {
        if (p.score === highScore) {
            winner = null
        } else if (p.score > highScore) {
            winner = p
            highScore = p.score
        }
    }
    return winner
}