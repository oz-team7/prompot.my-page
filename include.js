function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("data-include");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            // innerHTML로 삽입된 스크립트는 실행되지 않으므로,
            // 스크립트 태그를 찾아서 새로 생성하고 DOM에 다시 추가하여 실행시킵니다.
            const scripts = elmnt.querySelectorAll("script");
            scripts.forEach(oldScript => {
              const newScript = document.createElement("script");
              // 기존 스크립트의 속성을 복사합니다 (예: src)
              Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
              newScript.textContent = oldScript.textContent; // 인라인 스크립트 내용 복사
              oldScript.parentNode.replaceChild(newScript, oldScript);
            });
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          elmnt.removeAttribute("data-include");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  // 모든 include가 완료되면 커스텀 이벤트를 발생시킵니다.
  const event = new Event('htmlIncluded');
  document.dispatchEvent(event);
}