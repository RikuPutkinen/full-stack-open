function Header({ name }) {
  return (
    <h1>{name}</h1>
  )
}

function Part({ name, exercises }) {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

function Content({ parts }) {
  return (
    <div>
      {parts.map(part => {
        return (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
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
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </>
  )
}

export default Course