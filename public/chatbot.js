window.addEventListener('dfMessengerLoaded', function(event){
    console.log('' + event);

    const dfMessenger = document.querySelector('df-Messenger');
    dfMessenger.renderCustomText('Selamat datang di TobaBot, Membantu anda mendapatkan informasi mengenai pariwisata Danau Toba');
})