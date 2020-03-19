class FormValidator {
    static checkInputValidity(input, error) {
        for (let key in ERROR_MESSAGES) {
            if (input.validity[key]) {
                return error.textContent = ERROR_MESSAGES[key]
            }
        }
        error.textContent = '';
    }

    static setSubmitButtonState(form, button) {
        button.disabled = !form.checkValidity();

        if (form.checkValidity()) {
            button.classList.add('button_enabled');
        }

        if (!form.checkValidity()) {
            button.classList.remove('button_enabled');
        }
    }

    setEventListeners(popup) {
        const form = popup.querySelector('form');
        const button = form.querySelector('button[type="submit"]');

        function validate(event) {
            FormValidator.checkInputValidity(event.target, event.target.closest('div').querySelector('.error'));
            FormValidator.setSubmitButtonState(form, button);
        }

        form.addEventListener('input', validate);
    }
}