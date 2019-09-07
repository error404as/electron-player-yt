const electron = require('electron');
const remote = electron.remote;
const { BrowserWindow } = remote.require('electron');

const win = remote.getCurrentWindow();

document.getElementById('form-video').addEventListener('submit', (e) => {
    e.preventDefault();
    let id = videoId(e.target.elements.query.value);
    if(id){
        openWindow({type: 'player', id});
    }
});
document.getElementById('form-chat').addEventListener('submit', (e) => {
    e.preventDefault();
    let id = videoId(e.target.elements.query.value);
    if(id){
        openWindow({type: 'chat', id});
    }
});
document.getElementById('btnDebugger').addEventListener('click', () => {
    win.webContents.openDevTools({ mode: 'undocked' });
});


function openWindow(props) {
    let options = {
        parent: win,
        alwaysOnTop: true,
        autoHideMenuBar: true,
    };
    let url = '';
    if(props.type === 'player'){
        options.width = 560;
        options.height = 315;
        url = 'https://www.youtube.com/embed/' + props.id;
    }
    if(props.type === 'chat'){
        options.width = 400;
        options.height = 600;
        url = 'https://www.youtube.com/live_chat?v=' + props.id;
    }
    let child = new BrowserWindow(options);

    child.loadURL(url);
    win.hide();
    child.on('closed', () => {
        win.show();
        child = null;
    });
}

function videoId(s){
    // https://www.youtube.com/watch?v=WLroZrNPPhc
    // https://www.youtube.com/watch?v=6F7quI-MbzY&list=PLZRRxQcaEjA4LVq375Kp2GzJlcwfpJogd&index=2
    if(s.indexOf('?') !== -1){
        let q = s.split('?')[1].split('&').filter(el => el.indexOf('v=') === 0)[0];
        if(!q){ return null }
        return q.split('=')[1];
    } 
    return s;
}
