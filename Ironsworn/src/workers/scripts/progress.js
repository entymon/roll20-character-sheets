const progressStrings = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten'
]

function getCurrentProgress (progressValues) {
  let total = 0
  progressValues.map(x =>{ total = x + total })
  return total
}

// function updateProgressValues (newValue, type, boxNumbers) {
//   let progressNumber = 0
//   for (; newValue > 0;) {
//     let updateValue = (newValue < 4) ? newValue : 4
//     let attNumber = boxNumbers[progressNumber]
//     setAttrs({
//       ['repeating_'+ type + '_progress_' + attNumber]: updateValue
//     })
//     newValue = newValue - updateValue
//     progressNumber++
//   }
// }

function fillBoxes (filledBoxes, newBoxes, boxNumbers, type) {
  let nextBox = filledBoxes
  for (let i = 0; newBoxes > 0; i++) {
    setAttrs({
      ['repeating_'+ type + '_progress_'+ boxNumbers[nextBox]]: 4
    })
    newBoxes = newBoxes - 1
    nextBox++
  }
  return nextBox
}

function setRemainder (type, boxNumbers, lastBox, remainder) {
  if (remainder > 0) {
    setAttrs({
      ['repeating_'+ type + '_progress_'+ boxNumbers[lastBox]]: remainder
    })
  }
}

function updateProgressValues (previousProgress, finalValue, type, boxNumbers) {
  const filledBoxes = Math.floor(previousProgress / 4);
  const newBoxes = Math.floor((finalValue / 4) - filledBoxes);
  const remainder = finalValue % 4;
  const lastBox = fillBoxes(filledBoxes, newBoxes, boxNumbers, type)
  setRemainder(type, boxNumbers, lastBox, remainder)
}

function updateProgress (mark, progress, type, boxNumbers) {
  const previousProgress = getCurrentProgress(progress)
  const totalProgress = mark + previousProgress
  const finalValue = (totalProgress < 40) ? totalProgress : 40
  updateProgressValues(previousProgress, finalValue, type, boxNumbers)
}

function chosenDifficulty (rank) {
  switch (rank) {
    case 1:
      return 12
      break;
    case 2:
      return 8
      break;
    case 3:
      return 4
      break;
    case 4:
      return 2
      break;
    case 5:
      return 1
      break;
    default:
      return null
  }
}

function progressNumbers(type) {
  return type === 'progress' ? progressStrings : Array(10).fill().map((x,i)=>i)
}

on('change:repeating_progress:mark_progress change:repeating_vow:mark_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  const boxNumbers = progressNumbers(type)
  getAttrs([
    `repeating_${type}_rank`,
    `repeating_${type}_progress_${boxNumbers[0]}`,
    `repeating_${type}_progress_${boxNumbers[1]}`,
    `repeating_${type}_progress_${boxNumbers[2]}`,
    `repeating_${type}_progress_${boxNumbers[3]}`,
    `repeating_${type}_progress_${boxNumbers[4]}`,
    `repeating_${type}_progress_${boxNumbers[5]}`,
    `repeating_${type}_progress_${boxNumbers[6]}`,
    `repeating_${type}_progress_${boxNumbers[7]}`,
    `repeating_${type}_progress_${boxNumbers[8]}`,
    `repeating_${type}_progress_${boxNumbers[9]}`
  ],
  function(attrValues) {
    const progress = [ 
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[0]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[1]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[2]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[3]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[4]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[5]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[6]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[7]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[8]}`]),
      parseInt(attrValues[`repeating_${type}_progress_${boxNumbers[9]}`])
    ]
    const rank = parseInt(attrValues[`repeating_${type}_rank`])
    const mark = chosenDifficulty(rank)
    updateProgress(mark, progress, type, boxNumbers)
  });
});

on('change:repeating_progress:clear_progress change:repeating_vow:clear_progress', function(values) {
  const type = values.sourceAttribute.match(/repeating_(.*?)_/)[1]
  const boxNumbers = progressNumbers(type)
  setAttrs({ 
    ['repeating_' + type + '_progress_' + boxNumbers[0]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[1]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[2]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[3]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[4]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[5]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[6]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[7]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[8]]: '0',
    ['repeating_' + type + '_progress_' + boxNumbers[9]]: '0'
  });
});

on('change:clear_misses', function() {
  setAttrs({ 
    'miss-0': '0',
    'miss-1': '0',
    'miss-2': '0',
    'miss-3': '0',
    'miss-4': '0',
    'miss-5': '0',
    'miss-6': '0',
    'miss-7': '0',
    'miss-8': '0',
    'miss-9': '0',
    'clear_misses': 'off'
  });
});
