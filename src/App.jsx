import React from 'react'

const App = () => {
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" />
          <h1>
            Your One-Stop Shop for All Things <span className="text-gradient">Movies</span>!
          </h1>
        </header>
        <p>
          Search
        </p>
      </div>
    </main>
  )
}

export default App