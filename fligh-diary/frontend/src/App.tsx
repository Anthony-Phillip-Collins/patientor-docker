import { useEffect, useState } from 'react';
import { getDiaries } from './services/diaryService';
import { Diary } from './types/Diary';

const dummy:Diary[] = [
  {
    id: 1,
    date: "2017-01-01",
    weather: "rainy",
    visibility: "poor"
  },
  {
    id: 2,
    date: "2017-04-01",
    weather: "sunny",
    visibility: "good"
  },
  {
    id: 3,
    date: "2017-04-15",
    weather: "windy",
    visibility: "good"
  },
  {
    id: 4,
    date: "2017-05-11",
    weather: "cloudy",
    visibility: "good"
  }
];

function App() {
  const [diaries,setDiaries] = useState<Diary[]>([]);

useEffect(()=>{
  const d = async () => {
    const d = await getDiaries();
    setDiaries(dummy);
    console.log('?', d);
  }
  d();
},[])

  return (
    <div className="App">
      <h1>{diaries.map(d=>(<p key={d.id}>{d.weather}</p>))}</h1>
    </div>
  );
}

export default App;
