function Header(props) {
  return (
    <h1>{props.course}</h1>
  )
}

function Part(props) {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

function Content(props) {
  return (
    <div>
      {props.parts.map(part => {
        return (
          <Part key={part.name} part={part.name} exercises={part.exercises} />
        )
      })}
    </div>
  )
}

function Total({ exercises }) {
  const total = exercises.reduce((total, current) => total + current, 0)
  return (
    <p>Number of exercises: {total}</p>
  )
}

function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App