namespace App {
  // validation
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  // 사용자 입력 검증
  export function validate(validatableInput: Validatable) {
    let isValid = true;
    // 매개변수에 required가 있을 때
    if (validatableInput.required) {
      // && 연산자의 경우 하나라도 false면 그 전체의 값은 false가 된다.
      // 들어온 값의 길이가 0이 아니라면 true
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // 매개변수에 minLength가 있을 때 value의 길이가 minLength보다 길다면 true
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    // 매개변수에 maxLength가 있을 때 value의 길이가 maxLength보다 작다면 true
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    // 매개변수에 min이 있을 때 value의 값이 min보다 크다면 true
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    // 매개변수에 max가 있을 때 value의 값이 max보다 작다면 true
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  }
}
