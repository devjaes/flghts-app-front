export const createBlogValidations = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Requerido!";
  }
  if (!values.description) {
    errors.description = "Requerido!";
  }
  if (values.images.length === 0) {
    errors.images = "Requerido!";
  }

  return errors;
};
