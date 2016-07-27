const db = require('./db.js');

const seedQuestions = [
  'What would constitute a “perfect” day for you?',
  'Would you like to be famous? In what way?',
  'If you could change anything about the way you were raised what would it be?',
  'When did you last cry in front of another person? By yourself?',
  'If you die this evening without the opportunity to communicate with anyone, what would you most regret not having told someone? Why haven’t you told them yet?',
  'What is the greatest accomplishment of your life?',
  'What is your most terrible memory?',
  'What, if anything, is too serious to be joked about?',
  'Share an embarrassing moment in your life.',
];

seedQuestions.forEach(question => {
  db.Question.create({ txt: question });
});
