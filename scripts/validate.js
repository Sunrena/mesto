const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error_visible'
};

function showInputError(formElement, inputElement, errorMessage, enableValidation) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
};

function hideInputError(formElement, inputElement, enableValidation) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(enableValidation.inputErrorClass);    
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, enableValidation) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
    } else {
        hideInputError(formElement, inputElement, enableValidation);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function addInactiveBtn(buttonElement, enableValidation) {
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
};

function removeInactiveBtn(buttonElement, enableValidation) {
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
};

function toggleButtonState(inputList, buttonElement, enableValidation) {
    if (hasInvalidInput(inputList)) {
        addInactiveBtn(buttonElement, enableValidation);
    } else {
        removeInactiveBtn(buttonElement, enableValidation);
    }
};

function resetValidation(formElement, enableValidation) {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, enableValidation);
    });

    toggleButtonState(inputList, buttonElement, enableValidation);
};

function setEventListeners(formElement, enableValidation) {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, enableValidation);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, enableValidation);
            toggleButtonState(inputList, buttonElement, enableValidation);
        });
    });
};

function enableValidate(enableValidation) {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, enableValidation);
    })

}

enableValidate(enableValidation);
