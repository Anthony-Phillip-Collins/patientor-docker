interface IHeaderProps {
  courseName: string;
}

interface IContentProps {
  courseParts: CoursePart[];
}

interface IPartProps {
  coursePart: CoursePart;
}

interface ITotalProps {
  total: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackround extends CoursePartWithDescription {
  backroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: 'special';
}
type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;

const Header = ({ courseName }: IHeaderProps) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ coursePart }: IPartProps) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const base = (
    <>
      <strong>
        {coursePart.name} {coursePart.exerciseCount}
      </strong>
    </>
  );

  let result = <></>;

  switch (coursePart.kind) {
    case 'basic':
      result = (
        <>
          {base}
          <em>{coursePart.description}</em>
        </>
      );
      break;
    case 'group':
      result = (
        <>
          {base}
          <em>Group projects: {coursePart.groupProjectCount}</em>
        </>
      );
      break;
    case 'background':
      result = (
        <>
          {base}
          <em>{coursePart.description}</em>
          <div>Read more: {coursePart.backroundMaterial}</div>
        </>
      );
      break;
    case 'special':
      result = (
        <>
          {base}
          <em>{coursePart.description}</em>
          <div>
            Requirements:{' '}
            {coursePart.requirements.map((str, i) => (
              <span key={str}>
                {str}
                {i < coursePart.requirements.length - 1 && ', '}
              </span>
            ))}
          </div>
        </>
      );
      break;
    default:
      assertNever(coursePart);
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}
    >
      {result}
    </div>
  );
};

const Content = ({ courseParts }: IContentProps) => {
  return (
    <>
      {courseParts.map((part: CoursePart) => (
        <Part coursePart={part} key={part.name} />
      ))}
    </>
  );
};

const Total = ({ total }: ITotalProps) => {
  return <em>Number of exercises {total}</em>;
};

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    kind: 'basic',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: 'group',
  },
  {
    name: 'Basics of type Narrowing',
    exerciseCount: 7,
    description: 'How to go from unknown to string',
    kind: 'basic',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    backroundMaterial:
      'https://type-level-typescript.com/template-literal-types',
    kind: 'background',
  },
  {
    name: 'TypeScript in frontend',
    exerciseCount: 10,
    description: 'a hard part',
    kind: 'basic',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    kind: 'special',
  },
];

const App = () => {
  const courseName: string = 'Half Stack application development';
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
