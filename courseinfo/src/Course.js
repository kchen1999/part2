const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((a, b) => a + b)
  return <h4>total of {sum} exercises</h4>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}></Part>)}
  </>

const Course = ({ courses }) => {
  return courses.map(course => 
    <div key={course.id}>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default Course;