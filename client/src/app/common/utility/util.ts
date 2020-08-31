import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Constants } from '../constant/constants';
import { DatePipe } from '@angular/common';

export class Util {
  public static dateDisplayFormate = Constants.DATE_DISPLAY_FORMATE;
  public static dateDbFormate = Constants.DATE_DB_FORMATE;
  public static datePickerConfig = {
    dateInputFormat: 'DD-MMM-YYYY',
    customTodayClass: 'custom-today-class',
    isAnimated: true,
    adaptivePosition: true
  };

  public static isEmpty(obj?) {
    return (!obj || obj === '' || obj.length === 0);
  }

  public static isNotEmpty(obj?) {
    return !this.isEmpty(obj);
  }

  public static isFormInvalid(formGroup: FormGroup | AbstractControl) {
    return !formGroup || !formGroup.dirty || formGroup.invalid || formGroup.errors;
  }

  public static isFormInputInvalid(formControl: FormControl | AbstractControl) {
    return !formControl || (formControl.touched && (formControl.invalid || formControl.errors));
  }

  public static checkAPIReponse(response?) {
    return response && response.data;
  }

  public static getErrorMessage(error?) {
    return error.error.message;
  }

  public static copyAvailableValuesForSameTypesOfObj(source: any, destination: any) {
    if (source && destination) {
      Object.keys(source).forEach(key => {
        destination[key] = source[key];
      });
    }
  }

  public static setValuesInForm(form: FormGroup, data: any) {
    if (form && data) {
      Object.keys(form.controls).forEach(key => {
        if (data[key]) {
          this.setFormValueRecurvsively(form.controls[key], data[key], key);
        }
      });
    }
  }

  private static setFormValueRecurvsively(formField: any, data: any, key: any) {
    const thiss = this;
    if (formField && data) {
      if (formField instanceof FormGroup) {
        Object.keys(formField.controls).forEach(localKey => {
          if (data[localKey]) {
            thiss.setFormValueRecurvsively(formField.controls[localKey], data[localKey], localKey);
          }
        });
      } else {
        if (formField instanceof FormControl) {
          formField.setValue(data);
        }
      }
    }
  }

  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayField: FormGroup) => {
          this.validateAllFormFields(arrayField);
        });
      }
    });
  }

  public static checkIfAnyControlInFormGroupContainsValues(formGroup: FormGroup, flag: boolean = false) {
    if (formGroup) {
      const controls = formGroup.controls;
      if (controls) {
        Object.keys(controls).forEach(key => {
          if (controls[key] instanceof FormGroup) {
            this.checkIfAnyControlInFormGroupContainsValues((controls[key] as FormGroup), flag);
          }
          if (controls[key].value) {
            flag = true;
          }
        });
      }
    }
    return flag;
  }

  static replaceAll(text, replaceValue, replaceWith) {
    if (text) {
      const regExp = new RegExp(replaceValue, 'g');
      return text.replace(regExp, replaceWith);
    }
    return text;
  }

  public static cloneFormControl(control: AbstractControl) {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.getRawValue()).forEach(key => {
        copy.addControl(key, this.cloneFormControl(control.controls[key]));
      });
      return copy;
    } else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(ctrl => {
        copy.push(this.cloneFormControl(ctrl));
      });
      return copy;
    }
  }

  public static getFormattedDate(date?) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, this.dateDbFormate);
  }

  public static getDisplayDate(date?) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, this.dateDisplayFormate);
  }
}
