document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.querySelector('.next-btn');
    const navBtn = document.querySelector('.btn-nav');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.getElementById('modal');
    const modal = overlay?.querySelector('.modal-window');
    const form = overlay?.querySelector('.modal-form');
  
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }
  
    function openModal() {
   
      document.body.classList.add('modal-open');
      overlay?.classList.add('active');
      setTimeout(() => {
        modal?.classList.add('show');
      }, 10);
    }
  
    function closeModal() {
      if (!modal || !overlay) return;
  
      modal.classList.remove('show');

      setTimeout(() => {
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        form?.reset();
  
      
      }, 300); 
    }
  
    function showError(message) {
      iziToast.error({
        title: 'Error',
        message,
        position: 'topRight',
      });
    }
  
    function showSuccess() {
      iziToast.success({
        title: 'Sent!',
        message: 'Thanks for the feedback 🙌',
        position: 'topRight',
      });
    }
  
    function validateForm() {
      const name = form?.elements.name.value.trim();
      const email = form?.elements.email.value.trim();
      const message = form?.elements.message.value.trim();
  
      if (!name || name.length < 2 || name.length > 10) {
        showError('Name must be 2–10 characters');
        return false;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        showError('Enter a valid email');
        return false;
      }
  
      if (!message || message.length < 10 || message.length > 512) {
        showError('Message must be 10–512 characters');
        return false;
      }
  
      return true;
    }
  
    nextBtn?.addEventListener('click', openModal);
    navBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
  
    overlay?.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  
    form?.addEventListener('submit', e => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      setTimeout(() => {
        closeModal();
        showSuccess();
      }, 500);
    });
  });
  