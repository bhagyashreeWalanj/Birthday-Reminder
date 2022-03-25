import React, { useState } from 'react';
import './App.css';
import data from './mockup';
import List from './List';

function App() {
  const [people, setPeople] = useState(data)

  return (
    <main>
      <section className='container'>
        <h3>{people.length} Birthdays today</h3>
        <div role="listitem"><List people={people} /></div>
        <button onClick={() => setPeople([])} >clear all</button>
        <button onClick={() => setPeople(data)}>Reset</button>
      </section>
    </main>
  );
}

export default App;
