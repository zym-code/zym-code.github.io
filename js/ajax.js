function createXmlHttpRequest() {
    let xmlHttp
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    return xmlHttp
}
function ajax(method, url, success, b) {
    xmlHttp = createXmlHttpRequest()
    xmlHttp.open(method, url, b)//与服务器建立连接
    xmlHttp.send()//发送请求
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success(JSON.parse(this.responseText))
        }
    }
}