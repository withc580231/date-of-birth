import DateOfBirth from './date-of-birth';
DateOfBirth.install = Vue => Vue.component(DateOfBirth.name, DateOfBirth);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DateOfBirth);
}

export default DateOfBirth