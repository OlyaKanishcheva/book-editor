export const validTextInput = ({input, maxLength}) => {
  if (input.value.length > maxLength) {
    input.classList.add('input-error')
    return false
  } else {
    if (input.classList.contains('input-error')) input.classList.remove('input-error')
    return true
  }
}

export const validNumberInput = ({input, max, min}) => {
  if (+input.value > max || +input.value < min || input.value === '') {
    input.classList.add('input-error')
    return false
  } else {
    if (input.classList.contains('input-error')) input.classList.remove('input-error')
    return true
  }
}

export const validISBNInput = ({input}) => {
  const value = input.value
  let digitValue = value.replace(/[^\d]/g, '')
  let s = 0
  let digitValueArr

  if (value[value.length - 1] === 'X') digitValue += 'X'

  if (value === '') {
    if (input.classList.contains('input-error')) input.classList.remove('input-error')
    return true
  }

  if (digitValue.length === 10) {
    digitValueArr = digitValue.split('').reverse()
    for (let i = 0; i < digitValueArr.length; i++) {
      let num = digitValueArr[i] === 'X' ? 10 : digitValueArr[i]
      s += num * (i + 1)
    }
    if (s % 11 === 0) {
      if (input.classList.contains('input-error')) input.classList.remove('input-error')
      return true
    }
  }

  if (digitValue.length === 13) {
    if (digitValue.substring(0, 3) === '978') {
      for (let i = 0; i < digitValue.length; i++) {
        let num = digitValue[i] === 'X' ? 10 : +digitValue[i]
        s += (i % 2 === 0) ? num : num * 3
      }
      if (s % 10 === 0) {
        if (input.classList.contains('input-error')) input.classList.remove('input-error')
        return true
      }
    }
  }
  
  input.classList.add('input-error')
  input.focus()
  return false
}
