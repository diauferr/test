type DFormat = 'short' | 'long';
type DString = string | object;

const dateTimeFormat = (dateString: DString, format: DFormat) => {
  let str;

  switch (typeof dateString) {
    case 'object':
      str = dateString;
      break;
    case 'string':
      str = dateString.length ? Date.parse(dateString) : new Date();
      break;
  }

  try {
    return Intl.DateTimeFormat('pt-br', { dateStyle: format }).format(str);
  } catch {
    return '';
  }
};

const dateShort = (dateString: DString) => dateTimeFormat(dateString, 'short');
const dateLong = (dateString: DString) => dateTimeFormat(dateString, 'long');

export { dateShort, dateLong };
