const validTextInput = ({input, maxLength}) => {
	if (input.value.length > maxLength) {
		input.classList.add('input-error')
		return false
	} else {
		if (input.classList.contains('input-error')) input.classList.remove('input-error')
		return true
	}
}

export default validTextInput