const pool = require("../config/db");

async function getQuestions() {
  const result = await pool.query(
    `SELECT q.id AS question_id, q.category, q.question, q.correct_answer_id,
            q.explanation, o.id AS option_id, o.option
     FROM questions AS q
     JOIN questions_options AS qo ON qo.question_id = q.id
     JOIN options AS o ON o.id = qo.option_id
     ORDER BY q.id, o.id`,
  );

  const questionsById = new Map();
  for (const row of result.rows) {
    if (!questionsById.has(row.question_id)) {
      questionsById.set(row.question_id, {
        id: row.question_id,
        category: row.category,
        question: row.question,
        correctAnswerId: row.correct_answer_id,
        explanation: row.explanation,
        options: [],
      });
    }
    questionsById.get(row.question_id).options.push({ id: row.option_id, label: row.option });
  }

  return [...questionsById.values()];
}

module.exports = { getQuestions };