/* day / night: the theme is set before paint by the inline snippet in <head>; this file adds the switch,
   follows the system setting until the visitor chooses, and swaps the logos for their day (dark-ink) versions. */
(function () {
  var root = document.documentElement;
  var DAY = {
    h: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAABQBAMAAABR4QJhAAAAMFBMVEX2amwVGBYVGBYWGBcWGRf4bG73cHL4c3P6lZb0jY6vXV5MMzFSPjyzWFgAAAAWGRe3sB9AAAAAEHRSTlP7ol8p06RYK1Ak+PuCswD9x41bdAAABQdJREFUeNq1mU9s22QYxn/umnbDyepGDIFYWUbphXVbtpbTBI3W7jQBKaLssFFNXLohhHrh323iwAlVBYk/hQtim4Q2JMwQmoSolGk3Oqa0jAukJd2QmNTJS5NYLSuJOfizY7tp6mz2d0jsz1+e783zvu/zvvkiaYQ5WjZ6cORIEPBSfeuH/gKIz4Rj/WB+7/z83O7ldCjWl5M5AEqxUKwfyAEMkQrFtXoFoJSnGAp8VQHKB3K6HAp8OgPs7zW3ebDRWovFAkgzAAVgsEs1twnIer0D0LrTwDLoixlYJEDr57PA0A1AguGdoEcDhJd1gJ9LySzAQg6qiSA1p4O+NMRKIFPaCRxQN/zUcGdnZ1trk/BXfktBNoVOKgODOxt/Um7OejUdnbuVJvY3hl6B0uKDx43TtVIeeXY/7EKpJhjK5wgUPqpDdLbnTzV1re9K33IvwcKzHYjuTv1YoEhLILa7RCGTBr57WNbLcnSGwOFb8oD8darDUAhqOMiRtwA8tGMLmcDgW4DX4vF4fBwySQBNsqvI+/F4PP5YIOSoZsbC93eWrblCsHo/+xQQ1SXC4B6iu7olpdBRCauNmp5T6LxKSNaDfA1K4TaBUrjwYbewSrjkFEJz7cajPFC4j465lTFUgJUxc2IKOcHaGwBcBPh3jC2fMnh9ARj8tpQEpL0AdAN0ZexLgFjWbGv2md0H3g5Z0zRNu+2e26otGuY4fNcwDKM4YBiGUXzRMAzjCU3TNM2wRlHTNE0T65c1f5Gjv2nlXU/9BfYPgVitNMGrPgPzhN2TLG22NAkgWve8P/hmetnfAUgA6Bl/8BHVP3wVoKyKS1/wU02E4va0nU0nfMI/7g85IQiHo9ZVK1NcVoFtk5XXPctPr3wFtH0UMR1VPNhxc2lzBbjxX416WhnhMkBkZNULv+MmgHRMKPSzM5DIN4CvWJvY1PsiZ9RUhQxwdXN25BQGAL0+4U2JOwQQbdjzZ8Umo/ZmvuH1zOZibbJ4jjxAUW2mnIj63rDDiqYBYnredrRveFEi9YaLTMc/B8CeuvCTdurdx7gEwELNz76tN5qsfUW1LnyhMdbx+oItRElOeHbyY71ia4nFriMOky5zsvbDPV54qWb9GgDjghWltkl5Xdaeq8ErzhYsYcMrAKti+psasEX6eQDOAjxfn+5Rd2ja1Nesv/fuafP9DKyoABFz37VTb5tK+3Ja78uuI03uEXph3ufdRbHWiHwh3j++bVx0NYMXhOem9eMLddqtO3Fln2r795JVEzM2vCfRL9i+GJ80r06KuPAUrfOit3DmtcVGpkbdeP2AOUZEXI00qHseL4jQLDnm2qyS6pVXy5RtjSTGE4qKVQdt+K0WG67lbeO0i4nVZCOltlIr65jLO7+R4PbeJ87lp+zgZe0He9bVRp113jxtbpJ3qLeA/8DqCE7WVrefAd4RNx8+Yx24uZrY6EGHxmQd/qi6/LH1pKBjwsZ/5R+A9rdMpyg/mVaXLroFedrGPywS7gUX9SLuJyJfEnnpM5h45O6SSmT40TPm4/ekP9TI8Ofwy5OlQ/r1HEY/IJ/vF3E6fWuglFTTv9qtecKtTFKw5/flLoBiJaTfVl4ZDhj+qCMDQoBPOF6D595LfcDWx9YdQQUKn/JQHzB81kN9sNyvoz5Y69dRHyx80kt9oOTo5qH23ZCsr7rqYODwo24xbupExMc41w+ec30p3D9U/wevw4y7zQMrdQAAAABJRU5ErkJggg==',
    f: 'data:image/png;base64,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'
  };
  var he = (root.lang || '').indexOf('he') === 0;
  var label = { light: he ? 'מצב לילה' : 'Night mode', dark: he ? 'מצב יום' : 'Day mode' };
  var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z"/></svg>';
  var logos = [];
  function grab() {
    Array.prototype.forEach.call(document.querySelectorAll('.brand img, .fbrand img'), function (im) {
      logos.push({ im: im, night: im.getAttribute('src'), day: im.closest('.fbrand') ? DAY.f : DAY.h });
    });
  }
  var btn;
  function apply(t) {
    root.dataset.theme = t;
    logos.forEach(function (l) { l.im.src = t === 'light' ? l.day : l.night; l.im.dataset.day = ''; });
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === 'light' ? '#F3F2EE' : '#121413';
    if (btn) { btn.innerHTML = t === 'light' ? MOON : SUN; btn.setAttribute('aria-label', label[t]); btn.title = label[t]; }
  }
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  document.addEventListener('DOMContentLoaded', function () {
    grab();
    var bar = document.querySelector('header .bar');
    if (bar) {
      btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'theme';
      btn.addEventListener('click', function () {
        var t = root.dataset.theme === 'light' ? 'dark' : 'light';
        try { localStorage.setItem('theme', t); } catch (e) {}
        apply(t);
      });
      bar.appendChild(btn);
    }
    apply(root.dataset.theme === 'light' ? 'light' : 'dark');
    var mq = matchMedia('(prefers-color-scheme: light)');
    var onSys = function (e) { if (!stored()) apply(e.matches ? 'light' : 'dark'); };
    if (mq.addEventListener) mq.addEventListener('change', onSys); else if (mq.addListener) mq.addListener(onSys);
  });
})();
