// Declaring some test variables
const testZeros = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]
const testNums = [17, 782, 9321, 54621, 234506, 92738473, 999999999, 1000200, 56.23]

function chequeWriter(moneyDecimal) {
    // create arrays of units, tens and scales to draw on later
    let units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',];
    let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',];
    let scales = ['', 'thousand', 'million',];

    // ***DECIMAL ADDITION*** change input number to string fixed to two decimal places
    let stringNum = moneyDecimal.toFixed(2).toString()
    // console.log(stringNum)
    // split string number into chunks from right to left in groups of threes
    let counter = stringNum.length;
    let chunks = [];
    while (counter > 0) {
        let end = counter;
        // console.log("The counter is currently at", counter); // DEBUG
        chunks.push(stringNum.slice((counter = Math.max(0, counter - 3)), end))
        // console.log("This loop sliced from number", counter, "to", end, "and added this to chunks", chunks) // DEBUG
    };
    // console.log("Chunks - array of string numbers", chunks) // DEBUG

    // ***DECIMAL ADDITION** Taking out the decimal point and separating ints & decimal into two separate arrays
    let splitDecimal = chunks[0].split('.')
    console.log("splitDecimalL: ", splitDecimal)
    let pureDecimal = splitDecimal[splitDecimal.length - 1]
    // console.log("pureDecimal: ", pureDecimal)
    // chunks[0] = pureDecimal
    // console.log("chunks[0]", chunks[0])
    const decimalChunk = pureDecimal
    console.log("decimalChunk",decimalChunk)
    console.log("Chunks", chunks)
    const intChunks = chunks.slice(1)
    console.log("intChunks", intChunks)
    // console.log("I'm the decimal", decimalChunk)
    //console.log("I'm what used to be just chunks, now intChunks", intChunks)

    // *** DECIMAL ADDITION ** trying to turn decimal to cents
    let decimalChunkLength = decimalChunk.length;
    for(let i = 0; i < decimalChunkLength; i++) {
        let decArray = decimalChunk[i].split('').reverse().map(parseFloat);
        console.log(decArray, "decArray")
        // UP TO HERE
        // pull logic from intChunks for loop to turn this to cents and add to end of intChunks return
    }

    // setting up for the first for loop
    let intChunksLength = intChunks.length;
    let word = '';
    let words = [];
    
    for(let i = 0; i < intChunksLength; i++) {
        // Takes first element of chunks array, splits the string into individual elements, reverses their order and converts them to numbers in a new array
        let intsArray = intChunks[i].split('').reverse().map(parseFloat); 
        // console.log("BEFORE IF BLOCKS", 'intsArray', intsArray, "word", word, "words", words) // DEBUG

        // checks if number is in the teens and adds ten to first number so it can access correct element in unit array
        if(intsArray[1] === 1) {
            intsArray[0] += 10;
        }
        
        // check to be used in line 42 if the number is over a million with only 0s in the thousands e.g. 1000284 or 10000000
        let roundMillArray = (intsArray[0] == 0 && intsArray[1] == 0 && intsArray[2] == 0) 
        // assign word to value of scale word at same iteration e.g. thousand on second iteration because number is bigger than 3
        if((roundMillArray === false) && (word = scales[i])) {
            words.push(word);
        } 

        // assign word to value of related number in units array e.g. if intsArray[0] is 4 then word = 'four'
        if((word = units[intsArray[0]])) {
            words.push(word);
        }

        // assign word to value of related number in tens array e.g. if intsArray[1] is 6 then word = 'sixty'
        if((word = tens[intsArray[1]])) {
            words.push(word);
        }

        // add "and" string after hundreds appear in number string
        if (intsArray[0] || intsArray[1]) {
            // only pushes 'and' if there is a third number (so in hundreds)
            if (intsArray[2]) {
                    words.push("and");
            } 
        }

        // add hundreds wording - assign word to value of related number in units array e.g. if intsArray[2] is 2 then word = 'two'
        if ((word = units[intsArray[2]])) {
            words.push(word + " hundred");
        }  
        // console.log("AFTER IF BLOCKS", 'intsArray', intsArray, "word", word, "words", words) // DEBUG      
    }
    
    if (words == 'one') {
        return words + " dollar";
    } else {
        return words.reverse().join(" ") + " dollars";
    }
}  

// testing
for(let i = 0; i < testZeros.length; i++) {
    console.log("$", testZeros[i].toString(), "is", chequeWriter(testZeros[i]))
}

for(let i = 0; i < testNums.length; i++) {
    console.log("$", testNums[i].toString(), "is", chequeWriter(testNums[i]))
}
