const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

//(b) Away Team name for 2014 world cup final

//(c) Home Team goals for 2014 world cup final

//(d) Away Team goals for 2014 world cup final

//(e) Winner of 2014 world cup final */

const newFifaData = fifaData.filter((data) => {
    return data["Year"] === 2014;
});

const homeTeam = newFifaData.map((value) => {
    return value["Home Team Name"];
});

console.log(newFifaData);
console.log(homeTeam);
/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(fifaArray) {
    const newFifaObj = fifaArray.filter((element) => {
        return element.Stage.includes("Final");
    });
    return newFifaObj;
 }



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(fifaDataArray, callback) {
    const finalsMatches = callback(fifaDataArray);
    const years = finalsMatches.map((element) => {
        return element.Year;
    });
    return years;
}

console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(fifaDataArray, callback) {
    const finalsMatches = callback(fifaDataArray);
    const winners = finalsMatches.map((element) => {
        if (element["Home Team Goals"] > element["Away Team Goals"]) {
            return element["Home Team Name"];
        } else {
            return element["Away Team Name"];
        }
    });
    return winners;
}

console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument (Teams in the Finals)
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument    (Years)
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument (Winner of each year)
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(fifaDataArray2, callback1, callback2, callback3) {
    const finalsTeams = callback1(fifaDataArray2);
    const years = callback2(fifaDataArray2, callback1);
    const country = callback3(fifaDataArray2, callback1);
    const stringArray = finalsTeams.map((element, index) => {
        if (element["Home Team Goals"] > element["Away Team Goals"]) {
            return `In ${years[index]}, ${country[index]} won the world cup!`;
        } else {
            return `In ${years[index]}, ${country[index]} won the world cup!`;
        }
    });

    return stringArray;

}

console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(callback) {
    const totalGoals = callback.reduce((total, current) => {
        let totalGoals = total + (current["Home Team Goals"] + current["Away Team Goals"]);
        return totalGoals;
    }, 0);

    const averageGoals = totalGoals / callback.length;

    return averageGoals.toFixed(2);
 }

 console.log(getAverageGoals(getFinals(fifaData)));




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamIniatials) {
    const numOfWins = data.reduce((total, current) => {
        if (current["Home Team Initials"] === teamIniatials) {
            if(current["Home Team Goals"] > current["Away Team Goals"]) {
                console.log(current["Home Team Initials"]);
                total += 1;
            }
        } else if (current["Away Team Initials"] === teamIniatials) {
            if (current["Home Team Goals"] < current["Away Team Goals"]) {
                console.log(current["Away Team Initials"]);
                total += 1;
            }
        }
        return total;
    }, 0);
    return numOfWins;

}

console.log(getCountryWins(fifaData, "FRA"));


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {    
    const worldCupTeams = data.filter((team) => {
        return team["Stadium"].includes("World Cup");
    });
    
    let totalGoals = {};
    let appearances = {};
    
    worldCupTeams.forEach(game => {
        const homeTeam = game['Home Team Name'];
        const awayTeam = game['Away Team Name'];
        const homeGoals = game['Home Team Goals'];
        const awayGoals = game['Away Team Goals'];
    
        // Update goals and appearances for home team
        if (!totalGoals[homeTeam]) {
            totalGoals[homeTeam] = 0;
            appearances[homeTeam] = 0;
        }
        totalGoals[homeTeam] += homeGoals;
        appearances[homeTeam] += 1;
    
        // Update goals and appearances for away team
        if (!totalGoals[awayTeam]) {
            totalGoals[awayTeam] = 0;
            appearances[awayTeam] = 0;
        }
        totalGoals[awayTeam] += awayGoals;
        appearances[awayTeam] += 1;
    });
    
    // Calculate average goals per appearance
    let avgGoalsPerAppearance = {};
    for (let team in totalGoals) {
        avgGoalsPerAppearance[team] = totalGoals[team] / appearances[team];
    }
    
    // Find the team with the highest average
    let teamWithHighestAvg = Object.keys(avgGoalsPerAppearance).reduce((a, b) => avgGoalsPerAppearance[a] > avgGoalsPerAppearance[b] ? a : b);
    console.log(avgGoalsPerAppearance);
    return teamWithHighestAvg;
    
}

console.log(getGoals(fifaData));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense() {

    

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
