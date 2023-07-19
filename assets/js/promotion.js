let getAttr = $('script[src*=promotion]')
let agent = getAttr.attr('agent')

// Check browser support
let hours = 1 // Reset when storage is more than 1hours
let now = new Date().getTime()
let setupTime = localStorage.getItem("setupTime")
let htmldata = localStorage.getItem("json-promotion")
if (!localStorage.getItem("json-promotion") || now-setupTime>1800) {
    //localstorage expired
    localStorage.setItem("setupTime", now)

    //get data promotion
    $.ajax({
        type: 'POST',
        url: 'load_promotion.php', 
        dataType: 'JSON',
        data: {
            agent : agent
        },
        success: function(data) {
            setHtml(data.data)
            localStorage.setItem("json-promotion", JSON.stringify(data.data))
        },
        error: function(err) { 
            alert(err)
        }
    });

} else {
    setHtml(JSON.parse(htmldata))
}


function setHtml(data) {
    let html = ''
    let no = 1
    data.forEach(el => {
        html += `
        <div class="panel-heading">
            <div class="row">
                <center>
                    <h2>${el.title}</h2>
                </center>
                </br>
                <div class="col-xs-9">
                    <img src="${el.image}" class="wimage">
                    <div class="accordion-content wcover slide${no}">
                        ${el.detail}
                    </div>
                </div>
    
                <div class="col-xs-3 padleft">
                    <div class="btn btn-theme wbutton" onclick="slide(${no})">MORE INFO</div>
                    <a target="_BLANK" href="${el.pagelink}">
                    <div class="btn btn-theme wbutton">JOIN NOW</div>
                    </a>
                </div>
            </div>
        </div>`  
        no++
    })

    setTimeout(() => {
        $('#content').html(html)
    }, 1000);
}
