
// Lấy tất cả các khóa trong Local Storage
const keys = Object.keys(localStorage);

// Kiểm tra từng khóa và lấy giá trị tương ứng
keys.forEach(key => {
    const value = localStorage.getItem(key);
    console.log(`Khóa: ${key}, Giá trị: ${value}`);
});
((event) => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()