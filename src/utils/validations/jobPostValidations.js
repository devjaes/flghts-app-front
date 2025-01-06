export const jobPostValidations = (values) => {
  const errors = {};
  if (values.title.trim() === '') {
    errors.title = 'Título es requerido!'
  }
  if (values.department.trim() === '') {
    errors.department = 'Departamento es requerido!'
  }
  if (values.category.trim() === '') {
    errors.category = 'Categoría es requerido!';
  }
  if (values.type.trim() === '') {
    errors.type = 'Tipo es requerido!';
  }
  if (values.description.trim() === '') {
    errors.description = 'Descripción es requerido!'
  } else if (values.description.trim().length < 200) {
    errors.description = 'Descripción debe ser mayor a 200 carcateres'
  }
  if (!values.dueDate) {
    errors.dueDate = 'Fecha de expiración es requerido!'
  }
  if (!values.experience) {
    errors.experience = 'Experiencia es requerido!'
  }
  if (!values.positions || values.positions === 0) {
    errors.positions = 'Posiciones es requerido!'
  }
  if (values.qualifications.length === 0) {
    errors.qualifications = 'Calificación es requerido!'
  }
  return errors;
}