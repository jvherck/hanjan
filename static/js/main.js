/*var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}*/





function savenotify(type,message){
  (()=>{
    let n = document.createElement('div');
    let id = Math.random().toString(36).substr(2,10);
    n.setAttribute('id',id);
    n.classList.add('notification',type);
    n.innerText = message;
    document.getElementById('notification-area').appendChild(n);
    document.getElementById('save-btn').className += ' btn-disabled';
    setTimeout(() => {
      document.getElementById('save-btn').className = document.getElementById('save-btn').className.replace(' btn-disabled','');
      $('#'+id).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });
    }, 5000);
  })();
}


function notify(type,message){
  (()=>{
    let n = document.createElement('div');
    let id = Math.random().toString(36).substr(2,10);
    n.setAttribute('id',id);
    n.classList.add('notification',type);
    n.innerText = message;
    document.getElementById('notification-area').appendChild(n);
    setTimeout(() => {
      $('#'+id).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });
    }, 5000);

    /*setTimeout(()=>{
      var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
      for(let i=0;i<notifications.length;i++){
        if(notifications[i].getAttribute("id") == id){
          const running = notifications.style.animationPlayState || 'running';
          notifications.style.animationPlayState = running === 'running' ? 'paused' : 'running';
          break;
        }
      }
    },200);

    setTimeout(()=>{
      var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
      for(let i=0;i<notifications.length;i++){
        if(notifications[i].getAttribute("id") == id){
          notifications[i].remove();
          break;
        }
      }
    },5000);*/
  })();
}

function notifySuccess(){
  notify("success","This is demo success notification message");
}
function notifyError(){
  notify("error","This is demo error notification message");
}
function notifyInfo(){
  notify("info","This is demo info notification message");
}

