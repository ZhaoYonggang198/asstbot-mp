function getInitArray (max, value) {
  let arr = new Array(max)
  for (let i = 0; i < max; i++) {
    arr[i] = value
  }
  return arr
}

function verifyRanges (max, ranges) {
  if (!ranges || ranges.length === 0) return true
  if (max <= 0) return false
  let arr = getInitArray(max, false)
  for (let range of ranges) {
    if (range[0] > range[1]) return false
    if (range[0] < 0 || range[0] >= max) return false
    if (range[1] < 0 || range[1] >= max) return false
    for (let i = range[0]; i <= range[1]; i++) {
      if (arr[i]) return false
      arr[i] = true
    }
  }
  return true
}

function getFreeRange (maxCount, occupiedRanges) {
  if (!verifyRanges(maxCount, occupiedRanges)) return { min: 0, max: 0 }
  let arr = getInitArray(maxCount, false)
  for (let range of occupiedRanges) {
    for (let i = range[0]; i <= range[1]; i++) {
      arr[i] = true
    }
  }
  for (let i = 0; i < maxCount; i++) {
    if (!arr[i]) {
      let j = i + 1
      while (j < maxCount) {
        if (arr[j]) {
          break
        }
        j++
      }
      return { min: i, max: j - 1 }
    }
  }

  return { min: 0, max: 0 }
}

const state = {
  survey: {}
}

const getters = {
}

const mutations = {
  updateSurveyAvatarUrl (state, avatarUrl) {
    state.survey.avatarUrl = avatarUrl
  },
  updateSurveyTitle (state, title) {
    state.survey.title = title
  },
  updateSurveyIntro (state, intro) {
    state.survey.intro = intro
  },
  updateCurrentSurvey (state, survey) {
    state.survey = JSON.parse(JSON.stringify(survey))
  },
  updateConclusionMinScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.min = value
  },
  updateConclusionMaxScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.max = value
  },
  updateConclusionText (state, {index, text}) {
    state.survey.conclusions[index].text = text
  },
  updateConclusionimage (state, {index, imageUrl}) {
    state.survey.conclusions[index].imageUrl = imageUrl
  },
  deleteConclusionImage (state, {index}) {
    state.survey.conclusions[index].imageUrl = ''
  },
  addConclusion (state) {
    let subjectCount = state.survey.subjects.length
    let range = getFreeRange(subjectCount, state.survey.conclusions.map((c) => { return [c.scoreRange.min, c.scoreRange.max] }))
    state.survey.conclusions.push({ scoreRange: {min: range.min, max: range.max}, text: '', imageUrl: '' })
  },
  addQuizConclusion (state) {
    state.survey.conclusions.push({ text: '', imageUrl: '' })
  },
  removeConclusion (state, index) {
    state.survey.conclusions.splice(index, 1)
    if (state.survey.type === 'quiz') {
      let jumpPos = state.survey.subjects.length + index
      this.commit('removeQuizConclusion', jumpPos)
    }
  },
  removeQuizConclusion (state, jumpPos) {
    console.log('remove jump pos', jumpPos)
    state.survey.subjects.forEach(subject => {
      subject.answers.forEach(answer => {
        if (answer.next > jumpPos) {
          answer.next = 0
        }
      })
    })
  },
  addSubject (state) {
    if (state.survey.type === 'quiz') {
      this.commit('removeQuizConclusion', state.survey.subjects.length)
    }
    state.survey.subjects.push({
      id: state.survey.subjects.length + 1,
      type: 'radio',
      question: '',
      imageUrl: '',
      answers: []})
  },
  removeSubject (state, index) {
    state.survey.subjects.splice(index, 1)
    if (state.survey.type === 'quiz') {
      this.commit('removeQuizConclusion', index)
    }
  },
  clearSurvey (state) {
    state.survey.subjects = []
    state.survey.conclusions = []
  },
  // updateSubjectType (state, {index, type}) {
  //   var oldType = state.survey.subjects[index].type
  //   if (type === 'date' || type === 'phone' || type === 'location') {
  //     if (oldType !== type) {
  //       state.survey.subjects[index].answers = []
  //       state.survey.subjects[index].type = type
  //     }
  //     return
  //   }

  //   if (type === 'radio' && oldType !== 'radio') {
  //     var findFirstRadio = false
  //     var answers = state.survey.subjects[index].answers
  //     answers = answers.map((answer) => {
  //       if (answer.correct && !findFirstRadio) {
  //         findFirstRadio = true
  //       } else {
  //         answer.correct = false
  //       }
  //       return answer
  //     })
  //     state.survey.subjects[index].answers = answers
  //   }
  //   state.survey.subjects[index].type = type
  //   if (type === 'date') {
  //     state.survey.subjects[index].nlu = true
  //   } else {
  //     state.survey.subjects[index].nlu = false
  //   }
  // },
  updateSubjectQuestion (state, {index, question}) {
    state.survey.subjects[index].question = question
  },
  updateSubjectQuestionImage (state, {index, imageUrl}) {
    state.survey.subjects[index].imageUrl = imageUrl
  },
  deleteSubjectQuestionImage (state, {index}) {
    state.survey.subjects[index].imageUrl = ''
  },
  removeAnswer (state, {subject, answer}) {
    state.survey.subjects[subject].answers.splice(answer, 1)
  },
  updateAnswerValue (state, {subject, index, value}) {
    console.log(state)
    state.survey.subjects[subject].answers[index].value = value
  },
  updateAnswerImagePath (state, {subject, index, value}) {
    state.survey.subjects[subject].answers[index].imageUrl = value
    console.log(state.survey)
  },
  updateAnswerCorrect (state, {subject, index, value}) {
    state.survey.subjects[subject].answers[index].correct = value
  },
  updateAnswerNext (state, {subject, index, next}) {
    state.survey.subjects[subject].answers[index].next = next
  }
}

const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
