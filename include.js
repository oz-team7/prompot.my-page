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
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
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
}

// 로그인 모달을 제어하는 이벤트 리스너입니다.
// 모든 페이지에서 공통으로 사용되므로 include.js에 추가합니다.
document.addEventListener('click', function(event) {
  // data-include 속성을 가진 요소가 처리된 후에 loginModal이 존재할 수 있으므로,
  // 이벤트 발생 시점에 요소를 찾습니다.
  const modal = document.getElementById('loginModal');
  if (!modal) return;

  // '로그인' 버튼(#loginBtn)을 클릭했을 때 모달을 엽니다.
  if (event.target.id === 'loginBtn') {
    modal.style.display = "flex";
  }

  // 닫기 버튼(.close)을 클릭했을 때 모달을 닫습니다.
  if (event.target.classList.contains('close')) {
    modal.style.display = "none";
  }

  // 모달 창 바깥의 어두운 배경을 클릭했을 때도 모달을 닫습니다.
  if (event.target === modal) {
    modal.style.display = "none";
  }
});