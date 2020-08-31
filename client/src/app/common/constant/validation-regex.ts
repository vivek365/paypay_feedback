import { Validators } from '@angular/forms';

export class ValidationRegex {
    public static EMAIL = Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    public static NUMBER_WITH_OR_WITHOUT_DECIMAL = Validators.pattern(/^\d*\.?\d*$/);
    public static NUMBER_WITH_DECIMAL = Validators.pattern(/^\d+(\.\d+)?$/);
    public static NUMBER_ONLY = Validators.pattern(/^[0-9]*$/);
    public static NUMBER_WITH_DECIMAL_AND_NEGATIVE = Validators.pattern(/^[-+]?\d+(\.\d+)?$/);
    public static WORDS_ONLY = Validators.pattern(/^[a-zA-Z]*$/);
    public static NAME = Validators.pattern(/^[a-zA-Z ]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$/);
}
