const Cohort = require('./Cohort.js')
const Student = require('./Student.js')

class CohortManager {
  constructor() {
    this.id = 1
    this.cohorts = []
  }

  createCohort(name) {
    const newCohort = new Cohort(name)
    this.cohorts.push(newCohort)
    return this.cohorts
  }

  searchCohorts(name) {
    const cohort = this.cohorts.find((cohort) => cohort.name === name)
    if (cohort === undefined) throw new Error('cohort not found')
    return cohort
  }

  addStudent(name, firstName, lastName, github, email) {
    const student = new Student(firstName, lastName, github, email)
    student.id = this.id++
    const cohort = this.searchCohorts(name)
    cohort.students.push(student)
    return cohort.students
  }

  removeCohort(name) {
    const cohort = this.searchCohorts(name)
    if (cohort === undefined) throw new Error('cohort not found')
    const index = this.cohorts.indexOf(cohort)
    this.cohorts.splice(index, 1)
    return this.cohorts
  }

  removeStudent(name, id) {
    const cohort = this.searchCohorts(name)
    if (cohort === undefined) throw new Error('cohort not found')
    const student = cohort.students.find((stu) => stu.id === id)
    if (student === undefined) throw new Error('student not found')
    const index = cohort.students.indexOf(student)
    cohort.students.splice(index, 1)
    return cohort.students
  }
}

const cohortManager = new CohortManager()
cohortManager.createCohort('cohortOne')

cohortManager.addStudent('cohortOne', 'Tim', 'Timson', 'timsgit', 'tim@son.com')
cohortManager.addStudent('cohortOne', 'T', 'T', 'tims', 'tim@son.com')

console.log(cohortManager.cohorts[0])
// console.log(cohortManager)
// console.log(cohortManager.searchCohorts('cohortOn'))

module.exports = CohortManager