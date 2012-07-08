<%
    url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + Request.QueryString("word") + "?key=bd173eff-8b11-4dd5-9520-99022a3a93a4"
    set xmlhttp = CreateObject("MSXML2.ServerXMLHTTP")
    xmlhttp.open "GET", url, false
    xmlhttp.send ""
    Response.ContentType="text/xml"
    Response.write xmlhttp.responseText
    set xmlhttp = nothing
%>