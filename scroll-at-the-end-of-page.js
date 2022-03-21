// Declare some constants
const MAXIMUM_NUMBER_OF_TRIALS = 5;
const MINIMUM_SLEEPING_TIME_IN_MS = 500;
const MAXIMUM_SLEEPING_TIME_IN_MS = 2000;
// Utility functions
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const randomNumber = (minimum, maximum) => Math.floor(Math.random() * maximum) + minimum;
const randomSleep = () => sleep(randomNumber(MINIMUM_SLEEPING_TIME_IN_MS, MAXIMUM_SLEEPING_TIME_IN_MS));
// How to get at the bottom of an infinity scroll
let currentScrollHeight = 0;
let manualStop = false;
let numberOfScrolls = 0;
let numberOfTrials = 0;
while (numberOfTrials < MAXIMUM_NUMBER_OF_TRIALS && !manualStop) {
  // Keep the current scroll height
  currentScrollHeight = document.body.scrollHeight;
  // Scroll at the bottom of the page
  window.scrollTo(0, currentScrollHeight);
  // Wait some seconds to load more results
  await randomSleep();
  // If the height hasn't changed, there may be no more results to load
  if (currentScrollHeight === document.body.scrollHeight) {
    // Try another time
    numberOfTrials++;
    console.log(
      `Is it already the end of the infinite scroll? ${MAXIMUM_NUMBER_OF_TRIALS - numberOfTrials} trials left.`,
    );
  } else {
    // Restart the number of consecutive trials
    numberOfTrials = 0;
    // Increment the number of successful scroll
    numberOfScrolls++;
    console.log(`The scroll #${numberOfScrolls} was successful!`);
  }
}
console.log('We should be at the bottom of the infinity scroll! Congratulation!');
console.log(`${numberOfScrolls} scrolls were needed to load all results!`);
