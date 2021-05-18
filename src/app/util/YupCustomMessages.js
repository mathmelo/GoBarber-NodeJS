/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

/**
 * This function will create a callback with all necessary personalized messages
 */

export default setLocale({
  mixed: {
    default: 'Check fields',
    notType: 'The field is not a ${type}',
    required: 'The field ${path} must be required',
    oneOf: 'The field ${path} must be the same as ${values}',
  },
  string: {
    trim: 'The field must be trimmed',
    url: 'The url must be valid',
    min: 'The string field must be at least ${min} digits',
    max: 'The string field must be at least ${max} digits',
    email: 'E-mail must be valid',
    matches: 'The string field must be match the regex',
    uuid: 'The uuid must be valid',
    length: 'The field must be exactly ${length} characters',
  },
  number: {
    min: 'The number field must be at least ${min} digits',
    max: 'The number field must be at least ${max} digits',
    positive: 'The number field must be positive',
    integer: 'The number field must be integer',
  },
});
