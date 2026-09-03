// TapToReview - client side behaviors (no data stored, opens WhatsApp with prefilled message).
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-list');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('open');
      document.body.classList.toggle('no-scroll', !expanded);
    });
  }

  // Sticky header on scroll
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      // let external or empty anchors behave normally
      var href = this.getAttribute('href');
      if (!href || href === '#' || href.startsWith('http')) return;
      e.preventDefault();
      var el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      // toggle this
      this.setAttribute('aria-expanded', String(!expanded));
      var panel = this.nextElementSibling;
      if (!expanded) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });
  });

  // Form: build wa.me link and open in new tab (no server submission)
  var form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var biz = document.getElementById('biz-name').value.trim();
      var city = document.getElementById('biz-city').value.trim();
      var google = document.getElementById('biz-google').value.trim();
      var qty = document.getElementById('biz-qty').value;
      var contact = document.getElementById('biz-contact').value.trim();

      if (!biz || !google || !contact) {
        showToast('Please enter Business Name, Google URL and WhatsApp Number.');
        return;
      }

      var ownerPhone = '917620952720';
      var message =
`Hi TapToReview,

Business: ${biz}
City: ${city}
GoogleURL: ${google}
Quantity: ${qty}
WhatsApp: ${contact}

Please confirm price and delivery.`;

      var url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');

      showToast('Opening WhatsApp with your order — please confirm the message and send.');
    });
  }

  function showToast(text) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.hidden = false;
    t.textContent = text;
    setTimeout(function () {
      t.hidden = true;
    }, 5000);
  }

  // Scroll-reveal animations
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Animated stat counters
  var statEls = document.querySelectorAll('.stat-number');
  if (statEls.length) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
      var duration = 1400;
      var start = performance.now();
      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { statObserver.observe(el); });
    } else {
      statEls.forEach(animateCount);
    }
  }
});
