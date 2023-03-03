interface IHeaderProps {
  courseName: string;
}

const Header = ({ courseName }: IHeaderProps) => {
  return <h1>{courseName}</h1>;
};

interface ICourse {
  name: string;
  exerciseCount: number;
}

interface IContentProps {
  courseParts: ICourse[];
}

const Content = ({ courseParts }: IContentProps) => {
  return (
    <>
      {courseParts.map(({ name, exerciseCount }: ICourse) => (
        <p>
          {name} {exerciseCount}
        </p>
      ))}
    </>
  );
};

interface ITotalProps {
  total: number;
}

const Total = ({ total }: ITotalProps) => {
  return <em>Number of exercises {total}</em>;
};

const App = () => {
  const courseName: string = 'Half Stack application development';
  const courseParts: ICourse[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];
  const total: number = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
