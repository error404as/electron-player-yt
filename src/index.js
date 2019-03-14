const electron = require('electron');
const remote = electron.remote;



const inp = document.getElementById('urlInput');
inp.addEventListener('focus', function (e) {
    this.select();
});
inp.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        let id = videoId(inp.value);
        if(id){
            document.getElementById('videoFrame').src = 'https://www.youtube.com/embed/' + id;
        }
    }
});


document.getElementById('btnClose').addEventListener('click', () => {
    let win = remote.getCurrentWindow();
    win.close();
});




function videoId(s){
    // https://www.youtube.com/watch?v=WLroZrNPPhc
    // https://www.youtube.com/watch?v=6F7quI-MbzY&list=PLZRRxQcaEjA4LVq375Kp2GzJlcwfpJogd&index=2
    if(s.indexOf('?') !== -1){
        let q = s.split('?')[1].split('&').filter(el => el.indexOf('v=') === 0)[0];
        if(!q){ return null }
        return q.split('=')[1];
    } 
    return null;
}
