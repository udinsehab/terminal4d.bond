const kelas = document.querySelectorAll('.bankscroll div');
console.log(kelas);

kelas[13].classList.toggle("ovo")
kelas[15].classList.toggle("gopay")
kelas[19].classList.toggle("linkaja")
kelas[21].classList.toggle("bsi")

// menghapus mandiri dan cimb niaga karena belum ada gif
kelas[2].remove()
kelas[3].remove()
kelas[10].remove()
kelas[11].remove()

const ketBank = document.querySelector('center');
ketBank.remove();


const jdwBank = document.getElementsByTagName('h4');
jdwBank[2].remove();

const ref = document.querySelector("regis-ref-color");
console.log(ref);

// <script>
//  window.addEventListener("load", function(event) {
//   var left = (screen.width/2)-(600/2);
//     var top = (screen.height/2)-(500/2);
//     var string = '<li><a href="https://xn--termnl4drtp-o7a8m.com" target="_blank"><i class="fa fa-wpforms"></i> Prediksi RTP</a></li>';
//     $(".sidebar-nav").append(string);
//   });
// </script>