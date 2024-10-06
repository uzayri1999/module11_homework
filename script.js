const input = document.getElementById ('input');
const btnGeo = document.getElementById ('btn-geoposition');
const btnSend = document.getElementById ('btn-send');
const messageBlock = document.getElementById ('message-block'); 
const btnConnect = document.getElementById ('btn-connect');
const btnDisconnect = document.getElementById ('btn-disconnect');

const url = 'wss://echo-ws-service.herokuapp.com';
let websocket;
let stroke = ''; // Сделано для того, чтобы не приходил ответ при отправке местоположения
let number = 0; // Сделано для того, чтобы выводился alert с просьбой установить соединение

function createMessage (message, condition) {
    if (condition === 'position') {
        stroke = 'position';
        const link = document.createElement ('a');
        link.href = `https://www.openstreetmap.org/#map=18/${message.latitude}/${message.longitude}`;
        link.target = '_blank';
        link.textContent = 'Местоположение';
        messageBlock.appendChild (link);
        link.classList.add ('message-position');
    } else {
        const str = document.createElement ('p');
        str.textContent = message;
        messageBlock.appendChild (str);
        if (condition === 'in') {
            str.classList.add ('message-in');
        } else {
            str.classList.add ('message-out');
        };
    };
    messageBlock.scrollTop = messageBlock.scrollHeight;
};

function createMessageNotification (notification) {
    const str = document.createElement ('p');
    str.textContent = notification;
    messageBlock.appendChild (str);
    str.classList.add ('message-notification');
    messageBlock.scrollTop = messageBlock.scrollHeight;
}

btnConnect.addEventListener('click', () => {
    websocket = new WebSocket (url);
    number = 1;
    websocket.onopen = function (e) {
        createMessageNotification ('Соединение установлено');
    };

    websocket.onclose = function (e) {
        createMessageNotification ('Соединение закрыто');
        number = 0;
    };

    websocket.onmessage = function (e) {
        if (stroke !== 'position') {
            createMessage (e.data, 'in');
        };
        stroke = '';
    };

    websocket.onerror = function (e) {
        console.log (`ERROR: ${e.data}`);
    };
});

btnSend.addEventListener('click', () => {
    const message = input.value;
    if (number) {
        if (message.trim () !== '') {
            createMessage (message, 'out');
            websocket.send (message);
            input.value = '';
        } else {
            alert ('Введите сообщение!');
        };
    } else {
        alert ('Установите соединение!');
    };
});

btnDisconnect.addEventListener('click', () => {
    if (number) { 
        websocket.close ();
    };
});

btnGeo.addEventListener('click', () => {
    if (number) {
        navigator.geolocation.getCurrentPosition((position) => {
            const geoPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            websocket.send (JSON.stringify (geoPosition));
            createMessage (geoPosition, 'position');
        });
    } else {
        alert ('Установите соединение!');
    };
});