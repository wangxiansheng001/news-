<!DOCTYPE html>    
<html>    
    <head>    
        <title></title>    
    </head>    
    <body>    
        <div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">    
            <div id="color">Frame Color</div>    
            </div>    
        <div>    
        <iframe id="child" src="http:///c.html"></iframe>    
        </div>    
        <script type="text/javascript">   
            window.onload = function() {
                console.log('get key value......................')
                window.frames[0].postMessage(JSON.stringify({type:"GET",key:"key"}),'*');
            }
            window.addEventListener('message', function(e) {
                console.log('listen.....');
                var data = e.data;    
                console.log(data);
            }, false);
        </script>    
    </body>    
</html>  