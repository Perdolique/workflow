# Forms

## Use native form behavior

- Use native inputs, checkboxes, radio buttons, selects, and file inputs when they meet the need. Custom styling must preserve their value and form-submission behavior.
- Give every field a persistent accessible name. Associate help and error text with the field it describes.
- When validation fails, align the field's visible state, `aria-invalid` value, accessible description, and focus destination.

## Show validation at the right time

- Use `:user-invalid` for native constraint errors that should appear after user interaction. Do not use `:invalid` to show an error on an untouched required field.
- Use `aria-invalid="true"` and `aria-describedby` for server errors and custom validation that native constraint state cannot represent.
- Expose each error to assistive technology through the field's accessible state and description in addition to its CSS pseudo-class.
- After a rejected submit, keep each field error near its field. Move focus to the first invalid field or the form alert when the current focus does not make the problem clear.

## Preserve useful input safely

- Preserve correctable values after a recoverable error.
- Clear passwords and other sensitive values after successful completion unless the next required step still needs them.

## Complete file selection

When the task includes a custom file picker, keep the native input and cover the applicable interaction:

- click and keyboard selection;
- drag and drop;
- selected file name, size, and preview when useful;
- replace and remove actions;
- selecting the same file again;
- validation linked to the input;
- cleanup of temporary preview resources.
