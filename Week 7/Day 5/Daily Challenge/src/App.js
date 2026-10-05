import { useState } from "react";

const initialLanguages = [
  { name: "PHP", votes: 0, symbol: "🐘", color: "violet" },
  { name: "Python", votes: 0, symbol: "🐍", color: "blue" },
  { name: "JavaScript", votes: 0, symbol: "🟨", color: "yellow" },
  { name: "Java", votes: 0, symbol: "☕", color: "orange" },
];

function App() {
  const [languages, setLanguages] = useState(initialLanguages);
  const totalVotes = languages.reduce((total, language) => total + language.votes, 0);
  const leadingLanguage = languages.reduce(
    (leader, language) => (language.votes > leader.votes ? language : leader),
    languages[0]
  );

  function addVote(languageName) {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language
      )
    );
  }

  return (
    <main className="page">
      <section className="voting-app" aria-labelledby="page-title">
        <header className="app-header">
          <span className="eyebrow">THE COMMUNITY POLL</span>
          <h1 id="page-title">Pick your language</h1>
          <p>Which programming language gets your vote?</p>
        </header>

        <div className="language-list">
          {languages.map((language) => (
            <article className={`language-card ${language.color}`} key={language.name}>
              <div className="language-info">
                <span className="language-symbol" aria-hidden="true">
                  {language.symbol}
                </span>
                <div>
                  <h2>{language.name}</h2>
                  <p>
                    {language.votes} {language.votes === 1 ? "vote" : "votes"}
                  </p>
                </div>
              </div>
              <button
                className="vote-button"
                type="button"
                onClick={() => addVote(language.name)}
                aria-label={`Vote for ${language.name}`}
              >
                <span aria-hidden="true">▲</span> Vote
              </button>
            </article>
          ))}
        </div>

        <footer className="poll-summary" aria-live="polite">
          <span>
            Total votes <strong>{totalVotes}</strong>
          </span>
          <span>
            Leading <strong>{leadingLanguage.votes ? leadingLanguage.name : "—"}</strong>
          </span>
        </footer>
      </section>
    </main>
  );
}

export default App;
