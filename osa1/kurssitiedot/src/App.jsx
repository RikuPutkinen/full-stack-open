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

function Total(props) {
  return (
    <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts.map(part => part.exercises)} />
    </div>
  )
}

export default App