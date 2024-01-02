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
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App