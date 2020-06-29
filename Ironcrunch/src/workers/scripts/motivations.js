function cleanInput (value) {
  return value.toLowerCase().replace(/\s+/g, '_')
}

on('change:repeating_motivations:motivation_select', function(values) {
  const motivationOld = cleanInput(values.previousValue)
  const motivationNew = cleanInput(values.newValue)
  setAttrs({
    ['repeating_motivations_motivation_' + motivationOld]: 'off',
    ['repeating_motivations_motivation_' + motivationNew]: 'on'
  });
});

on('change:repeating_motivations:details_button', function(values) {
  setAttrs({
    repeating_motivations_details: values.newValue
  });
});