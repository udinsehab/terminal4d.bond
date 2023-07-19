var jsGet = $('script[src*=hasillengkap]');
var vtimer = jsGet.attr('Timer');
$(document).ready(function() {
    //if(parseInt(vtimer) > localStorage.getItem("hasillengkap_exp") && localStorage.getItem("hasillengkap_exp")){
        localStorage.removeItem("hasillengkap_exp");
        localStorage.removeItem("hasillengkap");
    //}
    function infohasildropdown(){
        if(!localStorage.getItem("hasillengkap")){
            var dataString = {};
            $.ajax({
                type: 'POST',
                url: 'load_hasil_lengkap.php',
                dataType: 'JSON',
                data: dataString,
                success: function(res) {
                    // console.log(res);
                    localStorage.setItem("hasillengkap", JSON.stringify(res));
                    if(!localStorage.getItem("hasillengkap_exp")){
                        localStorage.setItem("hasillengkap_exp",parseInt(vtimer)+86400);
                    }
                    loadInfohasildropdown();
                },
                error: function(res) { 
                    alert(res);
                }
            });
        }else{
            loadInfohasildropdown();
        } 
    }
    infohasildropdown();
    function loadInfohasildropdown(){
        var htmlText1 = JSON.parse(localStorage.getItem("hasillengkap"));
        // console.log(htmlText1);
        var gamenow = document.getElementById('gamenow').value;
        var isi = ""; var sar1='';var pasar1='';
        var pool ="";
        var xx = [];
        var data = "";
        var shioOptions = "";
        for(p=0;p<htmlText1.length;p++){
            var pasar      = htmlText1[p]["pasar"]; 
            pasar = pasar.split(' ').join('_');
            var pcode      = htmlText1[p]["pcode"];
            var kode       = htmlText1[p]["kode"]; 
            var id         = htmlText1[p]["id"];
            var jenis      = htmlText1[p]["jenis"];
            var gametype   = htmlText1[p]["gametype"];
            var angka      = htmlText1[p]["angka"];
            var periode    = htmlText1[p]["periode"];
            var tanggal    = htmlText1[p]["tanggal"];        
            var wakbuka    = htmlText1[p]["wakbuka"];
            var tournament = htmlText1[p]["tournament"];
            var prize123   = htmlText1[p]["prize123"];
            if(p=='0'){
                sar1 = pcode;
                pasar1 = pasar;
            }
            // console.log(jenis);
            if (jenis!="minigame") {
                pool="POOL";
            }else{
                pool="";
            }
            if(shioOptions!="" && pasar.toLowerCase()=="shio"){
                shioOptions = shioOptions+'-'+kode;
            }else{
                if (gamenow.replace(/\s|_/g, '').toLowerCase()==pasar.replace(/\s|_/g, '').toLowerCase()) {
                    isi = isi +'<option value='+pcode+'-'+pasar+'-'+prize123+' selected>'+pasar+' '+pool+'</option>';
                }else{
                    isi = isi +'<option value='+pcode+'-'+pasar+'-'+prize123+'>'+pasar+' '+pool+'</option>';
                }
                if(pasar.toLowerCase()=="shio"){
                    shioOptions = shioOptions+'-'+kode;
                }
            }                   
        }
        document.getElementById('nama-pasar').innerHTML = pasar1.replace(/_/g, ' '); 
        document.getElementById('pool-name').innerHTML = isi; 
        top10result(sar1,prize123);
    }

});

function move(x) {
    var data = x.split("-");
    top10result(data[0],data[2]);
    document.getElementById('nama-pasar').innerHTML = data[1].replace(/_/g, ' '); 
}

function top10result(sar,prize123=0){
    if(prize123>1){
        prize123 = 1;
    }
    //if(parseInt(vtimer) > localStorage.getItem("top10result_exp") && localStorage.getItem("top10result_exp")){
        localStorage.removeItem("top10result_exp");
        localStorage.removeItem("top10result");
    //}
    // if(!localStorage.getItem("top10result")){
        var dataString = {};
        dataString["sar"] = sar ;
        $.ajax({
            type: 'POST',
            url: 'load_top10_result.php',
            dataType: 'JSON',
            data: dataString,
            success: function(res) {
                localStorage.setItem("top10result", JSON.stringify(res));
                if(!localStorage.getItem("top10result_exp")){
                    localStorage.setItem("top10result_exp",parseInt(vtimer)+86400);
                }
                loadtop10result(sar,prize123);
            },
            error: function(res) { 
                alert(res);
            }
        });
    // }else{
    //     loadtop10result(sar);
    //     console.log(sar);
    // } 
}

function loadtop10result(sar,prize123=0){
    var top10result = JSON.parse(localStorage.getItem("top10result"));
    var htmlText1 = ''; var angka =''; var tanggal =''; var hari =''; var periode ='';var jenisgame='';
    var g = '';var gcolor = '';var bsr = '';var bsrcolor = '';
    jenisgame = '';
    const pcode_arr = ["p6", "p9", "p12", "p7", "p7b"];
    
    if((pcode_arr.includes(sar) || sar.substring(0, 1) == 'm') && sar!=='m17' && sar!=='m51'){
        jenisgame = 'minigame';        
    }else if(sar.substring(0, 1) == 'o'){
        jenisgame = 'pool5d'; 
    }else if(sar.substring(0, 1) == 'q'){
        jenisgame = 'pool3d'; 
    }else if(sar.substring(0, 1) == 's'){
        jenisgame = 'shio'; 
    }else{
        jenisgame = 'pool4d'; 
    }
    // console.log(sar);
    // console.log(jenisgame);
    // console.log(top10result);
    htmlText1 = htmlText1+'<table class="table table-bordered theTable legend">';
    htmlText1 = htmlText1+'<thead><th class="text-center">Periode</th>';
    if((jenisgame == 'pool4d') && sar!=='m17' && sar!=='m51'){
        htmlText1 = htmlText1+'<th class="text-center">Hari</th>';
    }
    htmlText1 = htmlText1+'<th class="text-center">Tanggal</th>';
    if (sar!=="m24") {
        htmlText1 = htmlText1+'<th class="text-center">Nomor</th>';
    }
    if(prize123 == "1"){
        htmlText1 = htmlText1+'<th class="text-center">Nomor 2</th>';
        htmlText1 = htmlText1+'<th class="text-center">Nomor 3</th>';
    }
    if(sar == "p6" ||sar == "p9" || sar == "p7" || sar == "p7b" ||sar == "p12" ||sar == "m8" ||sar == "m6" ||sar == "m13" || sar == "m35"){
        htmlText1 = htmlText1+'<th class="text-center">Ganjil/Genap</th>';
        htmlText1 = htmlText1+'<th class="text-center">Besar/Kecil</th>';
    }else if(sar == "m22" ||sar == "m28"){
        htmlText1 = htmlText1+'<th class="text-center">Banker</th>';
        htmlText1 = htmlText1+'<th class="text-center">Player</th>';
    }else if(sar == "m23"){
        htmlText1 = htmlText1+'<th class="text-center">Dragon</th>';
        htmlText1 = htmlText1+'<th class="text-center">Tiger</th>';
    }else if(sar == "m11"){
        htmlText1 = htmlText1+'<th class="text-center">Red/White</th>';        
    }else if(sar == "m14" || sar=="m16"){
        htmlText1 = htmlText1+'<th class="text-center">Result</th>';
    }else if(sar == "m10"){
        htmlText1 = htmlText1+'<th class="text-center">Head/Tail</th>';
        htmlText1 = htmlText1+'<th class="text-center">Kiri/Kanan</th>';
    }else if(sar == "m24"){
        htmlText1 = htmlText1+'<th class="text-center" width="14%;">Banker</th>';
        htmlText1 = htmlText1+'<th class="text-center">Score</th>';
        htmlText1 = htmlText1+'<th class="text-center" width="14%;">Player 1</th>';
        htmlText1 = htmlText1+'<th class="text-center">Score</th>';
        htmlText1 = htmlText1+'<th class="text-center" width="14%;">Player 2</th>';
        htmlText1 = htmlText1+'<th class="text-center">Score</th>';
        htmlText1 = htmlText1+'<th class="text-center" width="14%;">Player 3</th>';
        htmlText1 = htmlText1+'<th class="text-center">Score</th>';
    }
    htmlText1 = htmlText1+'</thead>';    
    for(p=0;p<top10result.length;p++){
        
        var angka      = top10result[p]["angka"];
        if (sar=="m22" || sar=="m28" || sar=="m23") {
            var angka1 = top10result[p]["angka1"];
            var angka2 = top10result[p]["angka2"];
        } 
        if (prize123=="1") {
            var angka2 = top10result[p]["angka2"];
            var angka3 = top10result[p]["angka3"];
        } 
        
        if (sar=="m24") {
            var banker       = top10result[p]["banker"];
            var valuebanker  = top10result[p]["valuebanker"];
            var player1      = top10result[p]["player1"];
            var player2      = top10result[p]["player2"];
            var player3      = top10result[p]["player3"];
            var valueplayer1 = top10result[p]["valueplayer1"];
            var valueplayer2 = top10result[p]["valueplayer2"];
            var valueplayer3 = top10result[p]["valueplayer3"];

            if(valuebanker.substr(0,4) == "bull"){valuebanker = valuebanker.substr(0,4);}else{valuebanker = valuebanker;}
            if(valueplayer1.substr(0,4) == "bull"){valueplayer1 = valueplayer1.substr(0,4);}else{valueplayer1 = valueplayer1;}
            if(valueplayer2.substr(0,4) == "bull"){valueplayer2 = valueplayer2.substr(0,4);}else{valueplayer2 = valueplayer2;}
            if(valueplayer3.substr(0,4) == "bull"){valueplayer3 = valueplayer3.substr(0,4);}else{valueplayer3 = valueplayer3;}
        }       
        var tanggal    = top10result[p]["tanggal"];
        var hari       = top10result[p]["hari"];
        var periode    = top10result[p]["periode"]; 
        if (sar=="m16") {
            var resultgb   = top10result[p]["result"];     
        }
        if (sar=="m14") {
            var resultpd   = top10result[p]["angka3"];     
        }
        
        if(sar == "p6" ||sar == "p9" || sar == "p7" || sar == "p7b" ||sar == "p12" ||sar == "m8" ||sar == "m6" ||sar == "m13" || sar == "m35"){
            if(angka%2==1 ){
                g = "GANJIL";
                gcolor="style=background-color:#0291c7 !important;";
            }else if(angka%2==0){
                g = "GENAP";
                gcolor="";
            }
            if(angka>12){
                bsr = "BESAR";
                bsrcolor="style=background-color:#0291c7 !important;";
            }else if(angka<=12){
                bsr = "KECIL";
                bsrcolor="";
            }
            if(angka==8 && sar == "m13"){
                bsr = " - ";
                bsrcolor="";
            }
            if (sar == "p12") {
                var b = 11;
                var k = 10;
                angkax = angka.split(",");
                let n1 = angkax[0];
                let n2 = angkax[1];
                let n3 = angkax[2];
                let n4 = parseInt(n1)+parseInt(n2)+parseInt(n3);
                x = parseInt(n1)-1;y = parseInt(n2)-1;z = parseInt(n3)-1;                
                if(n4%2==1){
                    g = "GANJIL";
                    gcolor="style=background-color:#0291c7 !important;";
                }else if(n4%2==0){
                    g = "GENAP";
                    gcolor="";
                }
                if(n4>=b){
                    bsr = "BESAR";
                    bsrcolor="style=background-color:#0291c7 !important;";
                }else if(n4<=k){
                    bsr = "KECIL";
                    bsrcolor="";
                }                
            }
        }
        if (sar == "m10") {
            angkax = angka.split(",");
            let n1 = angkax[0];
            let n2 = angkax[1];
            let n3 = angkax[2];
            let n4 = parseInt(n1)+parseInt(n2)+parseInt(n3);
            // console.log(angka);
            x = parseInt(n1)-1;y = parseInt(n2)-1;z = parseInt(n3)-1;
            if(n1==1){
              bsr = "KIRI";
              bsrcolor="style=background-color:#0291c7 !important;";
            }else{
              bsr = "KANAN";
              bsrcolor="";
            }
            if(n4>=5){
              g = "TAIL";
              gcolor="style=background-color:#0291c7 !important;";
            }else if(n4<=4){
              g = "HEAD";
              gcolor="";
            }
            // console.log(n4);
        }
        if (sar == "m11") {
            angkax = angka.split(",");
            let n1 = angkax[0];
            let n2 = angkax[1];
            let n3 = angkax[2];
            let n4 = parseInt(n1)+parseInt(n2)+parseInt(n3);
            // console.log(angka);
            x = parseInt(n1)-1;y = parseInt(n2)-1;z = parseInt(n3)-1;
            let red = 0;
            let white = 0;
            if(n1==1){
              red ++;
            }else if(n1==2){
              white ++;
            }
            if(n2==1){
              red ++;
            }else if(n2==2){
              white ++;
            }
            if(n3==1){
              red ++;
            }else if(n3==2){
              white ++;
            }
            if(red>white){
              g = "RED";
              gcolor="style=background-color:#AC1F1F !important;color:#000 !important;";
            }else if(white>red){
              g = "WHITE";
              gcolor="style=\"background-color:#FAFBFD !important;color:#000 !important;\"";
            }else{
              g = "-";
              gcolor="#";
            }
        }
        htmlText1 = htmlText1+'<tr>';
        htmlText1 = htmlText1+'<td>'+periode+'</td>'; 
        if((jenisgame == 'pool4d') && sar!=='m17' && sar!=='m51'){
            htmlText1 = htmlText1+'<td>'+hari+'</td>';
        }
        htmlText1 = htmlText1+'<td>'+tanggal+'</td>';
        if(jenisgame == 'pool4d' || jenisgame == 'pool3d' || jenisgame == 'pool5d'){
            console.log(angka);
            htmlText1 = htmlText1+'<td onclick=showdetil("' + angka + '") style=\"cursor:pointer;color: rgb(255, 184, 28);\">'+angka+'</td>';
            
            if (prize123=="1") {
                htmlText1 = htmlText1+'<td onclick=showdetil("' + angka2 + '") style=\"cursor:pointer;color: rgb(255, 184, 28);\">'+angka2+'</td>';
                htmlText1 = htmlText1+'<td onclick=showdetil("' + angka3 + '") style=\"cursor:pointer;color: rgb(255, 184, 28);\">'+angka3+'</td>';
            
            } 
        }else if(jenisgame == 'minigame' && sar!=='m17' && sar!=='m51'){
            if(sar == 'p6'){
                htmlText1 = htmlText1+'<td><div class=\"_24d-ic\" style=\"background-position:-'+angka*25+'px 0px\"></div></td>';
            }else if(sar == 'p9'){
                htmlText1 = htmlText1+'<td><div class=\"_12d-ic\" style=\"background-position:-'+angka*25+'px 0px\"></div></td>';
            }else if(sar == 'p7' || sar == 'p7b'){
                htmlText1 = htmlText1+'<td><div class=\"rl-ic\" style=\"background-position:-'+angka*25+'px 0px\"></div></td>';
            }else if(sar == 'p12'){
                htmlText1 = htmlText1+'<td><div class=\"dicesd-ic\" style=\"background-position:-'+x*20+'px 0px\"></div>\
                                        <div class=\"dicesd-ic\" style=\"background-position:-'+y*20+'px 0px\"></div>\
                                        <div class=\"dicesd-ic\" style=\"background-position:-'+z*20+'px 0px\"></div></td>';
            }else if(sar == 'm16'){
                xx = angka.split(",");
                htmlText1 = htmlText1+'<td>';
                for (z = 0; z < xx.length; z++) {
                    htmlText1 = htmlText1+'<img src=\'images/nomor/gb/'+xx[z]+'.png\' style=\'width:26px;margin-left:2px\'>';
                }     
                htmlText1 = htmlText1+'</td>';  
                htmlText1 = htmlText1+'<td>'+resultgb+'</td>';       
            }else if(sar == 'm22' || sar == 'm28'){
                htmlText1 = htmlText1+'<td>'+angka+'</td>\
                                       <td>'+card(angka1)+'</td>\
                                       <td>'+card(angka2)+'</td>';
            }else if(sar == 'm23'){                
                htmlText1 = htmlText1+'<td>'+angka+'</td>\
                                       <td>'+card(angka2)+'</td>\
                                       <td>'+card(angka1)+'</td>';
            }else if(sar == 'm24'){
                htmlText1 = htmlText1+'<td>'+card(banker)+'</td>\
                                       <td>'+valuebanker.toUpperCase()+'</td>\
                                       <td>'+card(player1)+'</td>\
                                       <td>'+valueplayer1.toUpperCase()+'</td>\
                                       <td>'+card(player2)+'</td>\
                                       <td>'+valueplayer2.toUpperCase()+'</td>\
                                       <td>'+card(player3)+'</td>\
                                       <td>'+valueplayer3.toUpperCase()+'</td>';
            }else if(sar == 'm10'){                
                htmlText1 = htmlText1+'<td><div class=\"ht-ic\" style=\"background-position:-'+x*25+'px 0px\"></div>\
                                        <div class=\"ht-ic\" style=\"background-position:-'+y*25+'px 0px\"></div>\
                                        <div class=\"ht-ic\" style=\"background-position:-'+z*25+'px 0px\"></div></td>';
            }else if(sar == 'm11'){                
                htmlText1 = htmlText1+'<td><div class=\"rw-ic\" style=\"background-position:-'+x*25+'px 0px\"></div>\
                                        <div class=\"rw-ic\" style=\"background-position:-'+y*25+'px 0px\"></div>\
                                        <div class=\"rw-ic\" style=\"background-position:-'+z*25+'px 0px\"></div></td>';
            }else if(sar == 'm19'){  
                xx = angka.split(",");              
                htmlText1 = htmlText1+'<td><img src=\'images/nomor/sw/'+xx[0]+'.png\' style=\'width:26px;margin-left:2px\'><img src=\'images/nomor/sw/'+xx[1]+'.png\' style=\'width:26px;margin-left:2px\'></td>';
            }else if(sar == 'm14'){                
                xx = angka.split(",");
                htmlText1 = htmlText1+'<td>';
                for (z = 0; z < xx.length; z++) {
                    htmlText1 = htmlText1+'<img src=\'images/nomor/pd/'+xx[z]+'.png\' style=\'width:26px;margin-left:2px\'>';
                }     
                htmlText1 = htmlText1+'</td>';  
                htmlText1 = htmlText1+'<td>'+resultpd+'</td>';
            }else {
                htmlText1 = htmlText1+'<td>'+angka+'</td>';
            }
        }
        if(sar == "p6" || sar == "p9" || sar == "p7" || sar == "p7b" || sar == "p12" || sar == "m10" || sar == "m8" ||sar == "m6" || sar == "m13" || sar == "m35"){
            htmlText1 = htmlText1+'<td '+gcolor+'>'+g+'</td>';
            htmlText1 = htmlText1+'<td '+bsrcolor+'>'+bsr+'</td>';
        }else if (sar=="m11") {
            htmlText1 = htmlText1+'<td '+gcolor+'>'+g+'</td>';
        }

        htmlText1 = htmlText1+'</tr>';
    }
    document.getElementById('isihistory').innerHTML = htmlText1; 
}

function popUp(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + 87 + " = window.open(URL, '" + 87 + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=500,left = 162,top = 84');");
}
function showdetil(a){
    var x   = screen.width/2 - 800/2;
    var y   = screen.height/2 - 600/2;
    if (a.length==5) {
        var win = window.open("hasil_nomor2.php?nomor=" + a, "hasil_nomor", 'width='+ 1100 +',height='+ 600 +', top=' + y +', left='+ x +', toolbar=0, scrollbars=1');
    }else{
        var win = window.open("hasil_nomor.php?nomor=" + a, "hasil_nomor", 'width='+ 800 +',height='+ 600 +', top=' + y +', left='+ x +', toolbar=0, scrollbars=1');
    }    
}
function substr_count(haystack, needle, offset, length){
    let cnt = 0;
    haystack += '';
    needle += '';
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    if (needle.length === 0) {
        return false;
    }
    offset--;
    while ((offset = haystack.indexOf(needle, offset + 1)) !== -1) {
    if (length > 0 && (offset + needle.length) > length) {
        return false;
    }
        cnt++;
    }
    return cnt;
}

function card(value){
  expResult = value.split("-");
  if(substr_count(expResult[0],'s')>=1){
    card1 = "spade";
  }else if(substr_count(expResult[0],'c')>=1){
    card1 = "clubs";
  }else if(substr_count(expResult[0],'d')>=1){
    card1 = "diamond";
  }else if(substr_count(expResult[0],'h')>=1){
    card1 = "heart";
  }else{
    card1 = "";
  }

  if(substr_count(expResult[1],'s')>=1){
    card2 = "spade";
  }else if(substr_count(expResult[1],'c')>=1){
    card2 = "clubs";
  }else if(substr_count(expResult[1],'d')>=1){
    card2 = "diamond";
  }else if(substr_count(expResult[1],'h')>=1){
    card2 = "heart";
  }else{
    card2 = "";
  }

  if(substr_count(expResult[2],'s')>=1){
    card3 = "spade";
  }else if(substr_count(expResult[2],'c')>=1){
    card3 = "clubs";
  }else if(substr_count(expResult[2],'d')>=1){
    card3 = "diamond";
  }else if(substr_count(expResult[2],'h')>=1){
    card3 = "heart";
  }else{
    card3 = "";
  }

  if(substr_count(expResult[3],'s')>=1){
    card4 = "spade";
  }else if(substr_count(expResult[3],'c')>=1){
    card4 = "clubs";
  }else if(substr_count(expResult[3],'d')>=1){
    card4 = "diamond";
  }else if(substr_count(expResult[3],'h')>=1){
    card4 = "heart";
  }else{
    card4 = "";
  }

  if(substr_count(expResult[4],'s')>=1){
    card5 = "spade";
  }else if(substr_count(expResult[4],'c')>=1){
    card5 = "clubs";
  }else if(substr_count(expResult[4],'d')>=1){
    card5 = "diamond";
  }else if(substr_count(expResult[4],'h')>=1){
    card5 = "heart";
  }else{
    card5 = "";
  }

  if(expResult[3]) {
    icon = "<img src=\"images\\cards\\"+card1+
    "\\"+expResult[0]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card2+"\\"+expResult[1]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card3+"\\"+expResult[2]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card4+"\\"+expResult[3]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card5+"\\"+expResult[4]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px>";
  }else if(expResult[2]){
    icon = "<img src=\"images\\cards\\"+card1+
    "\\"+expResult[0]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card2+"\\"+expResult[1]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px><img src=\"images\\cards\\"+card3+"\\"+expResult[2]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px>";
  }else if(expResult[0]){
    icon = "<img src=\"images\\cards\\"+card1+
    "\\"+expResult[0]+".png\" style=\"margin-top:2px;margin-left:2px;border:1px solid black;\" height=40px width=30px>";
  }
  return icon;
}
function changepasarshio(shio) {
    var pasar = document.getElementById('shio-code').value;
    document.getElementById('nama-shio').innerHTML = shio;
    var dataString = {};
    dataString["pasar"] = pasar;
    dataString["shio"] = shio;
    $.ajax({
      type: 'POST',
      url: 'hasil_lengkap_isi.php',
      data: dataString, 
      success: function(data2) {
        $("#isihistory").html(data2);
      },
      error: function() {
        alert('failure');
      }
    });
}